const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { delay } = require("../utils/utils");
const { textToVoice } = require("../services/eventlab");

module.exports = addKeyword(EVENTS.ACTION)
    .addAction((_, { endFlow, globalState }) => {
        const currentGlobalState = globalState.getMyState();
        if (!currentGlobalState.status) {
            return endFlow();
        }
    })
    .addAnswer(
        ["Give me a moment..."]
    )
    .addAction(async (_, {extensions, state, flowDynamic}) => {
        const chatwood = extensions.chatwood;
        const currentState = state.getMyState();

        if(!currentState?.answer){
            return
        }

        console.log(currentState.answer.length, 'send voice note')
        if(currentState.answer.length > 720 && !currentState?.voice_note){
            const msg =  ["Give me a moment... I will send a voice note instead."].join('\n')
            await flowDynamic(msg)
            const path = await textToVoice(currentState.answer);
            await flowDynamic([{ body: "Listen to this", media: path }]);
            if (chatwood && chatwood.createMessage) {
                await chatwood.createMessage({
                    msg: `*voice_note* ${currentState.answer}`,
                    mode: "outgoing",
                    conversationId: currentState.conversation_id,
                });
            }
            await state.update({voice_note:true})
            return
        }

        const fullText = currentState.answer.split(". ");

        for (const txt of fullText) {
            await flowDynamic(txt);
            console.log('>>',currentState.conversation_id)
            console.log('>>',txt)
            if (chatwood && chatwood.createMessage) {
                await chatwood.createMessage({
                    msg: txt,
                    mode: "outgoing",
                    conversationId: currentState.conversation_id,
                });
            }
            await delay(150);
        }

     
    })
  
