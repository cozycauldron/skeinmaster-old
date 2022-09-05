import { MongoMemoryServer } from "mongodb-memory-server";
import * as child_process from "child_process";

const main = async function () {
  process.stdout.write("\n🤖 Starting MongoDB local.");
  const mongod = await MongoMemoryServer.create({
    auth: {
      customRootName: "admin_user",
      customRootPwd: "password123",
    },
    spawn: { stdio: "inherit" },
    instance: { port: 27017, auth: true, dbName: "skeinmaster" },
  });

  const uri = mongod.getUri();
  process.stdout.write(`\n✅ Mongo (local) started at ${uri}.`);
};

main()
  .then(() => {
    process.stdout.write("\n🖥  Starting serverless offline.\n");
    child_process.execSync(`sls offline start`, { stdio: "inherit" });
  })
  .catch(() => {
    process.stderr.write(`\n🧨 Something went horribly wrong.\n`);
    process.exit(1);
  });
