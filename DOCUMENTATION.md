# Asert-Bot: WhatsApp Chatbot with AI

## Description

Asert-Bot is an AI-powered WhatsApp chatbot built for customer support and sales automation. It uses OpenAI models to generate contextual replies, supports custom conversation flows, and can be extended with external services such as Chatwoot, Stripe, MongoDB, and ElevenLabs.

**Made by: Jesus Cupello**

## Features

*   **OpenAI (GPT) Integration**: Uses the OpenAI API to generate intelligent and contextual responses.
*   **Pre-configured Demo Mode**: Includes a demo setup that works without an external database.
*   **Custom Agent Persona**: Supports configurable agent prompts and flow routing.
*   **Automatic Welcome Message**: Automatically initiates a conversation after the user scans the QR code and connects.
*   **Native WhatsApp Connection**: Integrates directly with WhatsApp via Baileys.

## Requirements

*   Node.js (version 18 or higher)
*   npm (included with Node.js)
*   An OpenAI API Key (`OPENAI_API_KEY`)

## Installation and Configuration

Follow these steps to get your Asert-Bot up and running:

1.  **Clone the Repository (or unzip the provided file)**:
    ```bash
    git clone <REPOSITORY_URL> # If it's a Git repository
    # Or simply unzip the provided ZIP file
    ```

2.  **Navigate to the Project Directory**:
    ```bash
    cd Asert-Bot-main
    ```

3.  **Install Dependencies**:
    ```bash
    npm install
    ```

4.  **Configure Environment Variables**:
    *   Create a `.env` file in the project root (if it doesn't exist) based on `.env.example`.
    *   Add your OpenAI API Key:
        ```
        OPENAI_API_KEY="your_openai_api_key"
        ```
    *   (Optional) If you want to use Chatwoot, configure `CHATWOOT_ID` and `CHATWOOT_URL` variables.

5.  **Start the Bot**:
    ```bash
    node app.js
    ```

6.  **Scan the QR Code**:
    *   Once the bot starts, you will see a message in the console indicating that you need to scan the QR code (`bot.qr.png`).
    *   Open WhatsApp on your phone, go to **Settings** > **Linked Devices** > **Link a Device**.
    *   Scan the QR code that will be generated in the console or in the `bot.qr.png` file.

7.  **Start the Conversation (Demo Mode)**:
    *   After scanning the QR, the bot will automatically send a welcome message.
    *   You can start interacting with the demo assistant right away.

## Common Troubleshooting

*   **`EADDRINUSE: address already in use :::3000`**: This means that port 3000 is already in use. The bot will attempt to use port 3001 by default. If you still have issues, you can change the port in `http.js`.
*   **QR not appearing**: Make sure there are no errors in the console preventing the bot from starting. Verify your `OPENAI_API_KEY`.
