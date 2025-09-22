const fs = require("fs");
const crypto = require("crypto");

process.env.UV_THREADPOOL_SIZE = 8;

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("1 - cryptoPBKDF2 done");
});
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("2 - cryptoPBKDF2  done");
});
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("3 - cryptoPBKDF2  done");
});
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("4 - cryptoPBKDF2  done");
});

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("5 - cryptoPBKDF2  done");
});

fs.readFile("./file.txt", "utf8", () => {
  console.log("File Reading CB");
});






// is crypto task executes in poll phase?
// ChatGPT said:
// Excellent question ⚡ you’re thinking in the right direction. Let’s nail this down.

// 🔎 Where crypto tasks run?
// The actual PBKDF2 computation → runs outside the event loop, in a worker thread from libuv’s threadpool.

// But Node.js still needs to give you the callback (console.log("done")).

// That callback is not executed by the worker thread directly.
// Instead, when the worker thread finishes:

// It queues the result back into libuv.

// Libuv delivers that result in the poll phase of the event loop.

// Event loop executes your callback on the main thread.

// So:

// ✔ Crypto work itself → threadpool (parallel, background).
// ✔ Callback (your log) → runs in the poll phase.

// ⚡ Compare with fs.readFile
// fs.readFile also uses the threadpool.

// When the thread finishes disk I/O, its callback also runs in the poll phase.

// So both crypto and fs callbacks “come back” during the poll phase.
// The only difference: PBKDF2 is CPU-heavy, readFile is I/O-heavy → file is faster.

// 🌀 Event loop timeline with your code
// Top-level → schedules 5 crypto + 1 fs into threadpool.

// Threadpool starts working.

// Event loop keeps spinning.

// When any thread finishes:

// Result is queued.

// On next poll phase, Node executes that callback.

// ✅ Answer in one line:
// Yes — the crypto.pbkdf2 callback executes in the poll phase, but the heavy computation itself is done in libuv’s background threadpool, not in the main event loop.