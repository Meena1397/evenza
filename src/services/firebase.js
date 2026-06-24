// Firebase initialization and service fallback layer
import { sampleEvents } from '../data/sampleEvents';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

let db = null;
let auth = null;
let isMock = true;

// Attempt Firebase Connection
try {
  if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    // Only import dynamically or if firebase package is fully installed
    // If not config, we automatically use Mock fallbacks
    const { initializeApp } = require('firebase/app');
    const { getFirestore } = require('firebase/firestore');
    const { getAuth } = require('firebase/auth');
    
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    isMock = false;
    console.log("Firebase initialized successfully.");
  }
} catch (err) {
  console.warn("Firebase config not loaded or package not ready. Falling back to stateful Mock database.", err);
}

// In-Memory Database Fallback State for offline operations
let mockEventsState = [...sampleEvents];
let mockUserState = null; // simulate logged in user

export const getEventsData = async () => {
  if (!isMock && db) {
    // Real Firestore implementation
    try {
      const { collection, getDocs } = await import('firebase/firestore');
      const querySnapshot = await getDocs(collection(db, 'events'));
      const events = [];
      querySnapshot.forEach((doc) => {
        events.push({ id: doc.id, ...doc.data() });
      });
      return events.length > 0 ? events : mockEventsState;
    } catch (e) {
      console.error("Firestore getEvents error, using mock data", e);
      return mockEventsState;
    }
  }
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockEventsState]), 200);
  });
};

export const registerForEventMock = async (eventId, userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      mockEventsState = mockEventsState.map(evt => {
        if (evt.id === eventId) {
          if (evt.seatsAvailable <= 0) {
            reject(new Error("No seats remaining!"));
            return evt;
          }
          return {
            ...evt,
            registrations: evt.registrations + 1,
            seatsAvailable: evt.seatsAvailable - 1,
            status: evt.seatsAvailable - 1 === 0 ? 'closed' : evt.seatsAvailable - 1 <= 10 ? 'closing_soon' : evt.status
          };
        }
        return evt;
      });
      resolve({ success: true, updatedEvents: [...mockEventsState] });
    }, 300);
  });
};

export const addEventMock = async (eventData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEvent = {
        ...eventData,
        id: `evt-${Date.now()}`,
        registrations: 0,
        createdAt: new Date().toISOString(),
        status: 'open'
      };
      mockEventsState = [newEvent, ...mockEventsState];
      resolve({ success: true, newEvent, updatedEvents: [...mockEventsState] });
    }, 300);
  });
};

export const mockLogin = async (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockUserState = {
        uid: 'user-123',
        email: email,
        displayName: email.split('@')[0],
        emailVerified: true
      };
      resolve(mockUserState);
    }, 200);
  });
};

export const mockLogout = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockUserState = null;
      resolve(true);
    }, 100);
  });
};

export { db, auth, isMock };
