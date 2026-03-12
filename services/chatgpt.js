const fs = require("fs"); // Imports the fs module for filesystem operations
const { Configuration, OpenAIApi } = require("openai"); // Imports the OpenAI configuration and client classes

/**
 * Sends a chat message to the language model.
 * @param {*} text - Text sent to the model
 */
const chat = async (text) => {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY, // Configures the OpenAI API key
    });
    const openai = new OpenAIApi(configuration); // Creates an OpenAI API client
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // Chat model used for conversational replies
      messages: [
        { role: "system", content: "You are a friendly sales assistant. Greet the customer and reply with short, charismatic messages." }, // System message
        { role: "user", content: text }, // User message
      ],
    });
    return completion.data.choices[0].message; // Returns the model response message
  } catch (err) {
    console.log(err.response.data); // Logs API error details
    return "ERROR"; // Returns "ERROR" if the request fails
  }
};

/**
 * Generates a completion response.
 * @param {*} dataIn - Input text
 * @returns - Model response
 */
const completion = async (dataIn = '') => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Configures the OpenAI API key
  });
  const openai = new OpenAIApi(configuration); // Creates an OpenAI API client
  const response = await openai.createCompletion({
    model: "text-davinci-003", // Completion model
    prompt: dataIn, // Input prompt
    max_tokens: 256, // Maximum number of tokens
    temperature: 0, // Deterministic output
  });

  return response; // Returns the model response
}

module.exports = { chat, completion }; // Exports the chat and completion functions
