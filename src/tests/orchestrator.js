import retry from "async-retry";

async function waitForServices() {
  await waitForAPI();

  async function waitForAPI() {
    await retry(checkAPI, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function checkAPI() {
      const response = await fetch("http://localhost:3000/api/v1/status");

      if (!response.ok) {
        throw new Error("API is not ready yet");
      }
    }
  }
}

export default { waitForServices };
