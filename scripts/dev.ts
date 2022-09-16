import * as child_process from "child_process";

const main = async function () {
  const PORT = 3306;
  process.stdout.write("\n🤖 Starting MySQL locally.");

  const containerId = child_process
    .execSync(
      `docker run -d -e MYSQL_ROOT_PASSWORD=password -p ${PORT}:${PORT} mysql:latest`
    )
    .toString()
    .trim();

  console.log("\ncontainer id", containerId);
  process.stdout.write(`\n✅ MySQL started on port ${PORT}.`);
  process.stdout.write("\n🖥  Starting serverless offline.\n");

  let thrown = false;
  try {
    child_process.execSync(`sls offline start`, { stdio: "inherit" });
  } catch {
    thrown = true;
  } finally {
    process.stdout.write(
      `\n🧹  Cleaning up docker container '${containerId}'\n`
    );

    process.exit(thrown ? 1 : 0);
  }
};

main().catch(() => {
  process.stderr.write(`\n🧨 Something went horribly wrong.\n`);
  process.exit(1);
});
