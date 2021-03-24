import { uuid } from 'uuidv4';

import NotificationDevice from '@modules/devices/infra/typeorm/entities/notificationDevice';
import INotificationSendDTO from '@modules/devices/dtos/INotificationSendDTO';
import INotificationsRepository from '../INotificationsRepository ';

class FakeNotificationsRepository implements INotificationsRepository {
  private notificationsDevice: NotificationDevice[] = [];

  public async create({
    device_id,
    message,
    players_id,
  }: INotificationSendDTO): Promise<NotificationDevice> {
    const notificationDevice = new NotificationDevice();

    Object.assign(notificationDevice, {
      id: uuid(),
      message,
      players_id,
      device_id,
    });

    this.notificationsDevice.push(notificationDevice);

    return notificationDevice;
  }
}
export default FakeNotificationsRepository;
