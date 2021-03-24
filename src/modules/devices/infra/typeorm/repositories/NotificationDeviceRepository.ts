import { getRepository, Repository } from 'typeorm';
import INotificationsRepository from '@modules/devices/repositories/INotificationsRepository ';
import INotificationSendDTO from '@modules/devices/dtos/INotificationSendDTO';
import NotificationDevice from '../entities/notificationDevice';

class NotificationsRepository implements INotificationsRepository {
  private repositoryOrm: Repository<NotificationDevice>;

  constructor() {
    this.repositoryOrm = getRepository(NotificationDevice);
  }

  public async create({
    device_id,
    message,
    players_id,
  }: INotificationSendDTO): Promise<NotificationDevice> {
    const notificationDevice = this.repositoryOrm.create({
      message,
      device_id,
      players_id,
    });
    await this.repositoryOrm.save(notificationDevice);
    return notificationDevice;
  }
}
export default NotificationsRepository;
