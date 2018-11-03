
const { readFile, ensureDir, writeFile, ensureFile } = require('fs-extra');
const {join} = require('path');

const { showInputBox, showErrorMessage, toPascal, toSlug } = require('./utils');



module.exports = function createFile(type) {
  return async (fs) => {

    const { fsPath } = fs;
    const componentName = await showInputBox(type, fsPath);
    if(!componentName) {
      return;
    }
    const templatePath = `${__dirname}/templates/BasicComponent`
    const dirName = toSlug(componentName);
    const fileName = toPascal(componentName);
    await ensureDir(`${fsPath}/${dirName}`)

    const fileArr = ['index.js', '_Name_.js', '_Name_.scss'];

    for(let i in fileArr) {
      const filePath = fileArr[i];
      try {
        const content = await readFile(join(templatePath, filePath))
        const fileContent = String(content).replace(/<%= Name %>/igm, fileName);
        const newFilePath = join(fsPath, dirName, filePath.replace(/_Name_/ig, fileName));
        await ensureFile(newFilePath);
        await writeFile(newFilePath, fileContent)
      } catch (err) {
        console.log('superme-generator-plugin',err);
        showErrorMessage(err)
      }
    }
  }
}