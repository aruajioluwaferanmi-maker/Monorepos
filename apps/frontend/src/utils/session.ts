const SESSION_KEY = "app_session_id";

// Generate a unique session ID
const generateSessionId = (): string => {
  return (
    "sess_" +
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

// Get or create session ID
export const getSessionId = (): string => {
  try {
    let sessionId = sessionStorage.getItem(SESSION_KEY);
    if (!sessionId) {
      sessionId = generateSessionId();
      sessionStorage.setItem(SESSION_KEY, sessionId);
    }
    return sessionId;
  } catch {
    // If sessionStorage unavailable fallback to memory
    return generateSessionId();
  }
};

// Generate unique event ID
export const generateEventId = (): string => {
  return "evt_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
};
