# AI Chat App

A simple app that allows users to interact with OpenAI's GPT-3 AI. Users can submit prompts, and the AI's responses are displayed in a chat-like interface.

## Features
- User can input a prompt and receive AI-generated responses.
- Displays a conversation history between the user and the AI.
- Clear conversation history option.
- Responsive design with Tailwind CSS.

## Setup

### Requirements
- Node.js and npm
- React App (Create React App)
- OpenAI API Key

### Steps to Run Locally

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd ai-chat-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```env
   REACT_APP_OPENAI_API_KEY=your-api-key-here
   ```

4. Run the app:
   ```bash
   npm start
   ```

5. Visit [http://localhost:3000](http://localhost:3000) to interact with the app.

How to Set Up the OpenAI API Key:
To run the app locally, you will need a valid OpenAI API key. If you don’t have one:

1. Sign up for OpenAI at OpenAI API.

2. Generate a new API key from the OpenAI dashboard.

3. Add the key to your .env file as shown in the setup instructions above.

Notes:
API Key Security: Be sure to keep your API key safe and never expose it in a public repository. Use GitHub Secrets for production environments or CI/CD workflows to securely manage your API keys.