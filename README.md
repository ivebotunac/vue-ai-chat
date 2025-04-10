# Vue AI Chat

A modern Vue.js application that integrates with OpenAI APIs to provide text, image, and audio generation capabilities.

## Features

- **Text Generation**: Chat with OpenAI models (GPT-3.5, GPT-4, GPT-4o, etc.)
- **Image Generation**: Create images using DALL-E 2 and DALL-E 3
- **Audio Generation**: Generate spoken audio using OpenAI's TTS models
- **Multi-language Support**: Built-in i18n internationalization
- **Modern UI**: Built with Vuetify 3 components
- **Chat History**: Local storage of conversations

## Technology Stack

- **Frontend**: Vue 3, Vuetify 3
- **State Management**: Pinia
- **Routing**: Vue Router with auto-routing
- **Build Tool**: Vite
- **API**: OpenAI API

## Project Structure

```
vue-ai-chat/
├── public/              # Static assets
├── src/                 # Source files
│   ├── components/      # UI components
│   │   ├── layout/      # Layout components
│   │   ├── messages/    # Message-specific components
│   │   └── utils/       # Utility components
│   ├── layouts/         # Page layouts
│   ├── locales/         # Translation files
│   ├── pages/           # Application pages/views
│   │   ├── text.vue     # Text chat page
│   │   ├── image.vue    # Image generation page
│   │   ├── audio.vue    # Audio generation page
│   │   └── index.vue    # Home page
│   ├── plugins/         # Vue plugins
│   ├── router/          # Routing configuration
│   ├── services/        # External services
│   │   ├── firebase/    # Firebase integration
│   │   ├── localStorage/ # Local storage service
│   │   └── openaiService.js # OpenAI API integration
│   ├── stores/          # Pinia stores for state management
│   │   ├── chat.js      # Chat state management
│   │   └── message.js   # Message state management
│   ├── styles/          # Global styles
│   ├── utils/           # Utility functions
│   ├── App.vue          # Main application component
│   ├── CONSTANTS.js     # Application constants
│   └── main.js          # Application entry point
├── .env                 # Environment variables
├── package.json         # Dependencies and scripts
├── vite.config.mjs      # Vite configuration
└── README.md            # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/vue-ai-chat.git
cd vue-ai-chat
```

2. Install dependencies
```
yarn install
# or
npm install
```

3. Set up your environment variables
Create or modify the `.env` file in the root directory:
```
VITE_OPENAI_API_KEY=your_openai_api_key
```

4. Start the development server
```
yarn dev
# or
npm run dev
```

5. Open your browser and navigate to `http://localhost:5017`

## Building for Production

```
yarn build
# or
npm run build
```

## License

This project is licensed under the MIT License.
