importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBFDzKRSLKOqirvZAUCqccTNE_5Y8ZXib4",
  authDomain: "pwaa-c392e.firebaseapp.com",
  projectId: "pwaa-c392e",
  storageBucket: "pwaa-c392e.appspot.com",
  messagingSenderId: "520233317947",
  appId: "1:520233317947:web:55b387f893111b9aaa4e1e",
  measurementId: "G-HFN5T637QC"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const title = payload.notification?.title || 'Arka Plan Bildirimi';
  const options = {
    body: payload.notification?.body || '',
    icon: '/Pwa/icons/icon-192.png'
  };
  self.registration.showNotification(title, options);
});
