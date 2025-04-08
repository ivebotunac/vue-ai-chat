/**
 * Check if localStorage is available and initialize default structure if needed
 */
export default function checkLocalStorageAvailability() {
  try {
    // Test localStorage availability
    localStorage.setItem('__test', 'test')
    localStorage.removeItem('__test')
    
    // Initialize chats structure if it doesn't exist
    if (!localStorage.getItem('chats')) {
      localStorage.setItem('chats', JSON.stringify({
        text: {},
        image: {},
        audio: {},
      }))
    }
    
    // Initialize files storage if it doesn't exist
    if (!localStorage.getItem('localFiles')) {
      localStorage.setItem('localFiles', JSON.stringify({}))
    }
    
    return true
  } catch (e) {
    console.error('localStorage is not available:', e)
    return false
  }
} 