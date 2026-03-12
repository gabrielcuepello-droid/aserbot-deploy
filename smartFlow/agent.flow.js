const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const {join} = require('path')

module.exports = addKeyword(EVENTS.ACTION)
    .addAction((_, { endFlow, globalState }) => {
        const currentGlobalState = globalState.getMyState();
        if (!currentGlobalState.status) {
            return endFlow();
        }
        console.log(`[Flow Smart Agente]`)
    })
    .addAnswer(
        ["Give me a moment while I check agent availability."],
        { delay: 2500 }
    )
    .addAnswer(
        ["I am still trying to reach an agent."],
        { delay: 1500 }
    )
    .addAction(async (_,{flowDynamic}) => {
        const path = join(process.cwd(),'audio','audio-1.mp3')
        await flowDynamic([{ body: "Listen to this", media: path }]);
    })
