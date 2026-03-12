const Queue = require("bull"); // Imports the Bull queue module

const processQueue = new Queue("message_process", "redis://redis:6380"); // Creates the processing queue

class QueueWS {
  constructor() {
    processQueue.process((job, done) => { // Processes queue jobs
    setTimeout(() => {
      const { data } = job; // Gets the job payload
      console.log(data); // Logs the payload
      done(); // Marks the job as completed
    }, 2000);
  });
}

  addProcess = async (data = {}) => {
    processQueue.add( // Adds a new queue job
      { data }, // Job payload
      {
        attempts: 1, // Retry count
      }
    );
  };

  onProcess = () => {}; // Process hook
}

module.exports = QueueWS; // Exports the QueueWS class
