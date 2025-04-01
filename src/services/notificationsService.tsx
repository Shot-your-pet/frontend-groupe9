import apiClient from "./api.ts";
import {ReponseAPI} from "./ReponseAPI.ts";

export async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/service-worker.js');
            console.log('Service Worker enregistré avec succès:');
            return registration;
        } catch (error) {
            console.error('Échec de l’enregistrement du Service Worker:', error);
        }
    } else {
        console.error('Service Worker non supporté par ce navigateur.');
    }
}

export async function askNotificationPermission() {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
        // console.log('Permission de notifications accordée.');
        console.warn('Permission de notifications refusée.');
    }
    return permission;
}

export function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export async function subscribeUser(registration, vapidPublicKey: string, token?: string) {
    try {
        const convertedKey = urlBase64ToUint8Array(vapidPublicKey);
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true, // obligatoire pour s'assurer que l'utilisateur voit bien la notification
            applicationServerKey: convertedKey
        });
        const formData = new FormData();
        formData.append("subscription", JSON.stringify(subscription));
        // console.log('Utilisateur souscrit aux notifications:', subscription);
        const response = await apiClient(token).post<ReponseAPI<any>>("/notifications/subscribe", JSON.stringify(subscription));
        return response;
    } catch (error) {
        console.error('Erreur lors de la souscription aux notifications:', error);
    }
}
