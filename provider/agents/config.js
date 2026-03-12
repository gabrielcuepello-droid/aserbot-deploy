const { init } = require("bot-ws-plugin-openai");

const employeesAddonConfig = {
  model: "gpt-4", // OpenAI model used by the employee addon
  temperature: 0, // Deterministic output
  apiKey: process.env.OPENAI_API_KEY, // Reads the API key from the environment
};
const employeesAddon = init(employeesAddonConfig); // Initializes the employee addon

module.exports = { employeesAddon, employeesAddonConfig }; // Exports the addon and its configuration
