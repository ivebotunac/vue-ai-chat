import { initializeLocalStorage } from './localStorage'

// No need for firebase initialization anymore
export const registerServices = () => {
  // Initialize localStorage
  initializeLocalStorage()
}
