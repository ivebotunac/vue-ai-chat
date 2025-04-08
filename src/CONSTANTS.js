export default {
  defaultPage: 'text',
  pages: {
    text: 'text',
    image: 'image',
    audio: 'audio',
  },
  defaultModels: {
    text: 'gpt-3.5-turbo',
    image: 'dall-e-2',
    audio: 'tts-1',
  },
  image: {
    sizes: { 'dall-e-2': ['256x256', '512x512', '1024x1024'], 'dall-e-3': ['1024x1024', '1792x1024', '1024x1792 '] },
    defaultSizes: { 'dall-e-2': '256x256', 'dall-e-3': '1024x1024' },
  },
  audio: {
    voices: ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'],
    defaultVoice: 'alloy',
    formats: ['mp3', 'opus', 'aac', 'flac', 'wav', 'pcm'],
    defaultFormat: 'mp3',
    mimeMaps: {
      mp3: 'audio/mp3',
      opus: 'audio/ogg',
      aac: 'audio/aac',
      flac: 'audio/flac',
      wav: 'audio/wav',
      pcm: 'audio/L16',
    },
    speeds: [0.25, 1, 4],
    defaultSpeed: 1,
  },
  models: {
    text: [
      'gpt-3.5-turbo',
      'gpt-4',
      'gpt-4-turbo',
      'gpt-4o',
      'gpt-4o-mini',
    ],
    image: ['dall-e-2', 'dall-e-3'],
    audio: ['tts-1', 'tts-1-hd', 'gpt-4o-mini-tts'],
  },
}
