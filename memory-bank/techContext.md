# Technical Context

## Technology Stack

Vue AI Chat is built with the following core technologies:

| Category | Technologies |
|----------|-------------|
| **Framework** | Vue 3 (Composition API), Vuetify 3 |
| **State Management** | Pinia |
| **Routing** | Vue Router with auto-routing via vite-plugin-pages |
| **Build Tools** | Vite, SASS |
| **API Client** | OpenAI JavaScript SDK |
| **Storage** | Browser LocalStorage |
| **Internationalization** | Vue-i18n |
| **Styling** | SCSS, Vuetify Components |
| **Icons** | Material Design Icons |
| **Testing** | Vitest, JSDOM |

## Development Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn
- OpenAI API key

### Environment Variables
The application requires the following environment variables:

```
VITE_OPENAI_API_KEY=your_openai_api_key
```

These are stored in a `.env` file in the project root.

### Development Workflow
1. Clone the repository
2. Install dependencies (`yarn install` or `npm install`)
3. Set up environment variables
4. Start development server (`yarn dev` or `npm run dev`)
5. Access the application at http://localhost:5017

### Build Process
1. Run build command (`yarn build` or `npm run build`)
2. Output is generated in the `dist` directory
3. Deploy the contents of `dist` to a web server

## Technical Constraints

1. **Browser Compatibility**: The application targets modern browsers with support for ES6+ features.

2. **API Rate Limits**: OpenAI API has rate limits that need to be considered, especially for image and audio generation.

3. **Storage Limitations**: Local storage has a size limit (typically 5MB per domain), which impacts the amount of chat history and generated content that can be stored.

4. **Client-Side Only**: The application is entirely client-side, with no server-side processing, which limits certain capabilities.

5. **API Key Security**: The OpenAI API key is stored in the environment and exposed to the client, which is not ideal for production use.

## Dependencies

### Core Dependencies
- **vue**: The core Vue.js framework
- **vuetify**: UI component library
- **pinia**: State management
- **vue-router**: Routing
- **openai**: Official OpenAI JavaScript SDK
- **vue-i18n**: Internationalization

### Development Dependencies
- **vite**: Build tool and development server
- **vitest**: Test framework
- **sass**: CSS preprocessor
- **eslint**: Code linting
- **vite-plugin-pages**: File-based routing
- **vite-plugin-vue-layouts**: Layout system for Vue Router

## Tool Usage Patterns

### Vite
- Used for fast development server with hot module replacement
- Configured with plugins for Vue, Vuetify, and auto-routing
- Optimizes the build for production

### Pinia
- Stores are modular and feature-focused
- State is kept in reactive objects
- Actions are used for API calls and complex state mutations
- Getters provide computed state values

### Vue Router
- Auto-routing generates routes from the file structure
- Layouts are applied through a plugin system
- Navigation guards can be used for authentication

### Vuetify
- Provides the design system and UI components
- Used for responsive layouts and consistent styling
- Theme customization is available through SCSS variables

### OpenAI SDK
- Direct integration with text, image, and audio generation APIs
- API key is required for all requests
- Error handling is implemented for API limits and errors

## Browser APIs

The application utilizes the following browser APIs:

1. **LocalStorage API**: For persistent storage of chat history and settings
2. **Fetch API**: For additional network requests not handled by the OpenAI SDK
3. **Audio API**: For playing generated audio content
4. **URL and Blob APIs**: For handling and downloading generated images
5. **Crypto API**: For generating unique identifiers (UUIDs)

## Potential Technical Debt

1. **Client-Side API Key**: The OpenAI API key is exposed to the client, which is a security concern for production applications.

2. **LocalStorage Limitations**: As chat history grows, it may exceed local storage limits, requiring a different storage solution.

3. **Error Handling**: Some error conditions may not be fully handled, particularly network failures and API limits.

4. **Testing Coverage**: The application may benefit from more comprehensive testing.

5. **Accessibility**: Additional work may be needed to ensure full accessibility compliance. 