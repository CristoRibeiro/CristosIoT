import INotificationProvider from '@shared/container/provider/NotificationProvider/models/INotificationProvider';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import NotificationDevice from '../infra/typeorm/entities/notificationDevice';
import IDevicesRepository from '../repositories/IDevicesRepository';
import INotificationsRepository from '../repositories/INotificationsRepository ';

interface IRequest {
  players_id: string;
  device_identifier: string;
  message: string;
}

@injectable()
class SendNotificationService {
  public constructor(
    @inject('NotificationRepository')
    private ormRepository: INotificationsRepository,
    @inject('NotificationProvider')
    private notificationProvider: INotificationProvider,
    @inject('DeviceRepository')
    private deviceRepository: IDevicesRepository,
  ) {}

  public async execute({
    players_id,
    message,
    device_identifier,
  }: IRequest): Promise<NotificationDevice> {
    const device = await this.deviceRepository.findByIdentifier(
      device_identifier,
    );

    if (!device) {
      throw new AppError('Dispositivo não cadastrado', 404);
    }
    await this.notificationProvider.sendNotification(players_id, message);

    const notificationDevice = await this.ormRepository.create({
      players_id,
      device_id: device.id,
      message,
    });

    return notificationDevice;
  }
}
export default SendNotificationService;
