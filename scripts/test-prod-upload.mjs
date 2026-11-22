import fs from "fs";

async function main() {
  const fileBuf = fs.readFileSync("public/bloom-craft-logo.png");
  const blob = new Blob([fileBuf], { type: "image/png" });
  
  const form = new FormData();
  form.append("folder", "images");
  form.append("file", blob, "test-probe.png");

  console.log("Sending test upload to https://www.bloomcraft.co.in/api/upload...");
  const res = await fetch("https://www.bloomcraft.co.in/api/upload", {
    method: "POST",
    body: form,
  });

  console.log("HTTP Status:", res.status);
  const data = await res.json();
  console.log("Response JSON:", data);
}

main().catch(console.error);
