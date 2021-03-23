import INotificationProvider from '../models/INotificationProvider';

interface INotificationFake {
  to: Array<string>;
  body: string;
}
class FakeOneSignalProvider implements INotificationProvider {
  private notifications: Array<INotificationFake> = [];

  public async sendNotification(
    to: Array<string>,
    body: string,
  ): Promise<void> {
    this.notifications.push({ to, body });
  }
}
export default FakeOneSignalProvider;
