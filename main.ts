const fs = require('fs');
const path = require('path');

const LINE = 'Dear Boss, I resign effective today: the office plant has been dead for months, and honestly, so has my enthusiasm.';

const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const outFile = path.join(outDir, 'entry.txt');

const len = [...LINE].length;
if (len < 1 || len > 140) throw new Error('line length out of range: ' + len);
if (LINE.trim().length === 0) throw new Error('line is whitespace-only');
if (LINE !== LINE.trim()) throw new Error('line has leading/trailing whitespace');
if (/[\r\n]/.test(LINE)) throw new Error('line contains newline');

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, LINE, 'utf8');

const back = fs.readFileSync(outFile, 'utf8');
if (back !== LINE) throw new Error('round-trip mismatch');
