import webpush from 'web-push';

// Generate VAPID keys if they don't exist
// In production, you should generate these once and save them in environment variables
let vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY || '',
  privateKey: process.env.VAPID_PRIVATE_KEY || '',
};

if (!vapidKeys.publicKey || !vapidKeys.privateKey) {
  vapidKeys = webpush.generateVAPIDKeys();
  console.log('Generated VAPID Public Key:', vapidKeys.publicKey);
  console.log('Generated VAPID Private Key:', vapidKeys.privateKey);
}

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export const getPublicKey = () => vapidKeys.publicKey;

export async function sendNotification(subscription: webpush.PushSubscription, title: string, body: string) {
  try {
    const payload = JSON.stringify({
      notification: {
        title,
        body,
        icon: '/icon-192.png',
        badge: '/icon-192.png',
      }
    });

    await webpush.sendNotification(subscription, payload);
    console.log(`Notification sent to subscription endpoint: ${subscription.endpoint}`);
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
}
