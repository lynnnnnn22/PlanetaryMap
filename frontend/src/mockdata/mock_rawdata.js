const rawAwData = {
    buckets: {
        "aw-watcher-window_mock-device": {
            id: "aw-watcher-window_mock-device",
            created: "2025-11-14T20:56:57.975739+00:00",
            type: "currentwindow",
            client: "aw-watcher-window",
            hostname: "mock-device",
            data: {},
            events: [
                {
                    timestamp: "2025-11-15T09:50:00.000Z",
                    duration: 300,
                    data: {
                        app: "VSCode",
                        title: "main.py — Visual Studio Code"
                    }
                },
                {
                    timestamp: "2025-11-15T09:55:00.000Z",
                    duration: 100,
                    data: {
                        app: "Slack",
                        title: "Team Chat — Slack"
                    }
                },
                {
                    timestamp: "2025-11-15T09:56:40.000Z",
                    duration: 200,
                    data: {
                        app: "Google Chrome",
                        title: "Google Docs — Research Paper"
                    }
                }
            ]
        },

        "aw-watcher-afk_mock-device": {
            id: "aw-watcher-afk_mock-device",
            created: "2025-11-14T20:56:58.746289+00:00",
            type: "afkstatus",
            client: "aw-watcher-afk",
            hostname: "mock-device",
            data: {},
            events: [
                {
                    timestamp: "2025-11-15T09:59:00.000Z",
                    duration: 300,
                    data: { status: "afk" }
                },
                {
                    timestamp: "2025-11-15T10:04:00.000Z",
                    duration: 600,
                    data: { status: "not-afk" }
                }
            ]
        }
    }
};

export default rawAwData;