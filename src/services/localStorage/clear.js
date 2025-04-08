/**
 * Clear all data from localStorage
 * This includes chats, files, and any other data stored by the application
 */
export function clearAllLocalStorage() {
  try {
    // Clear chats
    localStorage.setItem('chats', JSON.stringify({
      text: {},
      image: {},
      audio: {},
    }))
    
    // Clear files
    localStorage.setItem('localFiles', JSON.stringify({}))
    
    console.log('All localStorage data has been cleared')
    return true
  } catch (error) {
    console.error('Error clearing localStorage:', error)
    return false
  }
} 