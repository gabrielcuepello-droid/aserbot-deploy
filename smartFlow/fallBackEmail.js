const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

module.exports = addKeyword(EVENTS.ACTION).addAnswer([
    `🤦‍♂️`,
    'Let us start over. How can I help you?',
    'I am here to help with product, setup, and sales questions.'])
