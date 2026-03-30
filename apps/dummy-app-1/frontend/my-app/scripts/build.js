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
    <title>Calculator App</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        background: #f5f7fb;
      }
      .container {
        max-width: 460px;
        margin: 48px auto;
        background: #ffffff;
        border: 1px solid #dce1ef;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 6px 20px rgba(28, 39, 77, 0.08);
      }
      h1 { margin-top: 0; }
      .row {
        display: flex;
        gap: 8px;
        margin-bottom: 12px;
      }
      input, select, button {
        padding: 10px;
        font-size: 14px;
      }
      input { flex: 1; }
      button {
        width: 100%;
        border: none;
        background: #1746d3;
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
        color: #5d6480;
        font-size: 12px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>App 1: Calculator</h1>
      <div class="row">
        <input id="first" type="number" placeholder="First number" />
        <select id="op">
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </select>
        <input id="second" type="number" placeholder="Second number" />
      </div>
      <button id="calc">Calculate</button>
      <div id="result">Result: -</div>
      <div class="meta">version: ${packageJson.version}</div>
    </div>
    <script type="module" src="./app.js"></script>
  </body>
</html>`;

fs.writeFileSync(path.join(buildDir, 'index.html'), html);
console.log('Build completed for dummy-app-1 (Calculator TS Frontend)');