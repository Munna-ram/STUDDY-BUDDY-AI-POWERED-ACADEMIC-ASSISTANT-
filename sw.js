self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));
self.addEventListener('fetch', (e) => {}); 
self.addEventListener('push', (e) => {
  const data = e.data ? e.data.json() : { title: 'StudyBuddy', body: 'You have a notification!' };
  e.waitUntil(self.registration.showNotification(data.title, { body: data.body, icon: 'https://cdn-icons-png.flaticon.com/512/3233/3233483.png' }));
});
