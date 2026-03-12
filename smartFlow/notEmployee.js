const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

module.exports = addKeyword(EVENTS.ACTION)
    .addAction((_, { endFlow, state, globalState }) => {

        const currentGlobalState = globalState.getMyState();
        if (!currentGlobalState.status) {
            return endFlow();
        }
        const currentState = state.getMyState();
        const baned = currentState?.baned ?? false
        if (baned) return endFlow();
    })
    .addAction(async (ctx, { flowDynamic, extensions, state }) => {
        const chatwood = extensions.chatwood;
        const currentState = state.getMyState();
        state.update({ fallBack: currentState?.fallBack ?? 1 })
        const name = ctx?.pushName ?? ctx.ProfileName.split(" ").shift();
        if (currentState?.fallBack > 2) {
            const msg = `It looks like we are not understanding each other. Please try again in 40 minutes.`
            await chatwood.createMessage({
                msg: msg,
                mode: "outgoing",
                conversationId: currentState.conversation_id,
            });
            await flowDynamic(msg)
            state.update({ baned: true })
            return
        }

        const msg = [name, "Hmm, I am not fully sure...", "I am designed to help with Aser Bot features, setup, and sales questions. What would you like to know?"].join('\n')
        await chatwood.createMessage({
            msg: msg,
            mode: "outgoing",
            conversationId: currentState.conversation_id,
        });
        await flowDynamic()
    })
