import CONSTANTS from '@/CONSTANTS'
import OpenAI from 'openai'
import { upload } from '@/services/localStorage'

const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true })

// Define functions to interact with the OpenAI API
export async function getChatCompletion(payload) {
  const { content, format, page, speed, voice } = payload
  let { model, size } = payload

  try {
    if (page === CONSTANTS.pages.text) {
      if (!model) model = CONSTANTS.defaultModels.text

      const response = await openai.chat.completions.create({
        model,
        messages: [{ role: 'user', content }],
      })

      return response.choices[0].message.content
    } else if (page === CONSTANTS.pages.image) {
      if (!model) model = CONSTANTS.defaultModels.image
      if (!size) size = CONSTANTS.image.defaultSizes[model]

      const response = await openai.images.generate({
        model,
        prompt: content,
        response_format: 'b64_json',
        size,
      })

      const b64_json_data = response?.data?.[0]?.b64_json
      const url = 'data:image/png;base64,' + b64_json_data

      return generateImage(url, CONSTANTS.pages.image)
    } else if (page === CONSTANTS.pages.audio) {
      if (!model) model = CONSTANTS.defaultModels.audio

      console.log('TTS Request:', {
        input: content,
        model,
        voice: voice || CONSTANTS.audio.defaultVoice,
        response_format: format || CONSTANTS.audio.defaultFormat,
        speed: Number(speed) || CONSTANTS.audio.defaultSpeed,
      })

      // Get the speech data from OpenAI
      const speechResponse = await openai.audio.speech.create({
        input: content,
        model,
        voice: voice || CONSTANTS.audio.defaultVoice,
        response_format: format || CONSTANTS.audio.defaultFormat,
        speed: Number(speed) || CONSTANTS.audio.defaultSpeed,
      })

      // Ensure we received a valid response
      if (!speechResponse) {
        throw new Error('No response received from OpenAI speech API')
      }

      console.log('Speech response received:', speechResponse)

      // Convert the response to an ArrayBuffer
      const arrayBuffer = await speechResponse.arrayBuffer()
      if (!arrayBuffer || arrayBuffer.byteLength === 0) {
        throw new Error('Received empty audio data from OpenAI')
      }

      console.log('Array buffer size:', arrayBuffer.byteLength)

      // Convert the ArrayBuffer to Base64
      const base64String = arrayBufferToBase64(arrayBuffer)
      const audioFormat = format || CONSTANTS.audio.defaultFormat
      const mimeType = CONSTANTS?.audio?.mimeMaps?.[audioFormat] || 'audio/mp3'
      
      const base64Audio = `data:${mimeType};base64,${base64String}`

      console.log('Base64 audio created, length:', base64Audio.length)

      // Test playing the audio directly to verify it's valid
      try {
        const testAudio = new Audio(base64Audio)
        testAudio.volume = 0 // Mute it
        await testAudio.play() // Test if it plays
        testAudio.pause() // Stop it right away
        console.log('Audio data is valid and playable')
      } catch (audioError) {
        console.error('Audio preview test failed:', audioError)
        // Continue anyway as this is just a test
      }

      // Upload the audio data
      const fileName = await upload({
        extension: audioFormat,
        file: base64Audio,
        mimeType,
        page,
      })

      if (!fileName) {
        throw new Error('Failed to upload audio file to storage')
      }

      console.log('Audio file uploaded with name:', fileName)
      return fileName
    }
  } catch (error) {
    console.error(`Error in getChatCompletion for ${page}:`, error)
    throw error
  }
}

async function generateImage(url, page) {
  let fileName

  try {
    // Fetch the data URL and convert it to a Blob
    const response = await fetch(url)
    const blob = await response.blob()

    // Create a link element
    const a = document.createElement('a')
    // Create an object URL from the Blob
    const objectURL = URL.createObjectURL(blob)
    // Set the download attribute with a filename
    a.href = objectURL
    a.download = 'image.png'
    // Append the link to the body (required for Firefox)
    document.body.appendChild(a)
    // Trigger a click on the link to start the download
    a.click()
    // Remove the link from the document
    document.body.removeChild(a)
    // Revoke the object URL to free up memory
    URL.revokeObjectURL(objectURL)

    fileName = await upload({ extension: 'png', file: blob, mimeType: 'image/png', page })
  } catch (error) {
    console.error('Error downloading the image:', error)
  }

  return fileName
}

// Utility function to convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer) {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength

  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }

  return window.btoa(binary)
}
