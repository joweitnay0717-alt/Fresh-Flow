// 1. Handles REAL background pushes from your Supabase Server (App is closed)
self.addEventListener('push', function(event) {
  if (event.data) {
    const data = event.data.json();
    
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: 'favicon.png', // Uses your beautiful leaf/chili icon!
        badge: 'favicon.png',
        vibrate: [200, 100, 200]
      })
    );
  }
});

// 2. Handles local notification requests from your main app (App is open)
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    self.registration.showNotification(event.data.title, {
      body: event.data.body,
      icon: 'favicon.png', 
      vibrate: [200, 100, 200],
      badge: 'favicon.png'
    });
  }
});

// 3. Opens FreshFlow when the user taps the notification!
self.addEventListener('notificationclick', function(event) {
  event.notification.close(); // Close the notification popup
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      // Check if the app is already open in a background tab and focus it
      for (let i = 0; i < windowClients.length; i++) {
        let client = windowClients[i];
        if (client.url.includes('/') && 'focus' in client) {
          return client.focus();
        }
      }
      // If the app is fully closed, launch it
      if (clients.openWindow) {
        return clients.openWindow('/'); 
      }
    })
  );
});
