/**
 * Asert-Bot: WhatsApp Chatbot with AI
 * Made by: Jesus Cupello
 * 
 * This bot uses OpenAI GPT models to provide expert sales and support
 * assistance, specifically tailored for the WhatsApp Chatbot course.
 */

require("dotenv").config();
const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");

const ServerAPI = require("./http.js");

const { adapterDB } = require("./provider/database");
const { employees } = require("./provider/agents");
const { employeesAddon } = require("./provider/agents/config");

const giveVoiceNote = require("./smartFlow/giveVoiceNote");
const welcome = require("./smartFlow/welcome");
const bye = require("./smartFlow/bye");
const givePdf = require("./smartFlow/givePdf");
const giveMedia = require("./smartFlow/giveMedia");
const turnOff = require("./smartFlow/turnOff");
const turnOn = require("./smartFlow/turnOn");
const thankyou = require("./smartFlow/thankyou");
const fallBackEmail = require("./smartFlow/fallBackEmail");
const notEmployee = require("./smartFlow/notEmployee");
const ventasFlow = require("./smartFlow/ventas.flow");
const expertFlow = require("./smartFlow/expert.flow");
const linkPayFlow = require("./smartFlow/linkPay.flow");
const greetingFlow = require("./smartFlow/greeting.flow");
const agentFlow = require("./smartFlow/agent.flow");
const ChatWood = require("./services/chatwood");

const main = async () => {
  await adapterDB.init();
  const chatwood = (process.env.CHATWOOT_ID && process.env.CHATWOOT_URL) 
    ? new ChatWood(process.env.CHATWOOT_ID, process.env.CHATWOOT_URL, { accounts: 1 })
    : { createMessage: () => {} }; // Mock si no hay configuración
  const adapterProvider = createProvider(BaileysProvider);

  // Event to log when the bot is ready and credit the creator
  adapterProvider.on("ready", () => {
    console.log("-----------------------------------------");
    console.log("READY - Bot is connected and ready to chat!");
    console.log("Hecho por: Jesus Cupello");
    console.log("-----------------------------------------");
  });

  // Event to send a welcome message to the user who scanned the QR
  adapterProvider.on("auth_success", async (data) => {
    console.log("Authentication successful! Sending welcome message...");
    const jid = data.jid; // Get the JID of the authenticated user
    await adapterProvider.sendMessage(jid, "¡Hola! Soy Jesus, tu experto en el curso de chatbots de WhatsApp. ¿En qué puedo ayudarte hoy?", {});
  });

  const httpServer = new ServerAPI(adapterProvider, adapterDB);

  const flowsAgents = [
    ventasFlow,
    expertFlow,
    linkPayFlow,
    greetingFlow,
    agentFlow,
  ];

  const flows = [
    welcome,
    giveVoiceNote,
    bye,
    givePdf,
    giveMedia,
    turnOff,
    turnOn,
    thankyou,
    fallBackEmail,
    notEmployee,
  ];

  employeesAddon.employees(await employees(flowsAgents, adapterDB));

  const adapterFlow = createFlow([...flowsAgents, ...flows]);

  createBot(
    {
      flow: adapterFlow,
      provider: adapterProvider,
      database: adapterDB,
    },
    {
      globalState: {
        status: true,
        inbox_id: 11, //id inbox Jesus-Ventas
      },
      extensions: {
        employeesAddon,
        database: adapterDB,
        chatwood,
      },
    }
  );

  httpServer.start();
};

main();
