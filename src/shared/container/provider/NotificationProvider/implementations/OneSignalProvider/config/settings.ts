export default {
  settings: {
    oneSignalAppID: '825d130e-5171-4ca1-aec0-d2988984bef0',
    host: 'onesignal.com',
    sendNotificationConfig: {
      path: '/api/v1/notifications',
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    },
  },
};
