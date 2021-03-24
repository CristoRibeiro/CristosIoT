import INotificationSendDTO from '../dtos/INotificationSendDTO';
import NotificationDevice from '../infra/typeorm/entities/notificationDevice';

export default interface INotificationsRepository {
  create(
    notificationSendDTO: INotificationSendDTO,
  ): Promise<NotificationDevice>;
}
