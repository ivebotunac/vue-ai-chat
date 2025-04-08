<template>
  <div>
    <audio
      v-if="audio"
      class="d-block mt-3"
      :src="audio"
      controls
      @error="handleAudioError"
      ref="audioElement"
    ></audio>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-if="!audio && !error" class="loading-message">
      Loading audio...
    </div>
  </div>
</template>

<script setup>
import { fetchFile } from '@/services/localStorage'
import { ref, onMounted } from 'vue'

const props = defineProps({
  fileName: String,
})

const audio = ref(null)
const error = ref(null)
const audioElement = ref(null)

const handleAudioError = (e) => {
  console.error('Audio playback error:', e)
  error.value = `Error playing audio: ${e.target.error?.message || 'Unknown error'}`
}

onMounted(async () => {
  if (!props.fileName) {
    error.value = 'No audio file specified'
    return
  }
  
  try {
    console.log('Fetching audio file:', props.fileName)
    const audioData = await fetchFile({ fileName: props.fileName })
    
    if (!audioData) {
      throw new Error('Could not retrieve audio data')
    }
    
    console.log('Audio data retrieved, length:', audioData.length)
    
    // Test if the data is valid
    if (!audioData.startsWith('data:')) {
      throw new Error('Invalid audio data format')
    }
    
    audio.value = audioData
    
    // Add a small delay to let the audio element initialize
    setTimeout(() => {
      if (audioElement.value) {
        console.log('Audio element initialized with src length:', audioElement.value.src.length)
      }
    }, 500)
  } catch (err) {
    console.error('Error fetching audio:', err)
    error.value = `Failed to load audio: ${err.message}`
  }
})
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}

.loading-message {
  color: gray;
  margin-top: 10px;
}
</style>
