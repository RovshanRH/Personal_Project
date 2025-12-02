// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      // URL для проверки
      url: [
        "http://localhost:8080/index.html",
        "http://localhost:8080/pages/projects.html",
        "http://localhost:8080/pages/contacts.html",
        "http://localhost:8080/pages/diary.html",
      ],
      // Количество запусков для каждого URL
      numberOfRuns: 3,
      // Папка для отчетов
      outputDir: "./lhci-reports",
      // Настройки Chrome
      chromeFlags: "--no-sandbox --headless",
    },
    assert: {
      // Пороговые значения для метрик
      assertions: {
        "categories:performance": ["error", { minScore: 0.8 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.9 }],
        "first-contentful-paint": ["warn", { maxNumericValue: 2000 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 4000 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        "total-blocking-time": ["error", { maxNumericValue: 300 }],
      },
    },
    upload: {
      // Настройки загрузки отчетов (опционально)
      target: "temporary-public-storage",
    },
    server: {
      // Локальный сервер (если нужен)
    },
    wizard: {
      // Помощник настройки
    },
  },
};
