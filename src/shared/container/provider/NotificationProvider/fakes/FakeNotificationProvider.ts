import INotificationProvider from '../models/INotificationProvider';

interface INotificationFake {
  to: string;
  message: string;
}
class FakeOneSignalProvider implements INotificationProvider {
  private notifications: Array<INotificationFake> = [];

  public async sendNotification(to: string, message: string): Promise<void> {
    this.notifications.push({ to, message });
  }
}
export default FakeOneSignalProvider;
