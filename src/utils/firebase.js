import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
   apiKey: "AIzaSyD-BOHnowkD9mG65iLrPNTzTNaQKXw-14M",
  authDomain: "localhost-bf93a.firebaseapp.com",
  projectId: "localhost-bf93a",
  storageBucket: "localhost-bf93a.firebasestorage.app",
  messagingSenderId: "1075920183340",
  appId: "1:1075920183340:web:e360ecce28e34d92a07189",
  measurementId: "G-NHYC36FNT1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
export const messaging = getMessaging(app);

// Request permission and get FCM token
export const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: 'BIN1Ouj9Hhqzvh08iPH5i67RPRA1LOpotGlHr6hJj7QISbRlGxSFLazzvXI3VHmfIBaRU2Bu7PxbB7mRNCPKrV4' // Get this from Firebase Console
      });
      console.log('FCM Token:', token);
      return token;
    } else {
      console.log('Permission denied');
      return null;
    }
  } catch (error) {
    console.error('Error getting permission:', error);
    return null;
  }
};

// Listen for foreground messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('Received foreground message:', payload);
      resolve(payload);
    });
  });