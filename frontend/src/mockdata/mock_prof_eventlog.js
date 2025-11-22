export const eventLogMock = [
    {
        id: 1,
        type: "STATE",
        app: "Slides",
        duration_sec: 1200,
        start: "2025-11-19T09:00:00.000Z",
        description: "Create lecture outline and structure main topics"
    },
    {
        id: 2,
        type: "TRANSITION",
        from: "Slides",
        to: "PDF Reader",
        duration_sec: 4,
        friction: 1,
        start: "2025-11-19T09:20:00.000Z",
        description: "Path 1: Slides → PDF Reader"
    },
    {
        id: 3,
        type: "STATE",
        app: "PDF Reader",
        duration_sec: 1800,
        start: "2025-11-19T09:20:04.000Z",
        description: "Review textbook chapter on quantum mechanics fundamentals"
    },
    {
        id: 4,
        type: "TRANSITION",
        from: "PDF Reader",
        to: "Slides",
        duration_sec: 2,
        friction: 0,
        start: "2025-11-19T09:50:04.000Z",
        description: "Path 2: PDF Reader → Slides"
    },
    {
        id: 5,
        type: "STATE",
        app: "Slides",
        duration_sec: 2400,
        start: "2025-11-19T09:50:06.000Z",
        description: "Draft first set of slides with key concepts and definitions"
    },
    {
        id: 6,
        type: "TRANSITION",
        from: "Slides",
        to: "Browser",
        duration_sec: 3,
        friction: 1,
        start: "2025-11-19T10:30:06.000Z",
        description: "Path 3: Slides → Browser"
    },
    {
        id: 7,
        type: "STATE",
        app: "Browser",
        duration_sec: 540,
        start: "2025-11-19T10:30:09.000Z",
        description: "Search for recent research papers on wave-particle duality"
    },
    {
        id: 8,
        type: "TRANSITION",
        from: "Browser",
        to: "Slides",
        duration_sec: 2,
        friction: 0,
        start: "2025-11-19T10:39:09.000Z",
        description: "Path 4: Browser → Slides"
    },
    {
        id: 9,
        type: "STATE",
        app: "Slides",
        duration_sec: 1500,
        start: "2025-11-19T10:39:11.000Z",
        description: "Add examples and real-world applications to slides"
    },
    {
        id: 10,
        type: "TRANSITION",
        from: "Slides",
        to: "Email",
        duration_sec: 6,
        friction: 2,
        start: "2025-11-19T11:04:11.000Z",
        description: "Path 5: Slides → Email"
    },
    {
        id: 11,
        type: "STATE",
        app: "Email",
        duration_sec: 600,
        start: "2025-11-19T11:04:17.000Z",
        description: "Respond to department chair about scheduling"
    },
    {
        id: 12,
        type: "TRANSITION",
        from: "Email",
        to: "Slides",
        duration_sec: 3,
        friction: 1,
        start: "2025-11-19T11:14:17.000Z",
        description: "Path 6: Email → Slides"
    },
    {
        id: 13,
        type: "STATE",
        app: "Slides",
        duration_sec: 1800,
        start: "2025-11-19T11:14:20.000Z",
        description: "Continue developing middle section of lecture"
    },
    {
        id: 14,
        type: "TRANSITION",
        from: "Slides",
        to: "Formula Generator",
        duration_sec: 7,
        friction: 3,
        start: "2025-11-19T11:44:20.000Z",
        description: "Path 7: Slides → Formula Generator"
    },
    {
        id: 15,
        type: "STATE",
        app: "Formula Generator",
        duration_sec: 900,
        start: "2025-11-19T11:44:27.000Z",
        description: "Create complex Schrödinger equation with proper notation"
    },
    {
        id: 16,
        type: "TRANSITION",
        from: "Formula Generator",
        to: "Slides",
        duration_sec: 3,
        friction: 1,
        start: "2025-11-19T11:59:27.000Z",
        description: "Path 8: Formula Generator → Slides"
    },
    {
        id: 17,
        type: "STATE",
        app: "Slides",
        duration_sec: 900,
        start: "2025-11-19T11:59:30.000Z",
        description: "Insert equations and format mathematical content"
    },
    {
        id: 18,
        type: "TRANSITION",
        from: "Slides",
        to: "PDF Reader",
        duration_sec: 3,
        friction: 1,
        start: "2025-11-19T12:14:30.000Z",
        description: "Path 9: Slides → PDF Reader"
    },
    {
        id: 19,
        type: "STATE",
        app: "PDF Reader",
        duration_sec: 1200,
        start: "2025-11-19T12:14:33.000Z",
        description: "Review supplementary materials and problem sets"
    },
    {
        id: 20,
        type: "TRANSITION",
        from: "PDF Reader",
        to: "Slides",
        duration_sec: 2,
        friction: 0,
        start: "2025-11-19T12:34:33.000Z",
        description: "Path 10: PDF Reader → Slides"
    },
    {
        id: 21,
        type: "STATE",
        app: "Slides",
        duration_sec: 1200,
        start: "2025-11-19T12:34:35.000Z",
        description: "Add practice problems and discussion questions"
    },
    {
        id: 22,
        type: "TRANSITION",
        from: "Slides",
        to: "Image Editor",
        duration_sec: 8,
        friction: 3,
        start: "2025-11-19T12:54:35.000Z",
        description: "Path 11: Slides → Image Editor"
    },
    {
        id: 23,
        type: "STATE",
        app: "Image Editor",
        duration_sec: 1800,
        start: "2025-11-19T12:54:43.000Z",
        description: "Create energy level diagram with custom annotations"
    },
    {
        id: 24,
        type: "TRANSITION",
        from: "Image Editor",
        to: "Slides",
        duration_sec: 4,
        friction: 1,
        start: "2025-11-19T13:24:43.000Z",
        description: "Path 12: Image Editor → Slides"
    },
    {
        id: 25,
        type: "STATE",
        app: "Slides",
        duration_sec: 600,
        start: "2025-11-19T13:24:47.000Z",
        description: "Insert and position diagrams in appropriate slides"
    },
    {
        id: 26,
        type: "TRANSITION",
        from: "Slides",
        to: "Communication App",
        duration_sec: 5,
        friction: 2,
        start: "2025-11-19T13:34:47.000Z",
        description: "Path 13: Slides → Communication App"
    },
    {
        id: 27,
        type: "STATE",
        app: "Communication App",
        duration_sec: 480,
        start: "2025-11-19T13:34:52.000Z",
        description: "Discuss lab setup with TA for demonstration"
    },
    {
        id: 28,
        type: "TRANSITION",
        from: "Communication App",
        to: "Browser",
        duration_sec: 3,
        friction: 1,
        start: "2025-11-19T13:42:52.000Z",
        description: "Path 14: Communication App → Browser"
    },
    {
        id: 29,
        type: "STATE",
        app: "Browser",
        duration_sec: 420,
        start: "2025-11-19T13:42:55.000Z",
        description: "Find demonstration videos of double-slit experiment"
    },
    {
        id: 30,
        type: "TRANSITION",
        from: "Browser",
        to: "Video Editor",
        duration_sec: 9,
        friction: 4,
        start: "2025-11-19T13:49:55.000Z",
        description: "Path 15: Browser → Video Editor"
    },
    {
        id: 31,
        type: "STATE",
        app: "Video Editor",
        duration_sec: 900,
        start: "2025-11-19T13:50:04.000Z",
        description: "Trim and clip relevant portions of demonstration video"
    },
    {
        id: 32,
        type: "TRANSITION",
        from: "Video Editor",
        to: "Slides",
        duration_sec: 4,
        friction: 1,
        start: "2025-11-19T14:05:04.000Z",
        description: "Path 16: Video Editor → Slides"
    },
    {
        id: 33,
        type: "STATE",
        app: "Slides",
        duration_sec: 1500,
        start: "2025-11-19T14:05:08.000Z",
        description: "Embed video and create transition slides"
    },
    {
        id: 34,
        type: "TRANSITION",
        from: "Slides",
        to: "PDF Reader",
        duration_sec: 3,
        friction: 1,
        start: "2025-11-19T14:30:08.000Z",
        description: "Path 17: Slides → PDF Reader"
    },
    {
        id: 35,
        type: "STATE",
        app: "PDF Reader",
        duration_sec: 1200,
        start: "2025-11-19T14:30:11.000Z",
        description: "Cross-reference historical context from reference book"
    },
    {
        id: 36,
        type: "TRANSITION",
        from: "PDF Reader",
        to: "Slides",
        duration_sec: 2,
        friction: 0,
        start: "2025-11-19T14:50:11.000Z",
        description: "Path 18: PDF Reader → Slides"
    },
    {
        id: 37,
        type: "STATE",
        app: "Slides",
        duration_sec: 2100,
        start: "2025-11-19T14:50:13.000Z",
        description: "Add historical context and key physicist contributions"
    },
    {
        id: 38,
        type: "TRANSITION",
        from: "Slides",
        to: "Image Editor",
        duration_sec: 6,
        friction: 2,
        start: "2025-11-19T15:25:13.000Z",
        description: "Path 19: Slides → Image Editor"
    },
    {
        id: 39,
        type: "STATE",
        app: "Image Editor",
        duration_sec: 1080,
        start: "2025-11-19T15:25:19.000Z",
        description: "Design probability distribution visualization"
    },
    {
        id: 40,
        type: "TRANSITION",
        from: "Image Editor",
        to: "Slides",
        duration_sec: 3,
        friction: 1,
        start: "2025-11-19T15:43:19.000Z",
        description: "Path 20: Image Editor → Slides"
    },
    {
        id: 41,
        type: "STATE",
        app: "Slides",
        duration_sec: 1800,
        start: "2025-11-19T15:43:22.000Z",
        description: "Finalize visual flow and slide transitions"
    },
    {
        id: 42,
        type: "TRANSITION",
        from: "Slides",
        to: "Email",
        duration_sec: 4,
        friction: 1,
        start: "2025-11-19T16:13:22.000Z",
        description: "Path 21: Slides → Email"
    },
    {
        id: 43,
        type: "STATE",
        app: "Email",
        duration_sec: 360,
        start: "2025-11-19T16:13:26.000Z",
        description: "Send lecture outline to TA for feedback"
    },
    {
        id: 44,
        type: "TRANSITION",
        from: "Email",
        to: "Slides",
        duration_sec: 2,
        friction: 0,
        start: "2025-11-19T16:19:26.000Z",
        description: "Path 22: Email → Slides"
    },
    {
        id: 45,
        type: "STATE",
        app: "Slides",
        duration_sec: 1500,
        start: "2025-11-19T16:19:28.000Z",
        description: "Review entire presentation and polish formatting"
    },
    {
        id: 46,
        type: "TRANSITION",
        from: "Slides",
        to: "Formula Generator",
        duration_sec: 5,
        friction: 2,
        start: "2025-11-19T16:44:28.000Z",
        description: "Path 23: Slides → Formula Generator"
    },
    {
        id: 47,
        type: "STATE",
        app: "Formula Generator",
        duration_sec: 540,
        start: "2025-11-19T16:44:33.000Z",
        description: "Generate additional mathematical derivations"
    },
    {
        id: 48,
        type: "TRANSITION",
        from: "Formula Generator",
        to: "Slides",
        duration_sec: 2,
        friction: 0,
        start: "2025-11-19T16:53:33.000Z",
        description: "Path 24: Formula Generator → Slides"
    },
    {
        id: 49,
        type: "STATE",
        app: "Slides",
        duration_sec: 900,
        start: "2025-11-19T16:53:35.000Z",
        description: "Add supplementary math slides for advanced students"
    },
    {
        id: 50,
        type: "TRANSITION",
        from: "Slides",
        to: "Communication App",
        duration_sec: 4,
        friction: 1,
        start: "2025-11-19T17:08:35.000Z",
        description: "Path 25: Slides → Communication App"
    },
    {
        id: 51,
        type: "STATE",
        app: "Communication App",
        duration_sec: 300,
        start: "2025-11-19T17:08:39.000Z",
        description: "Coordinate with grad student about research meeting"
    },
    {
        id: 52,
        type: "TRANSITION",
        from: "Communication App",
        to: "Slides",
        duration_sec: 2,
        friction: 0,
        start: "2025-11-19T17:13:39.000Z",
        description: "Path 26: Communication App → Slides"
    },
    {
        id: 53,
        type: "STATE",
        app: "Slides",
        duration_sec: 1200,
        start: "2025-11-19T17:13:41.000Z",
        description: "Final review, speaker notes, and timing adjustments"
    }
];

export default eventLogMock;