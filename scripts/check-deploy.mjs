import fs from 'fs';
import path from 'path';

async function main() {
  const authPath = path.join(process.env.APPDATA, 'com.vercel.cli', 'Data', 'auth.json');
  const auth = JSON.parse(fs.readFileSync(authPath, 'utf8'));
  const res = await fetch('https://api.vercel.com/v6/deployments?projectId=prj_cfcG0QO5yxNdPvn29MpHDc7pnHI8&teamId=team_A9gJpfUY9ofLsWTsaIPxmjtz&limit=3', {
    headers: { Authorization: 'Bearer ' + auth.token }
  });
  const data = await res.json();
  console.log(data.deployments.map(d => ({
    id: d.uid,
    url: d.url,
    state: d.state,
    readyState: d.readyState,
    commit: d.meta?.githubCommitMessage,
    createdAt: new Date(d.createdAt).toISOString()
  })));
}

main().catch(console.error);
