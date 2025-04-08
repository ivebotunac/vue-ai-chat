import CONSTANTS from '@/CONSTANTS'
import { useMessageStore } from '@/stores'

// Local storage for files (base64 encoded)
const FILES_STORAGE_KEY = 'localFiles'

// Get all stored files
function getStoredFiles() {
  const storedFiles = localStorage.getItem(FILES_STORAGE_KEY)
  return storedFiles ? JSON.parse(storedFiles) : {}
}

// Save files object back to localStorage
function saveFiles(files) {
  localStorage.setItem(FILES_STORAGE_KEY, JSON.stringify(files))
}

export async function upload(payload = {}) {
  const { extension, file, mimeType, page } = payload
  
  try {
    console.log('Upload called with:', { extension, mimeType, page, fileLength: file ? file.length || 'blob' : 'none' })
    
    // Generate a unique filename
    const fileName = crypto.randomUUID() + '.' + extension
    console.log('Generated filename:', fileName)
    
    // Get existing files
    const files = getStoredFiles()
    
    if (page === CONSTANTS?.pages?.image) {
      // For image uploads (file is a blob)
      console.log('Handling image upload')
      // Convert blob to base64
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = (e) => reject(new Error('Failed to read image file: ' + e.message))
        reader.readAsDataURL(file)
      })
      
      // Save the file data
      files[fileName] = {
        data: base64,
        type: mimeType
      }
      
      console.log('Image file processed and ready to save')
    } else if (page === CONSTANTS?.pages?.audio) {
      // For audio uploads (file already comes as data URL/base64)
      console.log('Handling audio upload')
      
      // Validate that the file is a data URL
      if (!file || typeof file !== 'string' || !file.startsWith('data:')) {
        throw new Error('Audio file must be a data URL')
      }
      
      files[fileName] = {
        data: file, // file is already a data URL
        type: mimeType || 'audio/mp3' // Use provided MIME type or default
      }
      
      console.log('Audio file processed and ready to save')
    }
    
    // Save back to localStorage
    saveFiles(files)
    console.log('File saved to localStorage with key:', fileName)
    
    return fileName
  } catch (error) {
    console.error('Error in upload function:', error)
    useMessageStore().setError({ error: 'Failed to upload file: ' + error.message })
    // Return null to indicate failure
    return null
  }
}

export function fetchFile(payload) {
  const { fileName } = payload
  
  return new Promise((resolve, reject) => {
    try {
      console.log('Fetching file:', fileName)
      
      // Get all files
      const files = getStoredFiles()
      
      // Check if file exists
      if (files[fileName]) {
        console.log('File found, type:', files[fileName].type)
        resolve(files[fileName].data)
      } else {
        const errorMsg = `File doesn't exist: ${fileName}`
        console.error(errorMsg)
        useMessageStore().setError({ error: errorMsg })
        reject(new Error(errorMsg))
      }
    } catch (error) {
      const errorMsg = 'Error retrieving file: ' + error.message
      console.error(errorMsg)
      useMessageStore().setError({ error: errorMsg })
      reject(error)
    }
  })
} 