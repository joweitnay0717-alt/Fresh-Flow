// Tiny background assistant to handle phone notifications
self.addEventListener('push', function(event) {
  // This handles cloud messages if you add them later
});

// Listener for local notification requests from your main app
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    self.registration.showNotification(event.data.title, {
      body: event.data.body,
      icon: 'favicon.png', // Uses your beautiful leaf/chili icon!
      vibrate: [200, 100, 200],
      badge: 'favicon.png'
    });
  }
});
