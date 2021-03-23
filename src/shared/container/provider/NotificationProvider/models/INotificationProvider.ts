export default interface INotificationProvider {
  sendNotification(to: Array<string>, body: string): Promise<void>;
}
