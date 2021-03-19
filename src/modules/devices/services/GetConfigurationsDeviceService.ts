import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IDeviceRepository from '../repositories/IDevicesRepository';

interface IRequest {
  identifier: string;
}

@injectable()
class CreateDeviceService {
  public constructor(
    @inject('DeviceRepository')
    private ormRepository: IDeviceRepository,
  ) {}

  public async execute({ identifier }: IRequest): Promise<string> {
    const device = await this.ormRepository.findByIdentifier(identifier);

    if (!device) {
      throw new AppError('Dispositivo não encontrado!', 404);
    }

    const { configuration } = device;

    return configuration;
  }
}
export default CreateDeviceService;
