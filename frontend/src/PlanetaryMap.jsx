import React, { useMemo, useState } from "react";
import * as d3 from "d3";
import "./PlanetaryMap.css";

// CONFIG
const TIME_WINDOW_HOURS = 6;      // last 6 hours = active workspace
const ORBIT_COUNT = 4;            // always draw 4 orbits
const BASE_ORBIT_RADIUS = 80;
const ORBIT_STEP = 100;

function PlanetaryMap({ data }) {
    const [hoveredApp, setHoveredApp] = useState(null);

    // 1. Filter out AFK for visualization (Option B)
    const visualRows = useMemo(
        () =>
            data.filter(
                (row) =>
                    row.app !== "AFK" &&
                    row.from !== "AFK" &&
                    row.to !== "AFK"
            ),
        [data]
    );

    // 2. Aggregate time per app over the recent time window
    // const appTimes = useMemo(() => {
    //     const now = Date.now();
    //     const cutoff = now - TIME_WINDOW_HOURS * 60 * 60 * 1000;
    //     const totals = new Map();

    //     for (const row of visualRows) {
    //         if (row.type !== "STATE") continue;

    //         const startTime = new Date(row.start).getTime();
    //         if (startTime < cutoff) continue; // ignore old events

    //         totals.set(row.app, (totals.get(row.app) || 0) + row.duration_sec);
    //     }

    //     return Array.from(totals, ([app, seconds]) => ({ app, seconds }));
    // }, [visualRows]);

    const appTimes = useMemo(() => {
        const totals = new Map();
        for (const row of visualRows) {
            if (row.type === "STATE") {
                totals.set(
                    row.app,
                    (totals.get(row.app) || 0) + row.duration_sec
                );
            }
        }
        return Array.from(totals, ([app, seconds]) => ({ app, seconds }));
    }, [visualRows]);

    // 3. Keep only the 12 most-used apps (limit planets)
    const orbitAssignments = useMemo(() => {
        const sorted = [...appTimes].sort((a, b) => b.seconds - a.seconds);
        const limited = sorted.slice(0, 12);
        return limited.map((d, i) => ({
            ...d,
            orbit: Math.floor(i / 3) // 0-inner, 1-next, etc.
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
                const angle = (i / n) * 2 * Math.PI + orbit * Math.PI / 6;
                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * r;
                result.push({ ...d, x, y, orbitRadius: r });
            });
        }
        return result;
    }, [orbitAssignments]);

    const planetByApp = useMemo(() => {
        const map = new Map();
        for (const p of planets) map.set(p.app, p);
        return map;
    }, [planets]);

    const PLANET_PALETTE = [
        "#f97373",
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

    const planetColorByApp = useMemo(() => {
        const map = new Map();
        const uniqueApps = Array.from(new Set(planets.map((p) => p.app))).sort();

        uniqueApps.forEach((app, idx) => {
            map.set(app, PLANET_PALETTE[idx % PLANET_PALETTE.length]);
        });
        return map;
    }, [planets]);

    // 5. Layout + D3 scales
    const width = 1000;
    const height = 800;
    const cx = width / 2;
    const cy = height / 2;

    const maxSeconds = d3.max(appTimes, (d) => d.seconds) || 1;

    // Planet radius scale (sqrt so big apps don't dominate)
    const planetRadius = d3
        .scaleSqrt()
        .domain([0, maxSeconds])
        .range([15, 60]);

    // Always draw 4 orbits
    const orbitRadii = d3
        .range(ORBIT_COUNT)
        .map((i) => BASE_ORBIT_RADIUS + i * ORBIT_STEP);

    // Color scale for transitions by friction (0–4)
    const pathColor = d3
        .scaleLinear()
        .domain([0, 4])
        .range(["#9be7ff", "#ff6b6b"]); // low friction → blue-ish, high → red-ish

    const frictionStrokeWidth = (f) => 2 + f; // 2–6 px

    // D3 line generator for a smooth path
    const lineGen = d3
        .line()
        .curve(d3.curveNatural);

    // 6. Build transitions (from/to planets + friction + radii)
    const transitions = useMemo(() => {
        // build base transitions with geometry info
        const raw = visualRows
            .filter((row) => row.type === "TRANSITION")
            .map((t, idx) => {
                const from = planetByApp.get(t.from);
                const to = planetByApp.get(t.to);
                if (!from || !to) return null;
                return {
                    id: idx,
                    from,
                    to,
                    friction: t.friction,
                    fromRadius: planetRadius(from.seconds),
                    toRadius: planetRadius(to.seconds)
                };
            })
            .filter(Boolean);

        // group by unordered pair {from, to} so A→B and B→A share space
        const byPair = new Map();
        for (const tr of raw) {
            const apps = [tr.from.app, tr.to.app].sort();   // <- NEW: unordered pair
            const key = `${apps[0]}<->${apps[1]}`;          // same key for A→B and B→A
            if (!byPair.has(key)) byPair.set(key, []);
            byPair.get(key).push(tr);
        }

        // assign index within each parallel group
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

        // console.log("transitions", withIndex);

        return withIndex;
    }, [visualRows, planetByApp, planetRadius]);

    // Build set of apps connected to the hovered app
    let connectedApps = null;
    if (hoveredApp) {
        connectedApps = new Set([hoveredApp]);
        for (const t of transitions) {
            if (t.from.app === hoveredApp || t.to.app === hoveredApp) {
                connectedApps.add(t.from.app);
                connectedApps.add(t.to.app);
            }
        }
    }

    // 7. Wiggly path with straight segments near planets
    const wigglePath = (
        from,
        to,
        friction,
        fromRadius,
        toRadius,
        parallelIndex = 0,
        parallelCount = 1
    ) => {
        // console.log("wigglePath", {
        //     from,
        //     to,
        //     friction,
        //     fromRadius,
        //     toRadius,
        //     parallelIndex,
        //     parallelCount
        // });
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const length = Math.sqrt(dx * dx + dy * dy) || 1;

        // unit direction
        const ux = dx / length;
        const uy = dy / length;

        // perpendicular normal
        const nx = -uy;
        const ny = ux;

        // ---------------
        // 1. BASE CURVE OFFSET
        // ---------------
        const curveStep = 48;            // gap between curves
        const baseAmp = curveStep * ((parallelIndex / parallelCount - 1 / 2));
        // console.log("baseAmp", baseAmp);
        // This produces [-24, -12, 0, 12, 24] for 5 transitions

        // ---------------
        // 2. FRICTION "BUMP" PARAMETERS
        // ---------------
        const bumpAmp = baseAmp < 0 ? -10 : 10
        const bumpHalfWaves = friction;  // friction bump count

        // ---------------
        // 3. STRAIGHT SECTIONS NEAR PLANETS
        // ---------------
        const extraGap = 8;
        const startOffset = fromRadius + extraGap;
        const endOffset = toRadius + extraGap;

        const innerStartT = startOffset / length;
        const innerEndT = 1 - endOffset / length;

        const maxBumpLength = 40;
        const maxBumpT = maxBumpLength / length;

        const bumpStartT = innerStartT;
        const bumpEndT = Math.min(innerEndT, bumpStartT + maxBumpT);

        // If path is too short or friction zero → use only base curve
        if (length <= startOffset + endOffset) {
            // console.log("too short for bumps");
            return lineGen([
                [from.x + nx * baseAmp, from.y + ny * baseAmp],
                [to.x + nx * baseAmp, to.y + ny * baseAmp]
            ]);
        }

        // ---------------
        // 4. FULL PATH GENERATION
        // ---------------
        const segments = 40; // smooth curve
        const points = d3.range(segments + 1).map((i) => {
            const t = i / segments;

            // base coordinate along straight line
            const bx = from.x + dx * t;
            const by = from.y + dy * t;

            // let offset = 12 * parallelIndex;
            let offset = Math.sin(Math.PI * t) * baseAmp; // start with the base curve

            // apply bump in the center region only
            if (t > bumpStartT && t < bumpEndT && bumpHalfWaves > 0) {
                const localT = (t - bumpStartT) / (bumpEndT - bumpStartT);
                const phase = Math.PI * bumpHalfWaves * localT;
                offset += Math.sin(phase) * bumpAmp;
            }

            // final offset in the perpendicular direction
            return [bx + nx * offset, by + ny * offset];
        });

        return lineGen(points);
    };

    const totalSeconds = d3.sum(appTimes, (d) => d.seconds) || 0;

    // Build info for the hovered app (tool)
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

        console.log("hoveredAppInfo", { hoveredApp, seconds, share, incoming, outgoing, avgFriction });

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

    return (
        <div className="planetary-container">
            <svg
                className="planetary-svg"
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="xMidYMid meet"
            >
                <g transform={`translate(${cx}, ${cy})`}>
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

                        const classes = ["planetary-edge"];
                        if (hoveredApp) {
                            classes.push(
                                isConnected ? "planetary-edge--active" : "planetary-edge--dim"
                            );
                        }

                        // const widthStroke =
                        //     frictionStrokeWidth(t.friction) * (isConnected ? 1.3 : 1);

                        return (
                            <path
                                key={t.id}
                                className={classes.join(" ")}
                                d={wigglePath(
                                    t.from,
                                    t.to,
                                    t.friction,
                                    t.fromRadius,
                                    t.toRadius,
                                    t.parallelIndex,
                                    t.parallelCount
                                )}
                                stroke={pathColor(t.friction)}
                                strokeWidth={3}
                            />
                        );
                    })}

                    {/* Planets */}
                    {planets.map((p, i) => {
                        const isHovered = hoveredApp === p.app;
                        const isConnected =
                            hoveredApp && connectedApps && connectedApps.has(p.app);

                        const planetClasses = ["planetary-planet"];
                        if (hoveredApp) {
                            if (isHovered) {
                                planetClasses.push("planetary-planet--active");
                            } else if (!isConnected) {
                                planetClasses.push("planetary-planet--dim");
                            }
                        }

                        return (
                            <g
                                key={i}
                                transform={`translate(${p.x}, ${p.y})`}
                                onMouseEnter={() => setHoveredApp(p.app)}
                                onMouseLeave={() => setHoveredApp(null)}
                            >
                                <circle
                                    className={planetClasses.join(" ")}
                                    r={planetRadius(p.seconds)}
                                    fill={planetColorByApp.get(p.app) || "#6bdcff"}
                                />
                                <text
                                    className={[
                                        "planetary-label",
                                        hoveredApp && !isHovered && !isConnected
                                            ? "planetary-label--dim"
                                            : ""
                                    ].join(" ")}
                                    x={0}
                                    y={0}
                                >
                                    {p.app}
                                </text>
                            </g>
                        );
                    })}
                </g>
            </svg>

            {hoveredAppInfo && (
                <div className="planetary-tooltip">
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
                            {Math.round(hoveredAppInfo.seconds / 60)} min
                            {" "}
                            ({Math.round(hoveredAppInfo.share * 100)}%)
                        </span>
                    </div>
                    <div className="planetary-tooltip-row">
                        <span>Transitions:</span>
                        <span>
                            {hoveredAppInfo.incomingCount} in /
                            {" "}
                            {hoveredAppInfo.outgoingCount} out
                        </span>
                    </div>
                    <div className="planetary-tooltip-row">
                        <span>Avg friction:</span>
                        <span>{hoveredAppInfo.avgFriction}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PlanetaryMap;
