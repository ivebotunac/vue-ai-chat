export async function fetchChats() {
  const storedChats = localStorage.getItem('chats')
  if (storedChats) {
    return JSON.parse(storedChats)
  } else {
    return {}
  }
}

export async function createTitle(payload) {
  const { createdAt, id, messages, page, title } = payload
  
  // Get existing chats
  const storedChats = localStorage.getItem('chats') || '{}'
  const chats = JSON.parse(storedChats)
  
  // Initialize page object if it doesn't exist
  if (!chats[page]) {
    chats[page] = {}
  }
  
  // Add new chat
  chats[page][id] = {
    createdAt,
    id,
    messages,
    title,
    updatedAt: createdAt,
  }
  
  // Save back to localStorage
  localStorage.setItem('chats', JSON.stringify(chats))
}

export async function addMessage(payload) {
  const { messages, id, page, updatedAt } = payload
  
  // Get existing chats
  const storedChats = localStorage.getItem('chats') || '{}'
  const chats = JSON.parse(storedChats)
  
  // Ensure page and chat exist
  if (!chats[page]) chats[page] = {}
  if (!chats[page][id]) chats[page][id] = { messages: [] }
  
  // Update messages
  chats[page][id].messages = [...messages]
  
  // Update timestamp if provided
  if (updatedAt) chats[page][id].updatedAt = updatedAt
  
  // Save back to localStorage
  localStorage.setItem('chats', JSON.stringify(chats))
}

export async function setMessageDetails(payload) {
  const { id, page, title, createdAt, updatedAt } = payload
  
  // Get existing chats
  const storedChats = localStorage.getItem('chats') || '{}'
  const chats = JSON.parse(storedChats)
  
  // Ensure page and chat exist
  if (!chats[page]) chats[page] = {}
  if (!chats[page][id]) chats[page][id] = {}
  
  // Update details
  if (title) chats[page][id].title = title
  if (createdAt) chats[page][id].createdAt = createdAt
  if (updatedAt) chats[page][id].updatedAt = updatedAt
  
  // Save back to localStorage
  localStorage.setItem('chats', JSON.stringify(chats))
} 