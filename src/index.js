const fetch = require("node-fetch");
const gitDateExtractor = require('git-date-extractor');
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
  try {
    const fileInfo = [];

    for (let i = 0; i < files.length; i++) {
      console.log(`Parsing File: ${i}/${files.length}`);

      const fileData = JSON.parse(fs.readFileSync(files[i].filePath).toString());
      const extraction = await gitDateExtractor.getStamps({ files: [ files[i].filePath ] });
      const extractionData = extraction[Object.keys(extraction)[0]];

      fileData.author = files[i].author;
      fileData.updated = new Date(extractionData.modified * 1000).toISOString();
      fileData.pushed = new Date(extractionData.modified * 1000).toISOString();
      fileData.creation = new Date(extractionData.created * 1000).toISOString();

      // Rate Limiting will prevent this from properly populating.
      // Currently we'll use git logs to determine updates.
      // const repoPath = fileData.url.replace("https://github.com/", "");
      // const response = await fetch(`https://api.github.com/repos/${repoPath}`);
      // const repoDataString = await response.text();
      // const repoData = JSON.parse(repoDataString);
      // fileData.updated = repoData.updated_at;
      // fileData.creation = repoData.created_at;
      // fileData.pushed = repoData.pushed_at;
      // fileData.stars = repoData.stargazers_count;

      console.log(`Updated: ${fileData.updated}`);
      fileInfo.push(fileData);
    }

    const sortedFiles = fileInfo.sort((a, b) => {
      return new Date(a.updated) - new Date(b.updated);
    });

    sortedFiles.reverse();

    if (!fs.existsSync(path.join(__dirname, "../", "/dist"))) {
      fs.mkdirSync(path.join(__dirname, "../", "/dist"));
    }

    fs.writeFileSync(
      path.join(__dirname, "../", "/dist/resources.json"),
      JSON.stringify(sortedFiles, null, '\t')
    );

    console.log(`Total Resources: ${files.length}`);
  } catch(e) {
    console.error('Failed to update resources:');
    console.error(e);
    process.exit(1);
  }
});
