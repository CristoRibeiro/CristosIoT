import { Response, Request } from 'express';
import { container } from 'tsyringe';
import SendNotificationService from '@modules/devices/services/SendNotificationService';

export default class NotificationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { device_identifier, message, players_id } = request.body;

    const sendNotificationService = container.resolve(SendNotificationService);
    const notification = await sendNotificationService.execute({
      device_identifier,
      message,
      players_id,
    });
    return response.json(notification);
  }
}
