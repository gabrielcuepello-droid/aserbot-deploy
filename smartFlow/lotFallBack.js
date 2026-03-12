const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

module.exports = addKeyword(EVENTS.ACTION)
    .addAction((_, { endFlow, state, globalState }) => {
        const currentGlobalState = globalState.getMyState();
        const currentState = state.getMyState();
        const baned = currentState?.baned ?? false
        if (baned) return endFlow();

        if (!currentGlobalState.status) {
            return endFlow();
        }
    })
    .addAnswer(["Hmm, I am not fully sure...", "I am designed to help with Aser Bot features, setup, and sales questions. What would you like to know?"],
        null, async (_, { state, flowDynamic }) => {
            const currentState = state.getMyState();
            state.update({ fallBack: currentState?.fallBack ?? 1 })

            if (currentState?.fallBack > 2) {
                await flowDynamic(`It looks like we are not understanding each other. Please try again in 40 minutes.`)
                state.update({ baned: true })
            }
        });
