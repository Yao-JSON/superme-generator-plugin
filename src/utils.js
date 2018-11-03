const vscode = require('vscode');
const toPascal = require('to-pascal-case');
const toSlug = require('to-slug-case');

exports.toSlug = toSlug;

exports.toPascal = toPascal;

exports.showErrorMessage = function showMessage(message) {
  // vscode api
  // https://code.visualstudio.com/docs/extensionAPI/vscode-api
  vscode.window.showErrorMessage(message);
}

exports.showInputBox = async function showInputBox(baseDirectory) {
  try {
    const input = await vscode
      .window
      .showInputBox({
        prompt: `Enter name of React Component for Bisfish to be added under: ${baseDirectory}`,
        placeHolder: `React Component Name`
      });
    return input;
  } catch (e) {
    showMessage(e, 'error')
    return;
  }
}

