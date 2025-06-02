// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
   apiKey: "AIzaSyD-BOHnowkD9mG65iLrPNTzTNaQKXw-14M",
  authDomain: "localhost-bf93a.firebaseapp.com",
  projectId: "localhost-bf93a",
  storageBucket: "localhost-bf93a.firebasestorage.app",
  messagingSenderId: "1075920183340",
  appId: "1:1075920183340:web:e360ecce28e34d92a07189",
  measurementId: "G-NHYC36FNT1"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png', // Add your icon
    badge: '/badge.png', // Add your badge icon
    data: payload.data
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  
  event.notification.close();
  
  // Handle the click action
  event.waitUntil(
    clients.openWindow('https://localhost:5173') // Replace with your app URL
  );
});