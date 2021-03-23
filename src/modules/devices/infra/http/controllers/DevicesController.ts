import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateDeviceService from '@modules/devices/services/CreateDeviceService';

export default class DevicesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { identifier, name, description, configuration } = request.body;

    const deviceService = container.resolve(CreateDeviceService);
    const device = await deviceService.execute({
      identifier,
      name,
      description,
      configuration,
    });
    return response.json(device);
  }
}
