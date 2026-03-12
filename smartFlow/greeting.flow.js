const { addKeyword } = require("@bot-whatsapp/bot");
const chatwootMiddleware = require("../middleware/chatwoot.middleware");

module.exports = addKeyword(['hola', 'hi'])
    .addAction((_, { endFlow, globalState }) => {
        const currentGlobalState = globalState.getMyState();
        console.log({currentGlobalState})
        if (!currentGlobalState.status) {
            return endFlow();
        }
    })
    .addAction(chatwootMiddleware)
    .addAction(async (_, { flowDynamic, state, extensions }) => {
        const chatwood = extensions.chatwood;
        const currentState = state.getMyState();
        state.update({ answer: "" });
        const msg = `Hello, I am here to help with product questions, setup, and sales. How can I help you?`
        await chatwood.createMessage({
            msg: msg,
            mode: "outgoing",
            conversationId: currentState.conversation_id,
        });
        await flowDynamic(msg);
    });
