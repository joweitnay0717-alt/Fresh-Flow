// This tells the phone what to do when a push signal arrives
self.addEventListener('push', function(event) {
    let data = {};
    if (event.data) {
        data = event.data.json(); // Read the message from Supabase
    }

    const title = data.title || "FreshFlow Alert! ⚠️";
    const options = {
        body: data.body || "You have items expiring soon!",
        icon: "favicon.png", 
        badge: "favicon.png",
        vibrate: [200, 100, 200, 100, 200, 100, 200], // Makes the phone buzz
        data: {
            url: "https://joweitnay0717-alt.github.io/Fresh-Flow/" // Your app link
        }
    };

    // This is the line that actually draws the notification on the lock screen!
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// This tells the phone what to do when you tap the notification
self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // Close the pop-up
    event.waitUntil(
        clients.openWindow(event.notification.data.url) // Open your app
    );
});
