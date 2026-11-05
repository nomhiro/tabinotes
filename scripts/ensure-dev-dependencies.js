import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import process from 'node:process';

const viteExecutable = resolve(
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'vite.cmd' : 'vite',
);

if (!existsSync(viteExecutable)) {
  console.log('Local Vite is missing; restoring dependencies from package-lock.json...');
  const result = spawnSync(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['ci', '--include=dev'],
    {
      cwd: process.cwd(),
      shell: process.platform === 'win32',
      stdio: 'inherit',
    },
  );

  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
