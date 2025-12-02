const fs = require("fs");
const path = require("path");
const htmlMinifier = require("html-minifier-terser");

const htmlFiles = [
  "index.html",
  "pages/projects.html",
  "pages/contacts.html",
  "pages/diary.html",
];

const minifyOptions = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
  minifyJS: true,
  minifyURLs: true,
};

console.log("📄 Минификация HTML файлов...");

htmlFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    try {
      const html = fs.readFileSync(file, "utf8");
      const minified = htmlMinifier.minify(html, minifyOptions);

      // Сохраняем минифицированную версию
      fs.writeFileSync(file.replace(".html", ".min.html"), minified);
      console.log(`✅ ${file} -> ${file.replace(".html", ".min.html")}`);
    } catch (error) {
      console.error(`❌ Ошибка при обработке ${file}:`, error.message);
    }
  } else {
    console.log(`⚠️ Файл не найден: ${file}`);
  }
});

console.log("🎯 Минификация завершена!");
