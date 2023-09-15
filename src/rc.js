// Npmrc will be ignored by npm, so manual synchronization is required

const { existsSync } = require("fs");
const { writeFile, readFile, appendFile } = require("fs/promises");

async function writeNpmrc(
  record,
) {
  const file = ".npmrc";
  if (!existsSync(file)) {
    await writeFile(file, record, { encoding: "utf-8" });
  } else {
    const text = await readFile(file, { encoding: "utf-8" });
    if (!text.includes(record)) {
      await appendFile(file, "\n" + record);
    }
  }
}

const npmrcs = {
  "nuxt": [
    "shamefully-hoist=true",
    "auto-install-peers=true",
    "registry=https://registry.npmmirror.com/",
  ],
  "vuecli-vue2": [
    "registry=https://registry.npmmirror.com/",
    "sass_binary_site=https://npm.taobao.org/mirrors/node-sass/",
  ],
};

async function syncNpmrc(project) {
  const npmrc = npmrcs[project];
  if (npmrc) {
    for (const record of npmrc) {
      await writeNpmrc(record);
    }
  }
}

module.exports = {
  syncNpmrc,
};