class MockAdapter {
  constructor() {
    this.db = {};
    this.listHistory = [];
  }

  init = async () => {
    console.log("🆗 Conexión Mock (Modo Demo)");
    return true;
  };

  getAgents = async () => {
    // Retorna el agente Jesus configurado en DEMO_PROMPT.md
    return [
      {
        name: "EMPLEADO_EXPERTO_CURSO",
        description: "Soy JEsus el staff experto en explicar más a detalles tecnicos del contenido, sobre el curso del chatbot de whatsapp, mis respuestas son breves, no mayores de 3 lineas e incitando a comprar el curso.",
        flows: "1", // Mapea a expertFlow en app.js
        prompt: `Soy JEsus el staff experto en explicar más a detalles tecnicos del contenido, sobre el curso del chatbot de whatsapp, mis respuestas son breves, no mayores de 3 lineas e incitando a comprar el curso. {contexto}:En este curso aprenderas a crear un chatbot de whatsapp para tu negocio o para aumentar tus ventas online, el curso incluye +20 clases donde se explica paso a paso como crear tu chatbot de whatsapp utilizando las ultimas tecnologias, openai, chatgpt, eventlab, node entre otras. El curso esta diseñado para personas que tengan un minimo de experiencia trabajando con lenguajes de programacion como javaScript ya que todo el desarrollo se basa en este lenguajes tambien aprenderas a como enviar mensajes atravez de api, y conectar con base de datos como mongo, mysql, firebase y tambien puedes aprender a crear tu propio conecto de base de datos. Se enseña a utilizar diferentes proveedores tanto grauitos como (Bayles) o Oficiales como Meta.`
      }
    ];
  };

  save = async (ctx) => {
    this.listHistory.push(ctx);
  };

  getPrevByNumber = async (from) => {
    return this.listHistory.find(h => h.from === from);
  };

  clearHistory = async (from) => {
    this.listHistory = this.listHistory.filter(h => h.from !== from);
  };
  
  findIntent = async (phone) => null;
  createIntent = async (ctx) => {};
  updateIntent = async (phone, status) => {};
  sentimentCustomer = async (phone, sentiment) => {};
}

module.exports = MockAdapter;
