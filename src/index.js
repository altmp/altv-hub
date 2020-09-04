const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const walk = require("walk");
const files = [];

const walker = walk.walk("resources", { followLinks: false });

walker.on("file", (root, stat, next) => {
  files.push({
    author: root.replace("resources\\", ""),
    filePath: path.join(root, stat.name),
  });
  next();
});

walker.on("end", async () => {
  const finalizedFiles = [];

  for (let i = 0; i < files.length; i++) {
    let fileData = JSON.parse(fs.readFileSync(files[i].filePath).toString());
    fileData.author = files[i].author;
    const repoPath = fileData.url.replace("https://github.com/", "");
    const response = await fetch(`https://api.github.com/repos/${repoPath}`);
    const repoDataString = await response.text();
    const repoData = JSON.parse(repoDataString);
    fileData.updated = repoData.updated_at;
    fileData.creation = repoData.created_at;
    fileData.pushed = repoData.pushed_at;
    fileData.stars = repoData.stargazers_count;
    console.log(fileData.updated);

    finalizedFiles.push(fileData);
    console.log(`Parsed Files: ${i}/${files.length}`);
  }

  if (!fs.existsSync(path.join(__dirname, "../", "/dist"))) {
    fs.mkdirSync(path.join(__dirname, "../", "/dist"));
  }

  fs.writeFileSync(
    path.join(__dirname, "../", "/dist/resources.json"),
    JSON.stringify(finalizedFiles)
  );

  console.log(`Total Resources: ${files.length}`);
});
