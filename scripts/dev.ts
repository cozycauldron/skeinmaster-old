import * as child_process from "child_process";
import chalk from "chalk";

const PORT = 3306 as const;
const DB_CONTAINER = "mysql" as const;

const isDBRunning = (): boolean => {
  try {
    console.log("is db running?");
    const output = child_process
      .execSync(`docker ps -q --filter ancestor=${DB_CONTAINER}`)
      .toString()
      .trim();

    return !!output;
  } catch (e) {
    return false;
  }
};

const startLocalDatabase = async (): Promise<void> => {
  const isRunning = isDBRunning();
  if (isRunning) {
    cleanupDbContainer();
  }

  process.stdout.write(`🤖 Starting ${chalk.cyan(DB_CONTAINER)} locally.\n`);

  child_process
    .execSync(
      `docker run --name=${DB_CONTAINER} -d -e MYSQL_ROOT_PASSWORD=password -p ${PORT}:${PORT} ${DB_CONTAINER}`
    )
    .toString()
    .trim();

  process.stdout.write(
    `✅ Container ${chalk.cyan(DB_CONTAINER)} started on port ${chalk.yellow(
      PORT
    )}.\n`
  );
};

const startLocalServerless = () => {
  process.stdout.write(
    `🖥  Starting ${chalk.cyan("serverless")} in offline mode.\n`
  );

  child_process.execSync(`sls offline start`, { stdio: "inherit" });
};

const cleanupDbContainer = () => {
  process.stdout.write(
    `🧹 Cleaning up docker container: ${chalk.cyan(DB_CONTAINER)}\n`
  );

  child_process.execSync(`docker stop ${DB_CONTAINER}`, { stdio: "ignore" });
  child_process.execSync(`docker rm -f ${DB_CONTAINER}`, { stdio: "ignore" });
};

startLocalDatabase()
  .then(() => {
    process.on("SIGINT", () => cleanupDbContainer());

    let thrown = false;
    try {
      startLocalServerless();
    } catch {
      thrown = true;
    } finally {
      cleanupDbContainer();
      process.exit(thrown ? 1 : 0);
    }
  })
  .catch(() => {
    process.stderr.write(`🧨 Something went horribly wrong.\n`);
    process.exit(1);
  });
