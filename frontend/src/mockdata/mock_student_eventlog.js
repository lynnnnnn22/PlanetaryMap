export const eventLogMock = [
    {
        id: 1,
        type: "STATE",
        app: "Email",
        duration_sec: 1800, // 30 min
        start: "2025-11-18T08:30:00.000Z"
    },
    {
        id: 2,
        type: "TRANSITION",
        from: "Email",
        to: "Browser-arXiv",
        duration_sec: 5,
        friction: 1,
        start: "2025-11-18T09:00:00.000Z"
    },
    {
        id: 3,
        type: "STATE",
        app: "Browser-arXiv",
        duration_sec: 3600, // 60 min
        start: "2025-11-18T09:00:05.000Z"
    },
    {
        id: 4,
        type: "TRANSITION",
        from: "Browser-arXiv",
        to: "PDF Reader",
        duration_sec: 3,
        friction: 0,
        start: "2025-11-18T10:00:05.000Z"
    },
    {
        id: 5,
        type: "STATE",
        app: "PDF Reader",
        duration_sec: 2700, // 45 min
        start: "2025-11-18T10:00:08.000Z"
    },
    {
        id: 6,
        type: "TRANSITION",
        from: "PDF Reader",
        to: "Obsidian",
        duration_sec: 4,
        friction: 1,
        start: "2025-11-18T10:45:08.000Z"
    },
    {
        id: 7,
        type: "STATE",
        app: "Obsidian",
        duration_sec: 1800, // 30 min
        start: "2025-11-18T10:45:12.000Z"
    },
    {
        id: 8,
        type: "TRANSITION",
        from: "Obsidian",
        to: "Jupyter",
        duration_sec: 5,
        friction: 2,
        start: "2025-11-18T11:15:12.000Z"
    },
    {
        id: 9,
        type: "STATE",
        app: "Jupyter",
        duration_sec: 4500, // 75 min
        start: "2025-11-18T11:15:17.000Z"
    },
    {
        id: 10,
        type: "TRANSITION",
        from: "Jupyter",
        to: "Terminal",
        duration_sec: 2,
        friction: 1,
        start: "2025-11-18T12:30:17.000Z"
    },
    {
        id: 11,
        type: "STATE",
        app: "Terminal",
        duration_sec: 1200, // 20 min
        start: "2025-11-18T12:30:19.000Z"
    },
    {
        id: 12,
        type: "TRANSITION",
        from: "Terminal",
        to: "Spotify",
        duration_sec: 2,
        friction: 0,
        start: "2025-11-18T12:50:19.000Z"
    },
    {
        id: 13,
        type: "STATE",
        app: "Spotify",
        duration_sec: 600, // 10 min
        start: "2025-11-18T12:50:21.000Z"
    },
    {
        id: 14,
        type: "TRANSITION",
        from: "Spotify",
        to: "IDE",
        duration_sec: 2,
        friction: 1,
        start: "2025-11-18T13:00:21.000Z"
    },
    {
        id: 15,
        type: "STATE",
        app: "IDE",
        duration_sec: 5400, // 90 min
        start: "2025-11-18T13:00:23.000Z"
    },
    {
        id: 16,
        type: "TRANSITION",
        from: "IDE",
        to: "Slack",
        duration_sec: 3,
        friction: 1,
        start: "2025-11-18T14:30:23.000Z"
    },
    {
        id: 17,
        type: "STATE",
        app: "Slack",
        duration_sec: 900, // 15 min
        start: "2025-11-18T14:30:26.000Z"
    },
    {
        id: 18,
        type: "TRANSITION",
        from: "Slack",
        to: "Overleaf",
        duration_sec: 3,
        friction: 2,
        start: "2025-11-18T14:45:26.000Z"
    },
    {
        id: 19,
        type: "STATE",
        app: "Overleaf",
        duration_sec: 3600, // 60 min
        start: "2025-11-18T14:45:29.000Z"
    },
    {
        id: 20,
        type: "TRANSITION",
        from: "Overleaf",
        to: "Browser-scholar",
        duration_sec: 3,
        friction: 1,
        start: "2025-11-18T15:45:29.000Z"
    },
    {
        id: 21,
        type: "STATE",
        app: "Browser-scholar",
        duration_sec: 1800, // 30 min
        start: "2025-11-18T15:45:32.000Z"
    },
    {
        id: 22,
        type: "TRANSITION",
        from: "Browser-scholar",
        to: "LLM",
        duration_sec: 2,
        friction: 2,
        start: "2025-11-18T16:15:32.000Z"
    },
    {
        id: 23,
        type: "STATE",
        app: "LLM",
        duration_sec: 1200, // 20 min
        start: "2025-11-18T16:15:34.000Z"
    },
    {
        id: 24,
        type: "TRANSITION",
        from: "LLM",
        to: "IDE",
        duration_sec: 2,
        friction: 1,
        start: "2025-11-18T16:35:34.000Z"
    },
    {
        id: 25,
        type: "STATE",
        app: "IDE",
        duration_sec: 4800, // 80 min
        start: "2025-11-18T16:35:36.000Z"
    },
    {
        id: 26,
        type: "TRANSITION",
        from: "IDE",
        to: "YouTube",
        duration_sec: 2,
        friction: 0,
        start: "2025-11-18T17:55:36.000Z"
    },
    {
        id: 27,
        type: "STATE",
        app: "YouTube",
        duration_sec: 1200, // 20 min
        start: "2025-11-18T17:55:38.000Z"
    },
    {
        id: 28,
        type: "TRANSITION",
        from: "YouTube",
        to: "IDE",
        duration_sec: 2,
        friction: 0,
        start: "2025-11-18T18:15:38.000Z"
    },
    {
        id: 29,
        type: "STATE",
        app: "IDE",
        duration_sec: 3600, // 60 min
        start: "2025-11-18T18:15:40.000Z"
    },
    {
        id: 30,
        type: "TRANSITION",
        from: "IDE",
        to: "Slack",
        duration_sec: 3,
        friction: 1,
        start: "2025-11-18T19:15:40.000Z"
    },
    {
        id: 31,
        type: "STATE",
        app: "Slack",
        duration_sec: 900, // 15 min
        start: "2025-11-18T19:15:43.000Z"
    },
    {
        id: 32,
        type: "TRANSITION",
        from: "Slack",
        to: "Email",
        duration_sec: 5,
        friction: 1,
        start: "2025-11-18T19:30:43.000Z"
    },
    {
        id: 33,
        type: "STATE",
        app: "Email",
        duration_sec: 1200, // 20 min
        start: "2025-11-18T19:30:48.000Z"
    },

    // --- Overnight gap (no AFK entries, just nothing logged) ---

    {
        id: 34,
        type: "STATE",
        app: "Overleaf",
        duration_sec: 1800, // 30 min
        start: "2025-11-19T08:30:00.000Z"
    },
    {
        id: 35,
        type: "TRANSITION",
        from: "Overleaf",
        to: "Browser-email",
        duration_sec: 3,
        friction: 1,
        start: "2025-11-19T09:00:00.000Z"
    },
    {
        id: 36,
        type: "STATE",
        app: "Browser-email",
        duration_sec: 900, // 15 min
        start: "2025-11-19T09:00:03.000Z"
    },
    {
        id: 37,
        type: "TRANSITION",
        from: "Browser-email",
        to: "IDE",
        duration_sec: 2,
        friction: 1,
        start: "2025-11-19T09:15:03.000Z"
    },
    {
        id: 38,
        type: "STATE",
        app: "IDE",
        duration_sec: 900, // 15 min
        start: "2025-11-19T09:15:05.000Z"
    }
];

export default eventLogMock;
