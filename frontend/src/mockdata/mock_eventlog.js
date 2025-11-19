export const eventLogMock = [
    {
        id: 1,
        type: "STATE",
        app: "Github",
        duration_sec: 420,
        start: "2025-11-15T09:00:00.000Z",
        description: "Review task description and acceptance criteria"
    },
    {
        id: 2,
        type: "TRANSITION",
        from: "Github",
        to: "IDE",
        duration_sec: 2,
        friction: 0, // Low
        start: "2025-11-15T09:00:00.000Z",
        description: "Path 1: Github → IDE"
    },
    {
        id: 3,
        type: "STATE",
        app: "IDE",
        duration_sec: 600,
        start: "2025-11-15T09:00:00.000Z",
        description: "Set up project environment and load relevant files"
    },
    {
        id: 4,
        type: "TRANSITION",
        from: "IDE",
        to: "Browser",
        duration_sec: 4,
        friction: 1, // Low-Medium
        start: "2025-11-15T09:00:00.000Z",
        description: "Path 2: IDE → Browser"
    },
    {
        id: 5,
        type: "STATE",
        app: "Browser",
        duration_sec: 180,
        start: "2025-11-15T09:00:00.000Z",
        description: "Reference UI library documentation"
    },
    {
        id: 6,
        type: "TRANSITION",
        from: "Browser",
        to: "IDE",
        duration_sec: 1,
        friction: 0, // Low
        start: "2025-11-15T09:00:00.000Z",
        description: "Path 3: Browser → IDE"
    },
    {
        id: 7,
        type: "STATE",
        app: "IDE",
        duration_sec: 900,
        start: "2025-11-15T09:00:00.000Z",
        description: "Implement initial layout and component structure"
    },
    {
        id: 8,
        type: "TRANSITION",
        from: "IDE",
        to: "Figma",
        duration_sec: 6,
        friction: 2, // Medium
        start: "2025-11-15T09:00:00.000Z",
        description: "Path 4: IDE → Figma"
    },
    {
        id: 9,
        type: "STATE",
        app: "Figma",
        duration_sec: 480,
        start: "2025-11-15T09:00:00.000Z",
        description: "Inspect design specs and spacing details"
    },
    {
        id: 10,
        type: "TRANSITION",
        from: "Figma",
        to: "IDE",
        duration_sec: 3,
        friction: 1, // Low-Medium
        start: "2025-11-15T09:00:00.000Z",
        description: "Path 5: Figma → IDE"
    },
    {
        id: 11,
        type: "STATE",
        app: "IDE",
        duration_sec: 540,
        start: "2025-11-15T09:00:00.000Z",
        description: "Refine styling and responsive rules"
    },
    {
        id: 12,
        type: "TRANSITION",
        from: "IDE",
        to: "Slack",
        duration_sec: 8,
        friction: 3, // Medium-High
        start: "2025-11-15T09:00:00.000Z",
        description: "Path 6: IDE → Slack"
    },
    {
        id: 13,
        type: "STATE",
        app: "Slack",
        duration_sec: 240,
        start: "2025-11-15T09:00:00.000Z",
        description: "Ask designer about unexpected spacing mismatch"
    },
    {
        id: 14,
        type: "TRANSITION",
        from: "Slack",
        to: "IDE",
        duration_sec: 3,
        friction: 1, // Low-Medium
        start: "2025-11-15T09:00:00.000Z",
        description: "Path 7: Slack → IDE"
    },
    {
        id: 15,
        type: "STATE",
        app: "IDE",
        duration_sec: 300,
        start: "2025-11-15T09:00:00.000Z",
        description: "Apply clarified spacing updates"
    },
    {
        id: 16,
        type: "TRANSITION",
        from: "IDE",
        to: "LLM",
        duration_sec: 10,
        friction: 4, // High
        start: "2025-11-15T09:00:00.000Z",
        description: "Path 8: IDE → LLM"
    },
    {
        id: 17,
        type: "STATE",
        app: "LLM",
        duration_sec: 900,
        start: "2025-11-15T09:00:00.000Z",
        description: "Ask for assistance debugging async rendering issue"
    },
    {
        id: 18,
        type: "TRANSITION",
        from: "LLM",
        to: "Browser",
        duration_sec: 2,
        friction: 0, // Low
        start: "2025-11-15T09:00:00.000Z",
        description: "Path 9: LLM → Browser"
    },
    {
        id: 19,
        type: "STATE",
        app: "Browser",
        duration_sec: 360,
        start: "2025-11-15T09:00:00.000Z",
        description: "Search related bug reports and troubleshooting tips"
    },
    {
        id: 20,
        type: "TRANSITION",
        from: "Browser",
        to: "IDE",
        duration_sec: 2,
        friction: 0, // Low
        start: "2025-11-15T09:00:00.000Z",
        description: "Path 10: Browser → IDE"
    },
    {
        id: 21,
        type: "STATE",
        app: "IDE",
        duration_sec: 1020,
        start: "2025-11-15T09:00:00.000Z",
        description: "Fix bug and complete functional implementation"
    },
    {
        id: 22,
        type: "TRANSITION",
        from: "IDE",
        to: "Spotify",
        duration_sec: 7,
        friction: 3, // Medium-High
        start: "2025-11-15T09:00:00.000Z",
        description: "Path 11: IDE → Spotify"
    },
    {
        id: 23,
        type: "STATE",
        app: "Spotify",
        duration_sec: 720,
        start: "2025-11-15T09:00:00.000Z",
        description: "Play music to maintain flow"
    },
    {
        id: 24,
        type: "TRANSITION",
        from: "Spotify",
        to: "IDE",
        duration_sec: 1,
        friction: 0, // Low
        start: "2025-11-15T09:00:00.000Z",
        description: "Path 12: Spotify → IDE"
    },
    {
        id: 25,
        type: "STATE",
        app: "IDE",
        duration_sec: 600,
        start: "2025-11-15T09:00:00.000Z",
        description: "Finalize feature logic and polish code"
    },
    {
        id: 26,
        type: "TRANSITION",
        from: "IDE",
        to: "Local Dev",
        duration_sec: 5,
        friction: 2, // Medium
        start: "2025-11-15T09:00:00.000Z",
        description: "Path 13: IDE → Local Dev"
    },
    {
        id: 27,
        type: "STATE",
        app: "Local Dev",
        duration_sec: 1200,
        start: "2025-11-15T09:00:00.000Z",
        description: "Run tests, validate behavior, verify interactions"
    },
    {
        id: 28,
        type: "TRANSITION",
        from: "Local Dev",
        to: "IDE",
        duration_sec: 3,
        friction: 1, // Low-Medium
        start: "2025-11-15T09:00:00.000Z",
        description: "Path 14: Local Dev → IDE"
    },
    {
        id: 29,
        type: "STATE",
        app: "IDE",
        duration_sec: 180,
        start: "2025-11-15T09:00:00.000Z",
        description: "Make final adjustments"
    },
    {
        id: 30,
        type: "TRANSITION",
        from: "IDE",
        to: "Github",
        duration_sec: 1,
        friction: 0, // Low
        start: "2025-11-15T09:00:00.000Z",
        description: "Path 15: IDE → Github"
    },
    {
        id: 31,
        type: "STATE",
        app: "Github",
        duration_sec: 540,
        start: "2025-11-15T09:00:00.000Z",
        description: "Commit changes and prepare PR"
    },
    {
        id: 32,
        type: "TRANSITION",
        from: "Github",
        to: "Browser",
        duration_sec: 2,
        friction: 0, // Low
        start: "2025-11-15T09:00:00.000Z",
        description: "Path 16: Github → Browser"
    },
    {
        id: 33,
        type: "STATE",
        app: "Browser",
        duration_sec: 480,
        start: "2025-11-15T09:00:00.000Z",
        description: "Review final PR details"
    },
    {
        id: 34,
        type: "TRANSITION",
        from: "Browser",
        to: "Github",
        duration_sec: 1,
        friction: 0, // Low
        start: "2025-11-15T09:00:00.000Z",
        description: "Path 17: Browser → Github"
    },
    {
        id: 35,
        type: "STATE",
        app: "Github",
        duration_sec: 300,
        start: "2025-11-15T09:00:00.000Z",
        description: "Submit PR and conclude the task"
    }
];

export default eventLogMock;
