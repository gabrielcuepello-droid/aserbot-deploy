// Import the FFmpeg binary path
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

// Import FFmpeg
const ffmpeg = require('fluent-ffmpeg');

// Configure the FFmpeg binary path
ffmpeg.setFfmpegPath(ffmpegPath);

// Converts OGG audio into MP3
const convertOggMp3 = async (inputStream, outStream) => {

  // Return a promise so callers can await the conversion
  return new Promise((resolve, reject) => {

    // Run the conversion with FFmpeg
    ffmpeg(inputStream)
      .audioBitrate(96)
      .format('mp3')
      .save(outStream)

      // Handle progress and completion
      .on('progress', () => {})
      .on('end', () => {
        resolve(true);
      })
      .on('error', (error) => {
        reject(error);
      });

  });

};

module.exports = { convertOggMp3 };
