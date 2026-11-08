import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync, mkdirSync, symlinkSync, realpathSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import ts from 'typescript';

/** Vite/tsx/esbuild --bundle resolve extensionless imports that native serverless ESM cannot. */
test('actual api/index entrypoint boots as unbundled native ESM and handles safe requests', () => {
  const root = process.cwd();
  const out = mkdtempSync(path.join(tmpdir(), 'abboud-serverless-'));
  const visited = new Set<string>();
  function emit(file: string) {
    if (visited.has(file)) return; visited.add(file);
    const source = readFileSync(file, 'utf8');
    const relative = path.relative(root, file).replace(/\.tsx?$/, '.js');
    const destination = path.join(out, relative);
    mkdirSync(path.dirname(destination), { recursive: true });
    writeFileSync(destination, ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText);
    for (const imported of ts.preProcessFile(source).importedFiles) {
      if (!imported.fileName.startsWith('.')) continue;
      const base = path.resolve(path.dirname(file), imported.fileName);
      const candidate = [base.replace(/\.js$/, '.ts'), `${base}.ts`, `${base}.tsx`, path.join(base, 'index.ts')].find(p => existsSync(p));
      assert.ok(candidate, `Unresolved local server dependency: ${imported.fileName}`);
      emit(candidate);
    }
  }
  try {
    emit(path.join(root, 'api/index.ts'));
    writeFileSync(path.join(out, 'package.json'), '{"type":"module"}');
    symlinkSync(realpathSync(path.join(root, 'node_modules')), path.join(out, 'node_modules'), 'dir');
    const env = { ...process.env };
    for (const name of Object.keys(env)) if (/API_KEY|TOKEN|SECRET|FIREBASE_SERVICE_ACCOUNT/.test(name)) delete env[name];
    const code = `
      import assert from 'node:assert/strict';
      const { default: app } = await import('./api/index.js');
      const server = app.listen(0, '127.0.0.1');
      await new Promise(resolve => server.once('listening', resolve));
      const url = 'http://127.0.0.1:' + server.address().port;
      try {
        const bad = await fetch(url+'/api/sara/abboud-teacher', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:1,stage:'explain',teacherSpeech:'',history:[]})});
        assert.equal(bad.status,400); assert.equal((await bad.json()).error,'INVALID_REQUEST');
        const unavailable = await fetch(url+'/api/sara/abboud-teacher', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:1,stage:'explain',teacherSpeech:'hello',history:[]})});
        assert.equal(unavailable.status,503); assert.equal((await unavailable.json()).error,'AI_UNAVAILABLE');
        assert.equal((await fetch(url+'/api/health')).status,200);
        const tts = await fetch(url+'/api/tts', {method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});
        assert.equal(tts.status,401);
      } finally { await new Promise(resolve=>server.close(resolve)); }
    `;
    const child = spawnSync(process.execPath, ['--input-type=module', '-e', code], { cwd: out, env, encoding: 'utf8', timeout: 30000 });
    assert.equal(child.status, 0, child.stderr || child.error?.message || 'Native ESM boot failed');
  } finally { rmSync(out, { recursive: true, force: true }); }
});
