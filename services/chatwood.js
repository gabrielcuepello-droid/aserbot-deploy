// ChatWood service wrapper
class ChatWood {
  token = ""; // Authentication token
  config = { accounts: 1 }; // Default configuration with one account
  api = ``; // Base API URL

  // Class constructor
  constructor(_token = "", _api = "", _config = {}) {
    this.token = _token; // Stores the authentication token
    this.api = _api; // Stores the API URL
    this.config = { ...this.config, ..._config }; // Merges the provided configuration
  }

  // Builds the request headers
  buildHeader = () => {
    const header = new Headers(); // Creates the headers object
    header.append("api_access_token", this.token); // Adds the API token
    header.append("Content-Type", "application/json"); // Sends JSON payloads
    return header; // Returns the headers object
  };

  // Gets inboxes
  getInbox = async () => {
    const requestOptions = {
      method: "GET",
      headers: this.buildHeader(), // Uses the shared headers
    };

    const dataAPI = await fetch(
      `${this.api}/api/v1/accounts/${this.config.accounts}/inboxes`,
      requestOptions
    );
    const data = await dataAPI.json(); // Parses the JSON response
    return data.payload; // Returns the inbox payload
  };

  // Finds a contact by phone number
  searchByNumber = async (phone) => {
    const requestOptions = {
      method: "GET",
      headers: this.buildHeader(), // Uses the shared headers
    };

    const dataAPI = await fetch(
      `${this.api}/api/v1/accounts/${this.config.accounts}/contacts/search?include_contact_inboxes=false&page=1&sort=-last_activity_at&q=${phone}`,
      requestOptions
    );
    const data = await dataAPI.json(); // Parses the JSON response
    console.log(data.payload); // Logs the contact payload
    return data.payload; // Returns the contact payload
  };

  // Creates an inbox
  createInbox = async (dataIn) => {
    const payload = {
      name: "BOTWS",
      channel: {
        type: "api",
        webhook_url: "",
      },
    };
    const raw = JSON.stringify({ ...payload, ...dataIn });

    const requestOptions = {
      method: "POST",
      headers: this.buildHeader(), // Uses the shared headers
      body: raw, // Sends the request body
    };

    const dataAPI = await fetch(
      `${this.api}/api/v1/accounts/${this.config.accounts}/inboxes`,
      requestOptions
    );
    const data = await dataAPI.json(); // Parses the JSON response
    return data; // Returns the API response
  };

  // Creates a contact
  createContact = async (dataIn) => {
    const payload = {
      phone_number: dataIn.phone_number,
      custom_attributes: { phone_number: dataIn.phone_number },
    };
    const raw = JSON.stringify({ ...payload, ...dataIn });

    const requestOptions = {
      method: "POST",
      headers: this.buildHeader(), // Uses the shared headers
      body: raw, // Sends the request body
    };

    const dataAPI = await fetch(
      `${this.api}/api/v1/accounts/${this.config.accounts}/contacts`,
      requestOptions
    );
    const data = await dataAPI.json(); // Parses the JSON response
    return data; // Returns the API response
  };

  // Gets conversations
  getConversations = async () => {
    const requestOptions = {
      method: "GET",
      headers: this.buildHeader(), // Uses the shared headers
    };

    const dataAPI = await fetch(
      `${this.api}/api/v1/accounts/${this.config.accounts}/inboxes`,
      requestOptions
    );
    const data = await dataAPI.json(); // Parses the JSON response
    return data.payload; // Returns the conversations payload
  };
  /**
   * Creates a conversation.
   * @param dataIn
   * @returns
   */
  createConversation = async (dataIn) => {
    const payload = {
      custom_attributes: { phone_number: dataIn.phone_number },
    };
    const raw = JSON.stringify({ ...dataIn, ...payload });

    const requestOptions = {
      method: "POST",
      headers: this.buildHeader(),
      body: raw,
    };

    const dataAPI = await fetch(
      `${this.api}/api/v1/accounts/${this.config.accounts}/conversations`,
      requestOptions
    );
    const data = await dataAPI.json();
    return data;
  };
  /**
   * Filters conversations by payload.
   * @param dataIn
   * @returns
   */
  filterConversation = async (dataIn) => {
    const payload = [
      {
        attribute_key: "phone_number",
        attribute_model: "standard",
        filter_operator: "equal_to",
        values: [dataIn.phone_number],
        custom_attribute_type: "",
      },
    ];
    const raw = JSON.stringify({payload});

    const requestOptions = {
      method: "POST",
      headers: this.buildHeader(),
      body: raw,
    };

    const dataAPI = await fetch(
      `${this.api}/api/v1/accounts/${this.config.accounts}/conversations/filter`,
      requestOptions
    );
    const data = await dataAPI.json();
    return data;
  };

  /**
   * Creates a message in a conversation.
   * @param dataIn
   * @returns
   */
  createMessage = async (dataIn) => {

    const raw = JSON.stringify({
      content: dataIn.msg,
      message_type: dataIn.mode,
      private: true,
    });

    const requestOptions = {
      method: "POST",
      headers: this.buildHeader(),
      body: raw,
    };

    const dataAPI = await fetch(
      `${this.api}/api/v1/accounts/${this.config.accounts}/conversations/${dataIn.conversationId}/messages`,
      requestOptions
    );
    const data = await dataAPI.json();
    return data;
  };
}

module.exports = ChatWood
