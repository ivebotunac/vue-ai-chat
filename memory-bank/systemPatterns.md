# System Patterns

## Architecture Overview

Vue AI Chat follows a modern frontend architecture pattern based on Vue 3's Composition API, with clear separation of concerns:

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│                 │     │              │     │                 │
│  Views/Pages    │━━━━▶│  Components  │━━━━▶│    Services     │
│                 │     │              │     │                 │
└────────┬────────┘     └──────┬───────┘     └────────┬────────┘
         │                     │                      │
         ▼                     ▼                      ▼
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│                 │     │              │     │                 │
│  Pinia Stores   │◀━━━━│  Composables │◀━━━━│   OpenAI API    │
│                 │     │              │     │                 │
└─────────────────┘     └──────────────┘     └─────────────────┘
```

## Key Technical Decisions

1. **Vue 3 with Composition API**: The application leverages Vue 3's Composition API for improved code organization, reusability, and TypeScript integration.

2. **Pinia for State Management**: Pinia provides a lightweight and type-safe state management solution, offering better developer experience than Vuex.

3. **Local Storage for Persistence**: User conversations and generated content are stored in the browser's local storage for simplicity and offline access.

4. **Service-Based API Integration**: API calls are encapsulated in service modules, separating the concerns of data fetching from UI components.

5. **Auto-Routing with Dynamic Layouts**: The application uses vue-router with auto-routing and layout management for improved developer experience.

## Design Patterns

1. **Store Pattern**: Each feature domain has its own Pinia store (`chat.js`, `message.js`, `main.js`) to manage state and actions.

2. **Service Pattern**: External API communication is encapsulated in service modules (`openaiService.js`, `localStorage`).

3. **Page Container Pattern**: A consistent page container component wraps each view, providing common layout elements.

4. **Type-Driven Development**: TypeScript types are used to define and validate data structures throughout the application.

5. **Composable Pattern**: Reusable functionality is extracted into composable functions using Vue's Composition API.

## Component Relationships

```
┌─────────────────────┐
│    App.vue          │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Router/Layouts     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐      ┌───────────────────┐
│   Page Views        │─────▶│  Page Container   │
│ (text, image, audio)│      └─────────┬─────────┘
└─────────────────────┘                │
                                      ▼
                      ┌───────────────────────────┐
                      │      UI Components        │
                      │   (messages, utils, etc)  │
                      └───────────────────────────┘
```

## Critical Implementation Paths

1. **Chat Flow**:
   ```
   User Input → chat.js addMessage → openaiService.getChatCompletion → API Call → Update Store → Render Response
   ```

2. **Image Generation Flow**:
   ```
   User Prompt → chat.js addMessage → openaiService.getChatCompletion → DALL-E API → generateImage → upload → Render Image
   ```

3. **Audio Generation Flow**:
   ```
   User Text → chat.js addMessage → openaiService.getChatCompletion → TTS API → arrayBufferToBase64 → upload → Create Audio Player
   ```

4. **Storage Flow**:
   ```
   Chat/Content Creation → Store Update → localStorage Service → Browser Storage
   ```

## Security Considerations

1. **API Key Protection**: The OpenAI API key is stored in environment variables (.env file) and not exposed in client-side code.

2. **Input Validation**: User inputs should be validated before being sent to external APIs.

3. **Cross-Site Scripting (XSS) Prevention**: Generated content is properly sanitized before rendering in the UI.

4. **Error Handling**: Proper error handling and logging are implemented to prevent information leakage.

## Performance Optimizations

1. **Lazy Loading**: Non-critical components and routes can be lazy-loaded to improve initial load time.

2. **Efficient Rendering**: Vue's reactivity system is leveraged with proper use of computed properties and watchers.

3. **Caching**: Responses and generated content are cached to reduce API calls and improve performance.

4. **Pagination**: Large data sets (like chat history) should be paginated to improve rendering performance. 