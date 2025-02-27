import axios from "axios";

const BASE_URL = "https://fundoonotes.incubation.bridgelabz.com/api/user";
const NOTES_URL = "https://fundoonotes.incubation.bridgelabz.com/api/notes";

// Function to get authentication token from localStorage
const getAuthToken = () => {
  const token = localStorage.getItem("fundoo-token");
  if (!token) {
    console.error("⚠️ Authentication token is missing!");
    return null;
  }
  return token;
};

// User login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });

    if (response.data) {
      localStorage.setItem("fundoo-token", response.data.id); // Save token
      localStorage.setItem("userEmail", email); // Save email in localStorage
    }

    return response.data;
  } catch (error) {
    console.error("❌ Login failed:", error.response?.data?.message || error.message);
    throw error.response?.data?.message || "Login failed";
  }
};

// User registration
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/userSignUp`, userData);
    return response.data;
  } catch (error) {
    console.error("❌ Registration failed:", error.response?.data?.message || error.message);
    throw error.response?.data?.message || "Registration failed";
  }
};

// Fetch user notes
export const getUserNotes = async () => {
  try {
    const token = getAuthToken();
    if (!token) return { data: [] }; // Prevent crash if token is missing

    const response = await axios.get(`${NOTES_URL}/getNotesList`, {
      headers: { Authorization: token },
    });

    console.log("✅ Fetched notes:", response.data);
    return response.data || { data: [] };
  } catch (error) {
    console.error("❌ Error fetching notes:", error.response?.data?.message || error.message);
    return { data: [] }; // Prevents app crash
  }
};

// Add a new note
export const addNote = async (noteData) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Missing authentication token!");

    const response = await axios.post(`${NOTES_URL}/addNotes`, noteData, {
      headers: { Authorization: token },
    });

    console.log("✅ Note added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Failed to add note:", error.response?.data?.message || error.message);
    throw error.response?.data?.message || "Failed to add note";
  }
};

// Archive a note
export const archiveNote = async (noteId) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Missing authentication token!");

    const payload = { noteIdList: [noteId], isArchived: true };
    
    const response = await axios.post(`${NOTES_URL}/archiveNotes`, payload, {
      headers: { Authorization: token },
    });

    console.log("✅ Note archived successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Failed to archive note:", error.response?.data?.message || error.message);
    throw error.response?.data?.message || "Failed to archive note";
  }
};

// Fetch archived notes
export const getArchivedNotes = async () => {
  try {
    const token = getAuthToken();
    if (!token) return { data: [] };

    const response = await axios.get(`${NOTES_URL}/getArchiveNotesList`, {
      headers: { Authorization: token },
    });

    console.log("✅ Fetched archived notes:", response.data);
    return response.data || { data: [] };
  } catch (error) {
    console.error("❌ Failed to fetch archived notes:", error.response?.data?.message || error.message);
    return { data: [] }; // Prevents app crash
  }
};
