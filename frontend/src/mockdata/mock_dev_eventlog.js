export const eventLogMock = [
    {
        id: 1,
        type: "STATE",
        app: "Github",
        duration_sec: 360,
        start: "2025-11-18T09:00:00.000Z",
        description: "Review UI bug report and screenshots"
    },
    {
        id: 2,
        type: "TRANSITION",
        from: "Github",
        to: "IDE",
        duration_sec: 2,
        friction: 0,
        start: "2025-11-18T09:06:00.000Z",
        description: "Path 1: Github → IDE"
    },
    {
        id: 3,
        type: "STATE",
        app: "IDE",
        duration_sec: 480,
        start: "2025-11-18T09:06:02.000Z",
        description: "Locate affected component files and investigate code"
    },
    {
        id: 4,
        type: "TRANSITION",
        from: "IDE",
        to: "Browser",
        duration_sec: 3,
        friction: 1,
        start: "2025-11-18T09:14:02.000Z",
        description: "Path 2: IDE → Browser"
    },
    {
        id: 5,
        type: "STATE",
        app: "Browser",
        duration_sec: 300,
        start: "2025-11-18T09:14:05.000Z",
        description: "Reproduce bug in staging environment"
    },
    {
        id: 6,
        type: "TRANSITION",
        from: "Browser",
        to: "Figma",
        duration_sec: 5,
        friction: 2,
        start: "2025-11-18T09:19:05.000Z",
        description: "Path 3: Browser → Figma"
    },
    {
        id: 7,
        type: "STATE",
        app: "Figma",
        duration_sec: 420,
        start: "2025-11-18T09:19:10.000Z",
        description: "Review original design specs and spacing values"
    },
    {
        id: 8,
        type: "TRANSITION",
        from: "Figma",
        to: "IDE",
        duration_sec: 2,
        friction: 0,
        start: "2025-11-18T09:26:10.000Z",
        description: "Path 4: Figma → IDE"
    },
    {
        id: 9,
        type: "STATE",
        app: "IDE",
        duration_sec: 720,
        start: "2025-11-18T09:26:12.000Z",
        description: "Begin implementing CSS fixes for alignment issues"
    },
    {
        id: 10,
        type: "TRANSITION",
        from: "IDE",
        to: "Slack",
        duration_sec: 7,
        friction: 3,
        start: "2025-11-18T09:38:12.000Z",
        description: "Path 5: IDE → Slack"
    },
    {
        id: 11,
        type: "STATE",
        app: "Slack",
        duration_sec: 180,
        start: "2025-11-18T09:38:19.000Z",
        description: "Ask designer about intended behavior for edge case"
    },
    {
        id: 12,
        type: "TRANSITION",
        from: "Slack",
        to: "IDE",
        duration_sec: 3,
        friction: 1,
        start: "2025-11-18T09:41:19.000Z",
        description: "Path 6: Slack → IDE"
    },
    {
        id: 13,
        type: "STATE",
        app: "IDE",
        duration_sec: 900,
        start: "2025-11-18T09:41:22.000Z",
        description: "Continue refining layout and responsive behavior"
    },
    {
        id: 14,
        type: "TRANSITION",
        from: "IDE",
        to: "Local Dev",
        duration_sec: 4,
        friction: 1,
        start: "2025-11-18T09:56:22.000Z",
        description: "Path 7: IDE → Local Dev"
    },
    {
        id: 15,
        type: "STATE",
        app: "Local Dev",
        duration_sec: 600,
        start: "2025-11-18T09:56:26.000Z",
        description: "Test changes across different screen sizes"
    },
    {
        id: 16,
        type: "TRANSITION",
        from: "Local Dev",
        to: "IDE",
        duration_sec: 2,
        friction: 0,
        start: "2025-11-18T10:06:26.000Z",
        description: "Path 8: Local Dev → IDE"
    },
    {
        id: 17,
        type: "STATE",
        app: "IDE",
        duration_sec: 420,
        start: "2025-11-18T10:06:28.000Z",
        description: "Adjust media queries for tablet breakpoint"
    },
    {
        id: 18,
        type: "TRANSITION",
        from: "IDE",
        to: "LLM",
        duration_sec: 9,
        friction: 4,
        start: "2025-11-18T10:13:28.000Z",
        description: "Path 9: IDE → LLM"
    },
    {
        id: 19,
        type: "STATE",
        app: "LLM",
        duration_sec: 540,
        start: "2025-11-18T10:13:37.000Z",
        description: "Ask for best practices on flexbox vs grid for this layout"
    },
    {
        id: 20,
        type: "TRANSITION",
        from: "LLM",
        to: "IDE",
        duration_sec: 2,
        friction: 0,
        start: "2025-11-18T10:22:37.000Z",
        description: "Path 10: LLM → IDE"
    },
    {
        id: 21,
        type: "STATE",
        app: "IDE",
        duration_sec: 1080,
        start: "2025-11-18T10:22:39.000Z",
        description: "Refactor layout approach using recommended solution"
    },
    {
        id: 22,
        type: "TRANSITION",
        from: "IDE",
        to: "Spotify",
        duration_sec: 6,
        friction: 2,
        start: "2025-11-18T10:40:39.000Z",
        description: "Path 11: IDE → Spotify"
    },
    {
        id: 23,
        type: "STATE",
        app: "Spotify",
        duration_sec: 900,
        start: "2025-11-18T10:40:45.000Z",
        description: "Start focus playlist for deep work session"
    },
    {
        id: 24,
        type: "TRANSITION",
        from: "Spotify",
        to: "IDE",
        duration_sec: 1,
        friction: 0,
        start: "2025-11-18T10:55:45.000Z",
        description: "Path 12: Spotify → IDE"
    },
    {
        id: 25,
        type: "STATE",
        app: "IDE",
        duration_sec: 960,
        start: "2025-11-18T10:55:46.000Z",
        description: "Polish CSS, add comments, ensure code quality"
    },
    {
        id: 26,
        type: "TRANSITION",
        from: "IDE",
        to: "Local Dev",
        duration_sec: 3,
        friction: 1,
        start: "2025-11-18T11:11:46.000Z",
        description: "Path 13: IDE → Local Dev"
    },
    {
        id: 27,
        type: "STATE",
        app: "Local Dev",
        duration_sec: 840,
        start: "2025-11-18T11:11:49.000Z",
        description: "Run full test suite and visual regression tests"
    },
    {
        id: 28,
        type: "TRANSITION",
        from: "Local Dev",
        to: "Browser",
        duration_sec: 2,
        friction: 0,
        start: "2025-11-18T11:25:49.000Z",
        description: "Path 14: Local Dev → Browser"
    },
    {
        id: 29,
        type: "STATE",
        app: "Browser",
        duration_sec: 420,
        start: "2025-11-18T11:25:51.000Z",
        description: "Manual testing in different browsers and devices"
    },
    {
        id: 30,
        type: "TRANSITION",
        from: "Browser",
        to: "IDE",
        duration_sec: 2,
        friction: 0,
        start: "2025-11-18T11:32:51.000Z",
        description: "Path 15: Browser → IDE"
    },
    {
        id: 31,
        type: "STATE",
        app: "IDE",
        duration_sec: 240,
        start: "2025-11-18T11:32:53.000Z",
        description: "Fix minor Safari-specific issue discovered during testing"
    },
    {
        id: 32,
        type: "TRANSITION",
        from: "IDE",
        to: "Local Dev",
        duration_sec: 2,
        friction: 0,
        start: "2025-11-18T11:36:53.000Z",
        description: "Path 16: IDE → Local Dev"
    },
    {
        id: 33,
        type: "STATE",
        app: "Local Dev",
        duration_sec: 300,
        start: "2025-11-18T11:36:55.000Z",
        description: "Re-run tests to confirm Safari fix"
    },
    {
        id: 34,
        type: "TRANSITION",
        from: "Local Dev",
        to: "IDE",
        duration_sec: 1,
        friction: 0,
        start: "2025-11-18T11:41:55.000Z",
        description: "Path 17: Local Dev → IDE"
    },
    {
        id: 35,
        type: "STATE",
        app: "IDE",
        duration_sec: 180,
        start: "2025-11-18T11:41:56.000Z",
        description: "Final code review and cleanup"
    },
    {
        id: 36,
        type: "TRANSITION",
        from: "IDE",
        to: "Github",
        duration_sec: 2,
        friction: 0,
        start: "2025-11-18T11:44:56.000Z",
        description: "Path 18: IDE → Github"
    },
    {
        id: 37,
        type: "STATE",
        app: "Github",
        duration_sec: 600,
        start: "2025-11-18T11:44:58.000Z",
        description: "Create PR with detailed description and screenshots"
    },
    {
        id: 38,
        type: "TRANSITION",
        from: "Github",
        to: "Slack",
        duration_sec: 5,
        friction: 2,
        start: "2025-11-18T11:54:58.000Z",
        description: "Path 19: Github → Slack"
    },
    {
        id: 39,
        type: "STATE",
        app: "Slack",
        duration_sec: 120,
        start: "2025-11-18T11:55:03.000Z",
        description: "Notify team that fix is ready for review"
    },
    {
        id: 40,
        type: "TRANSITION",
        from: "Slack",
        to: "Github",
        duration_sec: 3,
        friction: 1,
        start: "2025-11-18T11:57:03.000Z",
        description: "Path 20: Slack → Github"
    },
    {
        id: 41,
        type: "STATE",
        app: "Github",
        duration_sec: 240,
        start: "2025-11-18T11:57:06.000Z",
        description: "Add reviewers and link related issues"
    }
];

export default eventLogMock;