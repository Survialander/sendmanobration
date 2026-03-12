const { exec } = require("node:child_process");

function waitForPostgres() {
  const command = `docker exec sendmanobration-database pg_isready -h localhost`;

  exec(command, handleCallBack);

  function handleCallBack(_, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      waitForPostgres();
      return;
    }

    console.log("\n 🟩 Postgres pronto para receber conexões");
  }
}

process.stdout.write("\n 🟥 Aguardando Postgres");
waitForPostgres();
