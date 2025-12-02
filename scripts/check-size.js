const fs = require("fs");
const path = require("path");

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function getFiles(dir, extensions) {
  let results = [];
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(getFiles(fullPath, extensions));
    } else if (extensions.some((ext) => item.endsWith(ext))) {
      results.push({
        path: fullPath,
        size: stat.size,
        formattedSize: formatBytes(stat.size),
      });
    }
  });

  return results;
}

console.log("📊 Анализ размера файлов...\n");

// Проверяем CSS файлы
const cssFiles = getFiles(".", [".css"]);
console.log("CSS файлы:");
cssFiles.forEach((file) => {
  console.log(`  ${file.path}: ${file.formattedSize}`);
});

// Проверяем изображения
const imageFiles = getFiles(".", [".jpg", ".jpeg", ".png", ".webp", ".gif"]);
console.log("\nИзображения:");
imageFiles.forEach((file) => {
  console.log(`  ${file.path}: ${file.formattedSize}`);
});

// Итог
const allFiles = [...cssFiles, ...imageFiles];
const totalSize = allFiles.reduce((sum, file) => sum + file.size, 0);
console.log(`\n📈 Всего файлов: ${allFiles.length}`);
console.log(`📦 Общий размер: ${formatBytes(totalSize)}`);
