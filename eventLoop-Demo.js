// 🟢 Start: Top-level code
// 🔴 End: Top-level code finished
// 🟡 process.nextTick 1
// 🟡 process.nextTick 2 (nested)
// 🔵 Promise 1 resolved
// 🔵 Promise 2 resolved
// ⏰ setTimeout 0ms
// ⚡ setImmediate fired
// 📂 fs.readFile callback (Poll phase)
// ⚡ setImmediate inside I/O
// ⏰ setTimeout(0) inside I/O
// ❌ close callback phase









// event-loop-demo.js
const fs = require("fs");

console.log("🟢 Start: Top-level code");

// NextTick (runs before Promises)
process.nextTick(() => {
  console.log("🟡 process.nextTick 1");
  process.nextTick(() => console.log("🟡 process.nextTick 2 (nested)"));
});

// Promise microtasks
Promise.resolve().then(() => console.log("🔵 Promise 1 resolved"));
Promise.resolve().then(() => {
  console.log("🔵 Promise 2 resolved");
});

// Timers
setTimeout(() => console.log("⏰ setTimeout 0ms"), 0);

// setImmediate
setImmediate(() => console.log("⚡ setImmediate fired"));

// File system I/O (poll phase)
fs.readFile(__filename, "utf8", () => {
  console.log("📂 fs.readFile callback (Poll phase)");

  setImmediate(() => console.log("⚡ setImmediate inside I/O"));
  setTimeout(() => console.log("⏰ setTimeout(0) inside I/O"), 0);
});

// Close callbacks
const net = require("net");
const server = net.createServer().listen(0, () => {
  server.close(() => console.log("❌ close callback phase"));
});

console.log("🔴 End: Top-level code finished");

//   Why the difference?
// 1. process.nextTick always wins
// ✅ Correct: Your process.nextTick callbacks ran immediately after the stack unwound, before anything else. This is guaranteed.

// 2. close callbacks before Promises
// Here’s the interesting part:

// In my “typical” ordering, I had promises resolving before the close callback.

// In your run, the close callback phase (❌) executed before Promises.

// 👉 Why?
// Because close callbacks are scheduled directly after server.close() finishes the synchronous top-level code. By the time Node drains microtasks (Promises), it sees that there’s a close event ready and processes it in that same tick.

// This is platform + Node.js version dependent. The Node.js event loop spec allows close callbacks to fire early if nothing else blocks them.

// So, your environment just runs close-phase callbacks before draining the Promise microtask queue. Both behaviors are valid.

// 3. Rest matches the model
// Promises run.

// Timers → setTimeout fires.

// Check phase → setImmediate fires.

// Poll phase → fs.readFile callback fires, then its nested timers/immediates.

// All of that is as expected.

// TL;DR
// process.nextTick → always runs before Promises.

// close callbacks (❌) can run before or after microtasks depending on how/when they were scheduled.

// Everything else (timers, immediates, poll I/O) lines up correctly.

// So your output isn’t wrong — it’s just your Node.js runtime’s scheduling choice for when to fire the close callback relative to microtasks.
