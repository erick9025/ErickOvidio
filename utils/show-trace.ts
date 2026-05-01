import { exec } from 'child_process';
import { globSync } from 'glob';

// Get the TC ID from command line arguments
const tc = process.argv[2];

if (!tc) {
  console.error('Please provide a TC ID, e.g. TC-0001');
  process.exit(1);
}

// Use forward slashes for glob (cross-platform)
const matches = globSync(`test-results/*${tc}*/trace.zip`);

if (matches.length === 0) {
  console.error(`Trace file not found for ${tc}`);
  process.exit(1);
}

// Take the first match
const tracePath = matches[0];

// Command to open the trace in Playwright
const cmd = `npx playwright show-trace "${tracePath}"`;

console.log(`Opening trace for ${tc}...`);
exec(cmd, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) console.error(stderr);
  console.log(stdout);
});
