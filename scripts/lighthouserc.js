module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:8080"], // или ваш URL
      startServerCommand: "npm run start", // команда для запуска сервера
      startServerReadyPattern: "ready", // текст в логах при готовности
      numberOfRuns: 3, // количество запусков для усреднения
      settings: {
        chromeFlags: "--no-sandbox --headless",
        throttlingMethod: "simulate", // simulate/devtools/provided
        throttling: {
          rttMs: 150,
          throughputKbps: 1638.4,
          cpuSlowdownMultiplier: 4,
        },
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.9 }],
        "categories:pwa": ["error", { minScore: 0.8 }],
        "uses-rel-preconnect": ["warn", { minScore: 0 }],
        "render-blocking-resources": ["warn", { maxLength: 5 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
