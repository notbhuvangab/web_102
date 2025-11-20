// Authentication system: user_id, password, display_name stored in localStorage
const USERS_STORAGE_KEY = 'forum_users'
const SESSION_STORAGE_KEY = 'forum_session'

export interface User {
  userId: string
  password: string // Stored in plain text for simplicity (in production, hash passwords)
  displayName: string
  createdAt: string
}

export interface Session {
  userId: string
  displayName: string
}

// Get all users from localStorage
function getAllUsers(): User[] {
  try {
    const data = localStorage.getItem(USERS_STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

// Save users to localStorage
function saveUsers(users: User[]): void {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
  } catch {
    // Silently fail if localStorage not available
  }
}

// Get current session (returns null if not logged in)
export function getSession(): Session | null {
  try {
    const data = sessionStorage.getItem(SESSION_STORAGE_KEY)
    if (data) {
      return JSON.parse(data)
    }
  } catch {
    // Silently fail
  }
  return null
}

// Set current session
function setSession(session: Session | null): void {
  try {
    if (session) {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
    } else {
      sessionStorage.removeItem(SESSION_STORAGE_KEY)
    }
  } catch {
    // Silently fail if sessionStorage not available
  }
}

// Sign up: Create a new user
export function signUp(userId: string, password: string, displayName: string): { success: boolean; error?: string; session?: Session } {
  // Validate inputs
  if (!userId.trim()) {
    return { success: false, error: 'User ID is required' }
  }
  if (!password.trim()) {
    return { success: false, error: 'Password is required' }
  }
  if (!displayName.trim()) {
    return { success: false, error: 'Display name is required' }
  }

  // Normalize user ID (lowercase, trim)
  const normalizedUserId = userId.trim().toLowerCase()

  // Check if user already exists
  const users = getAllUsers()
  if (users.some(u => u.userId.toLowerCase() === normalizedUserId)) {
    return { success: false, error: 'User ID already exists' }
  }

  // Create new user
  const newUser: User = {
    userId: normalizedUserId,
    password: password.trim(), // In production, hash this
    displayName: displayName.trim(),
    createdAt: new Date().toISOString(),
  }

  // Save user
  users.push(newUser)
  saveUsers(users)

  // Create and set session
  const session: Session = {
    userId: normalizedUserId,
    displayName: displayName.trim(),
  }
  setSession(session)

  return { success: true, session }
}

// Login: Verify credentials and create session
export function login(userId: string, password: string): { success: boolean; error?: string; session?: Session } {
  // Validate inputs
  if (!userId.trim()) {
    return { success: false, error: 'User ID is required' }
  }
  if (!password.trim()) {
    return { success: false, error: 'Password is required' }
  }

  // Normalize user ID
  const normalizedUserId = userId.trim().toLowerCase()

  // Find user
  const users = getAllUsers()
  const user = users.find(u => u.userId.toLowerCase() === normalizedUserId)

  if (!user) {
    return { success: false, error: 'Invalid user ID or password' }
  }

  // Verify password (in production, compare hashed passwords)
  if (user.password !== password.trim()) {
    return { success: false, error: 'Invalid user ID or password' }
  }

  // Create and set session
  const session: Session = {
    userId: normalizedUserId,
    displayName: user.displayName,
  }
  setSession(session)

  return { success: true, session }
}

// Logout: Clear session
export function logout(): void {
  setSession(null)
}

// Update display name for current user
export function updateDisplayName(newDisplayName: string): { success: boolean; error?: string } {
  const session = getSession()
  if (!session) {
    return { success: false, error: 'Not logged in' }
  }

  if (!newDisplayName.trim()) {
    return { success: false, error: 'Display name cannot be empty' }
  }

  // Update user in storage
  const users = getAllUsers()
  const userIndex = users.findIndex(u => u.userId === session.userId)
  if (userIndex === -1) {
    return { success: false, error: 'User not found' }
  }

  users[userIndex].displayName = newDisplayName.trim()
  saveUsers(users)

  // Update session
  const updatedSession: Session = {
    userId: session.userId,
    displayName: newDisplayName.trim(),
  }
  setSession(updatedSession)

  return { success: true }
}

// Get user by ID (for compatibility with existing code)
export function getUserById(id: string): { id: string; displayName: string } | undefined {
  const users = getAllUsers()
  const user = users.find(u => u.userId.toLowerCase() === id.toLowerCase())
  if (user) {
    return {
      id: user.userId,
      displayName: user.displayName,
    }
  }
  return undefined
}

// Get user display name by ID
export function getUserDisplayName(userId: string): string | null {
  const user = getUserById(userId)
  return user ? user.displayName : null
}

// Get user by ID from storage (alias for compatibility)
export function getUserByIdFromStorage(id: string): { id: string; displayName: string } | undefined {
  return getUserById(id)
}

// Legacy functions for backward compatibility (deprecated, use signUp/login instead)
export function createUser(email: string, password: string, displayName: string): { success: boolean; error?: string; userId?: string } {
  // Treat email as userId for backward compatibility
  const result = signUp(email, password, displayName)
  return {
    success: result.success,
    error: result.error,
    userId: result.session?.userId,
  }
}

export function loginUser(email: string, password: string): { success: boolean; error?: string; user?: any } {
  // Treat email as userId for backward compatibility
  const result = login(email, password)
  return {
    success: result.success,
    error: result.error,
    user: result.session ? {
      id: result.session.userId,
      displayName: result.session.displayName,
    } : undefined,
  }
}

export function logoutUser(): void {
  logout()
}
