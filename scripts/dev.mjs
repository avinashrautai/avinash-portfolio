import { spawn } from "node:child_process";

const args = process.argv.slice(2);
let port = process.env.PORT || "3000";
for (let i = 0; i < args.length; i += 1) {
  if (args[i] === "--port" && args[i + 1]) port = args[i + 1];
  else if (args[i].startsWith("--port=")) port = args[i].slice("--port=".length);
}

const next = spawn(process.execPath, ["node_modules/next/dist/bin/next", "dev", "--hostname", "0.0.0.0", "--port", port], { stdio: "inherit", env: process.env });
next.on("exit", (code) => process.exit(code ?? 1));
process.on("SIGINT", () => next.kill("SIGINT"));
process.on("SIGTERM", () => next.kill("SIGTERM"));
