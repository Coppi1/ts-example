import fs from "fs";
import path from "path";

const dir = "./dist"; // Diretório onde os arquivos compilados estão localizados

function updateImports(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  const updatedContent = content.replace(
    /import\s+(.*)\s+from\s+['"]([./]+[^'"]+)['"]/g,
    (match, p1, p2) => {
      return `import ${p1} from '${p2}.js'`;
    }
  );

  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent, "utf8");
    console.log(`Updated imports in: ${filePath}`);
  }
}

function walkDir(currentDir) {
  fs.readdir(currentDir, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const filePath = path.join(currentDir, file);
      fs.stat(filePath, (err, stat) => {
        if (err) throw err;

        if (stat.isDirectory()) {
          walkDir(filePath);
        } else if (path.extname(file) === ".js") {
          updateImports(filePath);
        }
      });
    });
  });
}

walkDir(dir);
