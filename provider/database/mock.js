class MockAdapter {
  constructor() {
    this.db = {};
    this.listHistory = [];
  }

  init = async () => {
    console.log("Mock connection ready (demo mode)");
    return true;
  };

  getAgents = async () => {
    // Returns the demo agent configured for local runs
    return [
      {
        name: "SALES_ASSISTANT",
        description: "I am a sales and support assistant for Aser Bot. I answer with short, clear, helpful messages about features, onboarding, and integrations.",
        flows: "1", // Maps to expertFlow in app.js
        prompt: `I am a sales and support assistant for Aser Bot. My replies are short, clear, and practical. {context}:Aser Bot helps businesses automate WhatsApp conversations, answer customer questions, support sales workflows, and connect with tools such as OpenAI, Chatwoot, Stripe, and common databases.`
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
