const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const util = require("util");
const execPromise = util.promisify(exec);

console.log("🖼️ Оптимизация изображений...");

// Проверяем наличие ImageMagick (convert)
exec("convert --version", async (error) => {
  if (error) {
    console.log("⚠️ ImageMagick не установлен. Установите:");
    console.log("  Windows: https://imagemagick.org/script/download.php");
    console.log("  macOS: brew install imagemagick");
    console.log("  Linux: sudo apt-get install imagemagick");
    return;
  }

  const imagesDir = "./images";
  if (!fs.existsSync(imagesDir)) {
    console.log("⚠️ Папка images не найдена");
    return;
  }

  const files = fs
    .readdirSync(imagesDir)
    .filter((file) => /\.(jpg|jpeg|png)$/i.test(file));

  console.log(`Найдено ${files.length} изображений для оптимизации`);

  for (const file of files) {
    const inputPath = path.join(imagesDir, file);
    const outputPath = path.join(imagesDir, path.parse(file).name + ".webp");

    try {
      await execPromise(`convert "${inputPath}" -quality 85 "${outputPath}"`);
      const originalSize = fs.statSync(inputPath).size;
      const newSize = fs.statSync(outputPath).size;
      const saved = (((originalSize - newSize) / originalSize) * 100).toFixed(
        1
      );

      console.log(
        `✅ ${file} -> ${path.basename(outputPath)} (экономия ${saved}%)`
      );
    } catch (err) {
      console.error(`❌ Ошибка при обработке ${file}:`, err.message);
    }
  }

  console.log("🎯 Оптимизация завершена!");
});
