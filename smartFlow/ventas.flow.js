const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { textToVoice } = require("../services/eventlab");
const chatwootMiddleware = require("../middleware/chatwoot.middleware");

module.exports = addKeyword(['vendedor'])
    .addAction((_, { endFlow, globalState }) => {

        const currentGlobalState = globalState.getMyState();
        if (!currentGlobalState.status) {
            return endFlow();
        }

    })
    .addAction(chatwootMiddleware)
    .addAction(async (ctx, {extensions, state, flowDynamic}) => {
        const chatwood = extensions.chatwood;
        const currentState = state.getMyState();
        await state.update({ fallBack: currentState?.fallBack ?? 1 })
        const msg =  ["Give me a moment... I will send a voice note instead."].join('\n')
        await flowDynamic(msg)
        await chatwood.createMessage({
            msg: msg,
            mode: "outgoing",
            conversationId: currentState.conversation_id,
        });
    })
    .addAction(async (_, {extensions, state, flowDynamic}) => {
        console.log("Text to speech...");
        const chatwood = extensions.chatwood;
        const currentState = state.getMyState();
        const path = await textToVoice(currentState.answer);
        console.log(`Text to speech finished. [PATH]:${path}`);
        await flowDynamic([{ body: "Listen to this", media: path }]);
        await chatwood.createMessage({
            msg: `*voice_note* ${currentState.answer}`,
            mode: "outgoing",
            conversationId: currentState.conversation_id,
        });
    })
