import React, { useMemo, useState, useRef } from "react";
import * as d3 from "d3";
import "./PlanetaryMap.css";

// ------------------------------------------------------
// CONFIG
// ------------------------------------------------------

// If you want to re-enable "last X hours" filtering later
const TIME_WINDOW_HOURS = 6; // currently unused (see commented code below)

const ORBIT_COUNT = 3; // always draw 3 orbits
const BASE_ORBIT_RADIUS = 100;
const ORBIT_STEP = 120;

// Visual behavior per variant
const VARIANTS = {
    basic: {
        showLabels: true,
        showDirection: false,
        numberingPaths: false,
        aggregatePaths: false,
        minimalPaths: false
    },
    detailed: {
        showLabels: true,
        showDirection: true,
        numberingPaths: true,
        aggregatePaths: false,
        minimalPaths: false
    },
    aggregated: {
        showLabels: true,
        showDirection: true,
        numberingPaths: false,
        aggregatePaths: true,
        minimalPaths: false
    },
    minimal: {
        showLabels: false,
        showDirection: false,
        numberingPaths: false,
        aggregatePaths: true,
        minimalPaths: true
    }
};

// Palette for planets
const PLANET_PALETTE = [
    "#f97316",
    "#22c55e",
    "#06b6d4",
    "#6366f1",
    "#ec4899",
    "#facc15",
    "#4ade80",
    "#2dd4bf",
    "#38bdf8",
    "#818cf8",
    "#c4b5fd",
    "#f9a8d4",
    "#fb923c",
    "#22c55e",
    "#06b6d4",
    "#a3e635"
];

// Shared line generator used by the wiggly path
const lineGen = d3.line().curve(d3.curveNatural);

// ------------------------------------------------------
// Helper functions
// ------------------------------------------------------

// Build per-app time aggregation
function buildAppTimes(visualRows) {
    const totals = new Map();
    for (const row of visualRows) {
        if (row.type === "STATE") {
            totals.set(row.app, (totals.get(row.app) || 0) + row.duration_sec);
        }
    }
    return Array.from(totals, ([app, seconds]) => ({ app, seconds }));
}

// Build base transitions (with geometry info but no variant logic yet)
function buildRawTransitions(visualRows, planetByApp, planetRadius) {
    return visualRows
        .filter((row) => row.type === "TRANSITION")
        .map((t, idx) => {
            const from = planetByApp.get(t.from);
            const to = planetByApp.get(t.to);
            if (!from || !to) return null;
            return {
                id: idx,
                from,
                to,
                friction: t.friction ?? 0,
                fromRadius: planetRadius(from.seconds),
                toRadius: planetRadius(to.seconds)
            };
        })
        .filter(Boolean);
}

// Aggregate transitions by unordered app pair (A<->B)
function aggregateTransitionsByPair(rawTransitions) {
    const byPair = new Map();

    for (const tr of rawTransitions) {
        const apps = [tr.from.app, tr.to.app].sort();
        const key = `${apps[0]}<->${apps[1]}`;

        if (!byPair.has(key)) {
            byPair.set(key, {
                ...tr,
                count: 0,
                totalFriction: 0
            });
        }
        const agg = byPair.get(key);
        agg.count += 1;
        agg.totalFriction += tr.friction;
    }

    return Array.from(byPair.values()).map((agg) => ({
        ...agg,
        friction: agg.totalFriction / agg.count
    }));
}

// Add parallelIndex/parallelCount so multiple edges between same pair can be offset
function addParallelIndices(transitions) {
    const byPair = new Map();
    for (const tr of transitions) {
        const apps = [tr.from.app, tr.to.app].sort();
        const key = `${apps[0]}<->${apps[1]}`;
        if (!byPair.has(key)) byPair.set(key, []);
        byPair.get(key).push(tr);
    }

    const withIndex = [];
    for (const [, arr] of byPair) {
        const count = arr.length;
        arr.forEach((t, i) => {
            withIndex.push({
                ...t,
                parallelIndex: i,
                parallelCount: count
            });
        });
    }
    return withIndex;
}

// Straight path for minimal variant (no wiggle, just offset parallels)
function straightPath(from, to, fromRadius, toRadius, parallelIndex = 0, parallelCount = 1) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.sqrt(dx * dx + dy * dy) || 1;

    // Direction & normal
    const ux = dx / length;
    const uy = dy / length;
    const nx = -uy;
    const ny = ux;

    // Offset to keep lines from stacking directly on top of each other
    const offsetScale = 10;
    const baseOffset = (parallelIndex - (parallelCount - 1) / 2) * offsetScale;

    const startOffset = fromRadius + 8;
    const endOffset = toRadius + 8;

    const x1 = from.x + ux * startOffset + nx * baseOffset;
    const y1 = from.y + uy * startOffset + ny * baseOffset;
    const x2 = to.x - ux * endOffset + nx * baseOffset;
    const y2 = to.y - uy * endOffset + ny * baseOffset;

    return lineGen([
        [x1, y1],
        [x2, y2]
    ]);
}

// Wiggly path: friction controls how bumpy; parallels are spread around the base line
function wigglePath(
    from,
    to,
    friction,
    fromRadius,
    toRadius,
    parallelIndex = 0,
    parallelCount = 1
) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.sqrt(dx * dx + dy * dy) || 1;

    const ux = dx / length;
    const uy = dy / length;
    const nx = -uy;
    const ny = ux;

    // Spread parallel lines around the base
    const parallelSpread = 48;
    const baseAmp = (parallelIndex / parallelCount - 1 / 2) * parallelSpread;

    const extraGap = 8;
    const startOffset = fromRadius + extraGap;
    const endOffset = toRadius + extraGap;

    const innerStartT = startOffset / length;
    const innerEndT = 1 - endOffset / length;

    const maxBumpLength = 40;
    const maxBumpT = maxBumpLength / length;

    const bumpStartT = innerStartT;
    const bumpEndT = Math.min(innerEndT, bumpStartT + maxBumpT);

    if (length <= startOffset + endOffset) {
        // too short to fit bumps, just draw an offset line
        const x1 = from.x + nx * baseAmp;
        const y1 = from.y + ny * baseAmp;
        const x2 = to.x + nx * baseAmp;
        const y2 = to.y + ny * baseAmp;
        return lineGen([
            [x1, y1],
            [x2, y2]
        ]);
    }

    const segments = 40;
    const bumps = friction; // at least one bump
    const bumpAmplitude = baseAmp < 0 ? -10 : 10

    const points = d3.range(segments + 1).map((i) => {
        const t = i / segments;

        const baseX = from.x + dx * t;
        const baseY = from.y + dy * t;

        let offset = Math.sin(Math.PI * t) * baseAmp;;

        // Only wiggle in the inner section between planets
        if (t >= bumpStartT && t <= bumpEndT) {
            const localT =
                (t - bumpStartT) / Math.max(bumpEndT - bumpStartT, 0.0001);
            const wave = Math.sin(localT * bumps * Math.PI);
            //const envelope = Math.sin(localT * Math.PI); // zero at ends
            offset += wave * bumpAmplitude;
        }

        return [baseX + nx * offset, baseY + ny * offset];
    });

    return lineGen(points);
}

function pathLabelPosition(from, to, fromRadius, parallelIndex = 0, parallelCount = 1) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.sqrt(dx * dx + dy * dy) || 1;

    const ux = dx / length;
    const uy = dy / length;
    const nx = -uy;
    const ny = ux;

    // spread labels slightly for parallel paths
    const parallelSpread = 48;
    const offset = (parallelIndex / parallelCount - 1 / 2) * parallelSpread;
    // const parallelSpread = 14;
    // const offset = (parallelIndex - (parallelCount - 1) / 2) * parallelSpread;

    // distance from the center of the "from" planet where the label should sit
    const labelDistance = fromRadius + 6;

    const x = from.x + ux * labelDistance + nx * offset;
    const y = from.y + uy * labelDistance + ny * offset;

    return { x, y };
}

// ------------------------------------------------------
// Main component
// ------------------------------------------------------

function PlanetaryMap({ data, variant = "basic" }) {
    const [hoveredApp, setHoveredApp] = useState(null);
    const [hoveredEdgeId, setHoveredEdgeId] = useState(null);

    const config = VARIANTS[variant] ?? VARIANTS.basic;

    // 1. Filter out AFK so it never appears as a planet or path endpoint
    const visualRows = useMemo(
        () =>
            (data || []).filter(
                (row) =>
                    row.app !== "AFK" &&
                    row.from !== "AFK" &&
                    row.to !== "AFK"
            ),
        [data]
    );

    // (Optional) Time window filtering if you want:
    // const visualRows = useMemo(() => {
    //   const now = Date.now();
    //   const cutoff = now - TIME_WINDOW_HOURS * 60 * 60 * 1000;
    //   return (data || []).filter((row) => {
    //     if (row.app === "AFK" || row.from === "AFK" || row.to === "AFK") return false;
    //     if (row.type !== "STATE") return true;
    //     const startTime = new Date(row.start).getTime();
    //     return startTime >= cutoff;
    //   });
    // }, [data]);

    // 2. Aggregate time per app
    const appTimes = useMemo(
        () => buildAppTimes(visualRows),
        [visualRows]
    );

    // 3. Keep only the 12 most-used apps (limit planets)
    const orbitAssignments = useMemo(() => {
        const sorted = [...appTimes].sort((a, b) => b.seconds - a.seconds);
        const limited = sorted.slice(0, 12);
        return limited.map((d, i) => ({
            ...d,
            orbit: Math.floor(i / 3) // 0-inner, 1-next, etc. (3 planets per orbit)
        }));
    }, [appTimes]);

    // 4. Compute planet positions (radial layout)
    const planets = useMemo(() => {
        const grouped = d3.group(orbitAssignments, (d) => d.orbit);
        const result = [];

        for (const [orbit, items] of grouped) {
            const r = BASE_ORBIT_RADIUS + orbit * ORBIT_STEP;
            const n = items.length;
            items.forEach((d, i) => {
                const angle = (i / n) * 2 * Math.PI + (orbit * Math.PI) / 6;
                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * r;
                result.push({ ...d, x, y, orbitRadius: r });
            });
        }
        return result;
    }, [orbitAssignments]);

    const planetByApp = useMemo(() => {
        const m = new Map();
        planets.forEach((p) => m.set(p.app, p));
        return m;
    }, [planets]);

    const planetColorByApp = useMemo(() => {
        const map = new Map();
        const uniqueApps = Array.from(new Set(planets.map((p) => p.app))).sort();

        uniqueApps.forEach((app, idx) => {
            map.set(app, PLANET_PALETTE[idx % PLANET_PALETTE.length]);
        });
        return map;
    }, [planets]);

    // Layout & scales
    const width = 1000;
    const height = 800;
    const cx = width / 2;
    const cy = height / 2;

    const maxSeconds = d3.max(appTimes, (d) => d.seconds) || 1;

    // Planet radius scale (sqrt so big apps don't dominate)
    const planetRadius = useMemo(
        () =>
            d3
                .scaleSqrt()
                .domain([0, maxSeconds])
                .range([15, 60]),
        [maxSeconds]
    );

    const orbitRadii = d3
        .range(ORBIT_COUNT)
        .map((i) => BASE_ORBIT_RADIUS + i * ORBIT_STEP);

    // Color scale for transitions by friction (0–4+)
    const pathColor = useMemo(
        () =>
            d3
                .scaleLinear()
                .domain([0, 4])
                .range(["#9be7ff", "#ff6b6b"]),
        []
    );

    const frictionStrokeWidth = (f) => 2 + (f || 0); // 2–6 px

    // 5. Build transitions with variant-aware transforms
    const rawTransitions = useMemo(
        () => buildRawTransitions(visualRows, planetByApp, planetRadius),
        [visualRows, planetByApp, planetRadius]
    );

    const transitions = useMemo(() => {
        let base = rawTransitions;
        if (config.aggregatePaths) {
            base = aggregateTransitionsByPair(rawTransitions);
        }
        return addParallelIndices(base);
    }, [rawTransitions, config.aggregatePaths]);

    const highlightedApps = useMemo(() => {
        // If an edge is hovered, highlight exactly its two endpoints
        if (hoveredEdgeId != null) {
            const edge = transitions.find((t) => t.id === hoveredEdgeId);
            if (edge) {
                return new Set([edge.from.app, edge.to.app]);
            }
        }

        // Otherwise, fall back to planet hover behavior
        if (hoveredApp) {
            const set = new Set([hoveredApp]);
            for (const t of transitions) {
                if (t.from.app === hoveredApp || t.to.app === hoveredApp) {
                    set.add(t.from.app);
                    set.add(t.to.app);
                }
            }
            return set;
        }

        // No hover → no highlighting
        return null;
    }, [hoveredApp, hoveredEdgeId, transitions]);

    // 7. Tooltip info
    const totalSeconds = d3.sum(appTimes, (d) => d.seconds) || 0;

    const hoveredAppInfo = useMemo(() => {
        if (!hoveredApp) return null;

        const appEntry = appTimes.find((a) => a.app === hoveredApp);
        const seconds = appEntry ? appEntry.seconds : 0;
        const share = totalSeconds > 0 ? seconds / totalSeconds : 0;

        const incoming = transitions.filter((t) => t.to.app === hoveredApp);
        const outgoing = transitions.filter((t) => t.from.app === hoveredApp);

        const allRelated = [...incoming, ...outgoing];
        const avgFriction =
            allRelated.length > 0
                ? allRelated.reduce((sum, t) => sum + (t.friction ?? 0), 0) /
                allRelated.length
                : 0;

        return {
            app: hoveredApp,
            seconds,
            share,
            incomingCount: incoming.length,
            outgoingCount: outgoing.length,
            avgFriction: Number(avgFriction.toFixed(2)),
            color: planetColorByApp.get(hoveredApp) || "#6bdcff"
        };
    }, [hoveredApp, appTimes, totalSeconds, transitions, planetColorByApp]);

    const hoveredEdgeInfo = useMemo(() => {
        if (hoveredEdgeId == null) return null;
        const edge = transitions.find((t) => t.id === hoveredEdgeId);
        if (!edge) return null;

        return {
            from: edge.from.app,
            to: edge.to.app,
            friction: Number((edge.friction ?? 0).toFixed(2)),
            count: edge.count || 1,
        };
    }, [hoveredEdgeId, transitions]);

    // ------------------------------------------------------
    // Render
    // ------------------------------------------------------

    // If there are no planets, show a gentle empty state
    if (planets.length === 0) {
        return (
            <div className="planetary-container planetary-container--empty">
                <div className="planetary-empty-message">
                    No activity to show yet. As you work, your Planetary Map
                    will begin to fill with planets and paths.
                </div>
            </div>
        );
    }

    return (
        <div className="planetary-container">
            <svg
                className="planetary-svg"
                viewBox={`0 0 ${width} ${height}`}
                role="img"
                aria-label="Planetary map of focused tools and transitions"
            >
                <g transform={`translate(${cx}, ${cy})`}>
                    {config.showDirection && (
                        <defs>
                            {transitions.map((t) => {
                                const color = pathColor(t.friction ?? 0);
                                return (
                                    <linearGradient
                                        key={t.id}
                                        id={`edge-grad-${t.id}`}
                                        x1={t.from.x}
                                        y1={t.from.y}
                                        x2={t.to.x}
                                        y2={t.to.y}
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop offset="35%" stopColor={color} stopOpacity={1} />
                                        <stop offset="80%" stopColor={color} stopOpacity={0.1} />
                                    </linearGradient>
                                );
                            })}
                        </defs>
                    )}
                    {/* Orbits */}
                    {orbitRadii.map((r, i) => (
                        <g key={i}>
                            <circle className="orbit-hitbox" cx={0} cy={0} r={r} />
                            <circle className="planetary-orbit" cx={0} cy={0} r={r} />
                        </g>
                    ))}

                    {/* Transitions */}
                    {transitions.map((t) => {
                        const isConnected =
                            hoveredApp &&
                            (t.from.app === hoveredApp || t.to.app === hoveredApp);

                        const isHoveredEdge = hoveredEdgeId === t.id;

                        const classes = ["planetary-edge"];
                        if (hoveredApp) {
                            classes.push(
                                isConnected ? "planetary-edge--active" : "planetary-edge--dim"
                            );
                        }
                        if (hoveredEdgeId != null) {
                            classes.push(
                                isHoveredEdge ? "planetary-edge--hover" : "planetary-edge--dim"
                            );
                        }
                        const labelClasses = ["planetary-path-label"];
                        if (hoveredApp || hoveredEdgeId != null) {
                            if (isHoveredEdge || isConnected) {
                                labelClasses.push("planetary-path-label--active");
                            } else {
                                labelClasses.push("planetary-path-label--dim");
                            }
                        }

                        const strokeWidthBase = config.minimalPaths
                            ? 1 + (t.count || 1) * 0.6
                            : 3;

                        const strokeWidth = isHoveredEdge ? strokeWidthBase * 1.6 : strokeWidthBase;

                        const stroke = config.showDirection
                            ? `url(#edge-grad-${t.id})`
                            : pathColor(t.friction ?? 0);

                        const pathFn = config.minimalPaths ? straightPath : wigglePath;

                        const labelPos = config.numberingPaths
                            ? pathLabelPosition(
                                t.from,
                                t.to,
                                t.fromRadius,
                                t.parallelIndex,
                                t.parallelCount
                            )
                            : null;

                        return (
                            <g
                                key={t.id}
                                onMouseEnter={() => setHoveredEdgeId(t.id)}
                                onMouseLeave={() => setHoveredEdgeId(null)}
                            >
                                <path
                                    className={classes.join(" ")}
                                    d={pathFn(
                                        t.from,
                                        t.to,
                                        t.friction ?? 0,
                                        t.fromRadius,
                                        t.toRadius,
                                        t.parallelIndex,
                                        t.parallelCount
                                    )}
                                    stroke={stroke}
                                    strokeWidth={strokeWidth}
                                    fill="none"
                                />
                                {config.numberingPaths && labelPos && (
                                    <text
                                        className={labelClasses.join(" ")}
                                        x={labelPos.x}
                                        y={labelPos.y}
                                    >
                                        {t.id + 1}
                                    </text>
                                )}
                            </g>
                        );
                    })}

                    {/* Planets */}
                    {planets.map((p, i) => {
                        const isHovered = hoveredApp === p.app;
                        const isHighlighted =
                            highlightedApps && highlightedApps.has(p.app);

                        const planetClasses = ["planetary-planet"];

                        if (highlightedApps) {
                            if (isHovered) {
                                planetClasses.push("planetary-planet--active");
                            } else if (!isHighlighted) {
                                planetClasses.push("planetary-planet--dim");
                            }
                        }

                        const labelClasses = ["planetary-label"];
                        if (highlightedApps && !isHighlighted) {
                            labelClasses.push("planetary-label--dim");
                        }

                        return (
                            <g
                                key={i}
                                transform={`translate(${p.x}, ${p.y})`}
                                onMouseEnter={() => setHoveredApp(p.app)}
                                onMouseLeave={() => setHoveredApp(null)}
                                role="button"
                                tabIndex={0}
                                aria-label={`Tool ${p.app}`}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        setHoveredApp((prev) => (prev === p.app ? null : p.app));
                                    }
                                }}
                            >
                                <circle
                                    className={planetClasses.join(" ")}
                                    r={planetRadius(p.seconds)}
                                    fill={planetColorByApp.get(p.app) || "#6bdcff"}
                                />
                                {config.showLabels && (
                                    <text className={labelClasses.join(" ")} x={0} y={0}>
                                        {p.app}
                                    </text>
                                )}
                            </g>
                        );
                    })}
                </g>
            </svg>

            {/* Tooltip */}
            {(hoveredAppInfo || hoveredEdgeInfo) && (
                <div className="planetary-tooltip">
                    {hoveredAppInfo && (
                        <>
                            <div className="planetary-tooltip-header">
                                <span
                                    className="planetary-tooltip-color"
                                    style={{ backgroundColor: hoveredAppInfo.color }}
                                />
                                <span className="planetary-tooltip-title">
                                    {hoveredAppInfo.app}
                                </span>
                            </div>
                            <div className="planetary-tooltip-row">
                                <span>Total time:</span>
                                <span>
                                    {Math.round(hoveredAppInfo.seconds / 60)} min (
                                    {Math.round(hoveredAppInfo.share * 100)}%)
                                </span>
                            </div>
                            <div className="planetary-tooltip-row">
                                <span>Transitions:</span>
                                <span>
                                    {hoveredAppInfo.incomingCount} in /{" "}
                                    {hoveredAppInfo.outgoingCount} out
                                </span>
                            </div>
                            <div className="planetary-tooltip-row">
                                <span>Avg friction:</span>
                                <span>{hoveredAppInfo.avgFriction}</span>
                            </div>

                            {hoveredEdgeInfo && <hr className="planetary-tooltip-divider" />}
                        </>
                    )}

                    {hoveredEdgeInfo && (
                        <>
                            <div className="planetary-tooltip-header">
                                <span className="planetary-tooltip-title">
                                    Path: {hoveredEdgeInfo.from} → {hoveredEdgeInfo.to}
                                </span>
                            </div>
                            <div className="planetary-tooltip-row">
                                <span>Transitions on this path:</span>
                                <span>{hoveredEdgeInfo.count}</span>
                            </div>
                            <div className="planetary-tooltip-row">
                                <span>Avg friction on this path:</span>
                                <span>{hoveredEdgeInfo.friction}</span>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default PlanetaryMap;
