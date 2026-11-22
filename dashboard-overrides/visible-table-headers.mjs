import { gunzipSync } from 'node:zlib';
import { execFileSync } from 'node:child_process';
import { writeFileSync, unlinkSync } from 'node:fs';
import path from 'node:path';
const projectDir = process.argv[2];
if (!projectDir) throw new Error('Project directory argument is required.');
const patchPath = path.resolve(projectDir, '.visible-table-headers.patch');
writeFileSync(patchPath, gunzipSync(Buffer.from('H4sIAAAAAAAC/5VQy07DMBC89ytWvZol6QMkJED5AMSFI+KwdtwmwrEt76KEfj1uo4pUBVR8We94PTM7iAhUcDKFCV0M3nrhgq2RNngunizV/DJ218LDTCkF+vLxqgJcr2+vVqDGUlUzhMm5F9LOgnHE/EydfZj3uPlwDsQOggOPlYWSgA6ptglNcI4i2/njKdWerMkGzuD9Q5pK6C3uWm/wpjxy6uPlgC/LctQ9dHd5bBO8YEYS6eBq6JtWLEcyFn3oE8XsRV20Vtd67LGjYRR4Xazi8Pb3kuqnJafULK15/wQJEUvYZffnn36NYFF+Z4DLkxRW/04BuKE69MhddvAFQGgeFFkCAAA=', 'base64')));
try { execFileSync('patch', ['-p1', '-i', patchPath], { cwd: projectDir, stdio: 'inherit' }); }
finally { unlinkSync(patchPath); }
