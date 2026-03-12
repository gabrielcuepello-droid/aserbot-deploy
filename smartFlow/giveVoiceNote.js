const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { handlerAI } = require("../utils/utils");
const notEmployee = require("./notEmployee");

/**
 * - Should be able to search for information in Pinecone
 * - Generate a standalone question using the conversation context
 * - That question -> search in Pinecone = database information
 * - Send the result back to GPT for a compact, friendly answer
 * - bot-ws-plugin: obtain the original input
 */

module.exports = addKeyword(EVENTS.VOICE_NOTE)
    .addAction((_, { endFlow, globalState }) => {
        const currentGlobalState = globalState.getMyState();
        if (!currentGlobalState.status) {
            return endFlow();
        }
    })
    .addAction(async (ctx, ctxFn) => {
        console.log(`[Flow Smart VoiceNote]`)
        const employeesAddon = ctxFn.extensions.employeesAddon
        await ctxFn.flowDynamic("Give me a moment while I process your voice note...");
        const text = await handlerAI(ctx);
        const currentState = ctxFn.state.getMyState();
        const fullSentence = `${currentState?.answer ?? ""}. ${text}`;
        const { employee, answer } = await employeesAddon.determine(fullSentence);
        ctxFn.state.update({ answer });
        if (employee) employeesAddon.gotoFlow(employee, ctxFn);
        if (!employee) ctxFn.gotoFlow(notEmployee);
    });
