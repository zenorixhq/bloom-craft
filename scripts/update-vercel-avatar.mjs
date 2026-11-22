import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");

const authPath = path.join(process.env.APPDATA, "com.vercel.cli", "Data", "auth.json");
const auth = JSON.parse(fs.readFileSync(authPath, "utf-8"));

const projectPath = path.join(rootDir, ".vercel", "project.json");
const project = JSON.parse(fs.readFileSync(projectPath, "utf-8"));

console.log("Using token for user:", auth.cachedUser?.username);
console.log("Target Project:", project.projectName, `(${project.projectId})`);
console.log("Team ID:", project.orgId);

const imagePath = path.join(rootDir, "public", "bloom-craft-logo.png");
const imgBuf = fs.readFileSync(imagePath);

console.log(`Uploading ${imagePath} (${imgBuf.length} bytes) to Vercel API...`);

const url = `https://api.vercel.com/v1/projects/${project.projectId}/avatar?teamId=${project.orgId}`;

try {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${auth.token}`,
      "Content-Type": "image/png",
    },
    body: imgBuf,
  });

  const text = await res.text();
  console.log("Response status:", res.status);
  console.log("Response body:", text);

  if (res.ok) {
    console.log("🎉 SUCCESS: Bloom Craft logo project avatar uploaded to Vercel!");
  } else {
    console.log("Attempting fallback with form-data or v9 endpoint...");
  }
} catch (err) {
  console.error("Upload error:", err);
}
