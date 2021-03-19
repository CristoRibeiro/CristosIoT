import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IDeviceRepository from '../repositories/IDevicesRepository';
import Device from '../infra/typeorm/entities/device';

interface IRequest {
  name: string;
  identifier: string;
  description: string;
  configuration: string;
}

@injectable()
class CreateDeviceService {
  public constructor(
    @inject('DeviceRepository')
    private ormRepository: IDeviceRepository,
  ) {}

  public async execute({
    name,
    identifier,
    description,
    configuration,
  }: IRequest): Promise<Device> {
    const deviceExists = await this.ormRepository.findByIdentifier(identifier);

    if (deviceExists) {
      throw new AppError(
        'Já existe um dispositivo cadastrado com este identificador!',
        409,
      );
    }
    const device = await this.ormRepository.create({
      name,
      identifier,
      description,
      configuration,
    });

    return device;
  }
}
export default CreateDeviceService;
