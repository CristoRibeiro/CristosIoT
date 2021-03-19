import { Response, Request } from 'express';
import { container } from 'tsyringe';
// import CreateDevicetService from '@modules/devices/services/CreateDeviceService';

export default class DevicesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, configuration } = request.body;

    const deviceService = container.resolve(CreateDeviceService);
    const device = await deviceService.execute({
      name,
      description,
      configuration,
    });
    return response.json(device);
  }
}
