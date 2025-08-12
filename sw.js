const BASE_PATH = '/Pwa/';
const CACHE_NAME = 'pwa-static-v1';
const PRECACHE_URLS = [
  BASE_PATH,
  BASE_PATH + 'index.html',
  BASE_PATH + 'offline.html',
  BASE_PATH + 'manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(PRECACHE_URLS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => {
      if (k !== CACHE_NAME) return caches.delete(k);
    })))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (!url.pathname.startsWith(BASE_PATH)) return;
  e.respondWith(
    caches.match(e.request).then(c => c || fetch(e.request).catch(() => caches.match(BASE_PATH + 'offline.html')))
  );
});

importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBFDzKRSLKOqirvZAUCqccTNE_5Y8ZXib4",
  authDomain: "pwaa-c392e.firebaseapp.com",
  projectId: "pwaa-c392e",
  storageBucket: "pwaa-c392e.firebasestorage.app",
  messagingSenderId: "520233317947",
  appId: "1:520233317947:web:55b387f893111b9aaa4e1e",
  measurementId: "G-HFN5T637QC"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const title = payload.notification?.title || 'Arka plan bildirimi';
  const options = { body: payload.notification?.body || '' };
  self.registration.showNotification(title, options);
});
