import fs from "fs";
import path from "path";

const authPath = path.join(process.env.APPDATA, "com.vercel.cli", "Data", "auth.json");
const auth = JSON.parse(fs.readFileSync(authPath, "utf-8"));
const token = auth.token;
const teamId = "team_A9gJpfUY9ofLsWTsaIPxmjtz";
const projectId = "prj_cfcG0QO5yxNdPvn29MpHDc7pnHI8";

async function main() {
  // 1. Check existing env vars in project
  const envRes = await fetch(`https://api.vercel.com/v9/projects/${projectId}/env?teamId=${teamId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const envData = await envRes.json();
  console.log("Current Project Env Vars:", envData.envs?.map((e) => e.key));

  // 2. Check stores in the team
  // Endpoint: /v1/storage/stores
  const storesRes = await fetch(`https://api.vercel.com/v1/storage/stores?teamId=${teamId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (storesRes.ok) {
    const storesData = await storesRes.json();
    console.log("Existing Storage Stores in Team:", JSON.stringify(storesData, null, 2));
  } else {
    console.log("Storage stores query response:", storesRes.status, await storesRes.text());
  }
}

main().catch(console.error);
