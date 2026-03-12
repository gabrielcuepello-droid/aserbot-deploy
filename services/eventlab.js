// Import the fs module
const fs = require('node:fs');

/**
 * Converts text to speech using the ElevenLabs API.
 * @param {string} text - Text to convert into speech
 * @param {string} voiceId - Optional voice id
 * @returns The generated audio file path
 */
const textToVoice = async (text, voiceId = 'vwfl76D5KBjKuSGfTbLB') => {
  const EVENT_TOKEN = process.env.EVENT_TOKEN ?? ""; // Reads the API token from the environment
  const URL = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`; // API endpoint

  const header = new Headers(); // Builds request headers
  header.append("accept", "audio/mpeg"); // Accept audio responses
  header.append("xi-api-key", EVENT_TOKEN); // Add the API token
  header.append("Content-Type", "application/json"); // Send JSON payload

  const raw = JSON.stringify({ // Request payload
    text,
    model_id: "eleven_multilingual_v1",
    voice_settings: {
      stability: 1,
      similarity_boost: 0.8,
    },
  });

  const requestOptions = { // Request options
    method: "POST",
    headers: header,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(URL, requestOptions); // Sends the API request
  const buffer = await response.arrayBuffer(); // Reads the response as a buffer
  const pathFile = `${process.cwd()}/tmp/${Date.now()}-auido.mp3`; // Output audio path

  fs.writeFileSync(pathFile, Buffer.from(buffer)); // Writes the audio file

  return pathFile; // Returns the audio file path
};

module.exports = { textToVoice }; // Exports the textToVoice function
