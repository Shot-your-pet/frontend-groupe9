self.addEventListener('push', event => {
    const data = event.data ? event.data.json() : {};
    console.log(data.challenge?.titre)
    const title = 'Nouveau Challenge !';
    const options = {
        body: data.challenge?.titre || 'Vient vite shooter ton animal !',
        icon: data.icon || '/logo192.png',
        data: data.url || '/'
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data)
    );
});
