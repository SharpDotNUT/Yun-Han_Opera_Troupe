
import { exec } from "child_process";
import fs from "fs";
import path from "path";

const __dirname = import.meta.dirname;

const WebResDistDir = "../dist";

// Copy web res dist file to '/dist/res'
fs.cpSync(
  path.join(__dirname, WebResDistDir),
  path.join(__dirname, "./dist/res"),
  { recursive: true }
)

// Build Server
const GoSource = path.join(__dirname, "Yunhan.go");
const outBinDir = path.join(__dirname, "dist");
const command = `go build -o ${outBinDir}/Yunhan.exe ${GoSource}`;
exec(command);

console.log(__dirname);
