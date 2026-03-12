# Asert-Bot: WhatsApp Chatbot con IA

## Descripción

Asert-Bot es un chatbot de WhatsApp impulsado por inteligencia artificial, diseñado para ofrecer asistencia experta en ventas y soporte. Este bot está configurado para simular un agente llamado "Jesus", especializado en el curso de creación de chatbots de WhatsApp, con el objetivo de responder preguntas técnicas, resolver dudas e incitar a la compra del curso de manera efectiva. Utiliza modelos de OpenAI (GPT) para mantener conversaciones dinámicas y personalizadas.

**Hecho por: Jesus Cupello**

## Características

*   **Integración con OpenAI (GPT)**: Utiliza la API de OpenAI para generar respuestas inteligentes y contextuales.
*   **Modo Demo Preconfigurado**: Incluye un modo de demostración que carga un agente "Jesus" sin necesidad de una base de datos externa.
*   **Personalidad de Agente**: "Jesus" es un experto en ventas del curso de chatbots, con respuestas breves y orientadas a la conversión.
*   **Mensaje de Bienvenida Automático**: Inicia una conversación automáticamente después de que el usuario escanea el código QR y se conecta.
*   **Conexión Nativa con WhatsApp**: Se integra directamente con WhatsApp a través de Baileys.

## Requisitos

*   Node.js (versión 18 o superior)
*   npm (incluido con Node.js)
*   Una clave de API de OpenAI (`OPENAI_API_KEY`)

## Instalación y Configuración

Sigue estos pasos para poner en marcha tu Asert-Bot:

1.  **Clonar el Repositorio (o descomprimir el ZIP)**:
    ```bash
    git clone <URL_DEL_REPOSITORIO> # Si es un repositorio Git
    # O simplemente descomprime el archivo ZIP proporcionado
    ```

2.  **Navegar al Directorio del Proyecto**:
    ```bash
    cd Asert-Bot-main
    ```

3.  **Instalar Dependencias**:
    ```bash
    npm install
    ```

4.  **Configurar Variables de Entorno**:
    *   Crea un archivo `.env` en la raíz del proyecto (si no existe) basado en `.env.example`.
    *   Añade tu clave de API de OpenAI:
        ```
        OPENAI_API_KEY="tu_clave_de_api_de_openai"
        ```
    *   (Opcional) Si deseas usar Chatwoot, configura las variables `CHATWOOT_ID` y `CHATWOOT_URL`.

5.  **Iniciar el Bot**:
    ```bash
    node app.js
    ```

6.  **Escanear el Código QR**:
    *   Una vez que el bot se inicie, verás un mensaje en la consola indicando que debes escanear el código QR (`bot.qr.png`).
    *   Abre WhatsApp en tu teléfono, ve a **Configuración** > **Dispositivos vinculados** > **Vincular un dispositivo**.
    *   Escanea el código QR que se generará en la consola o en el archivo `bot.qr.png`.

7.  **Iniciar la Conversación (Modo Demo)**:
    *   Después de escanear el QR, el bot enviará automáticamente un mensaje de bienvenida para iniciar la conversación con "Jesus".
    *   Puedes empezar a interactuar con él preguntándole sobre el curso de chatbots.

## Solución de Problemas Comunes

*   **`EADDRINUSE: address already in use :::3000`**: Esto significa que el puerto 3000 ya está en uso. El bot intentará usar el puerto 3001 por defecto. Si aún tienes problemas, puedes cambiar el puerto en `http.js`.
*   **El QR no aparece**: Asegúrate de que no haya errores en la consola que impidan el inicio del bot. Verifica tu `OPENAI_API_KEY`.

---

# Asert-Bot: WhatsApp Chatbot with AI

## Description

Asert-Bot is an AI-powered WhatsApp chatbot designed to provide expert sales and support assistance. This bot is configured to simulate an agent named "Jesus," specialized in the WhatsApp chatbot creation course, with the goal of answering technical questions, resolving doubts, and effectively encouraging course purchases. It uses OpenAI (GPT) models to maintain dynamic and personalized conversations.

**Made by: Jesus Cupello**

## Features

*   **OpenAI (GPT) Integration**: Uses the OpenAI API to generate intelligent and contextual responses.
*   **Pre-configured Demo Mode**: Includes a demo mode that loads a "Jesus" agent without the need for an external database.
*   **Agent Persona**: "Jesus" is a sales expert for the chatbot course, providing brief, concise, and conversion-oriented answers.
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
    *   After scanning the QR, the bot will automatically send a welcome message to start the conversation with "Jesus."
    *   You can start interacting with him by asking about the chatbot course.

## Common Troubleshooting

*   **`EADDRINUSE: address already in use :::3000`**: This means that port 3000 is already in use. The bot will attempt to use port 3001 by default. If you still have issues, you can change the port in `http.js`.
*   **QR not appearing**: Make sure there are no errors in the console preventing the bot from starting. Verify your `OPENAI_API_KEY`.
