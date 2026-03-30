const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const packageJsonPath = path.join(root, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const buildDir = path.join(root, 'build');
const sourceFile = path.join(root, 'src', 'main.ts');

fs.mkdirSync(buildDir, { recursive: true });

const source = fs.readFileSync(sourceFile, 'utf8');
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    target: ts.ScriptTarget.ES2018,
    module: ts.ModuleKind.ES2020
  }
});

fs.writeFileSync(path.join(buildDir, 'app.js'), transpiled.outputText);

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sentence Word Counter</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        background: #f4f7f2;
      }
      .container {
        max-width: 560px;
        margin: 48px auto;
        background: #ffffff;
        border: 1px solid #d9e6d2;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 6px 20px rgba(40, 73, 29, 0.08);
      }
      h1 { margin-top: 0; }
      textarea {
        width: 100%;
        min-height: 130px;
        resize: vertical;
        padding: 10px;
        box-sizing: border-box;
        margin-bottom: 12px;
      }
      button {
        width: 100%;
        padding: 10px;
        border: none;
        background: #2c7d2e;
        color: #fff;
        border-radius: 6px;
        cursor: pointer;
      }
      #result {
        margin-top: 14px;
        font-weight: bold;
      }
      .meta {
        margin-top: 18px;
        color: #5d6f57;
        font-size: 12px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>App 2: Sentence Word Counter</h1>
      <textarea id="sentence" placeholder="Type a sentence here..."></textarea>
      <button id="count">Count Words</button>
      <div id="result">Words: 0</div>
      <div class="meta">version: ${packageJson.version}</div>
    </div>
    <script type="module" src="./app.js"></script>
  </body>
</html>`;

fs.writeFileSync(path.join(buildDir, 'index.html'), html);
console.log('Build completed for dummy-app-2 (Word Counter TS Frontend)');