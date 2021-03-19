import { getRepository, Repository } from 'typeorm';
import IDevicesRepository from '@modules/devices/repositories/IDevicesRepository';
import Device from '@modules/devices/infra/typeorm/entities/device';
import IDeviceCreateDTO from '@modules/devices/dtos/IDeviceCreateDTO';

class DevicesRepository implements IDevicesRepository {
  private repositoryOrm: Repository<Device>;

  constructor() {
    this.repositoryOrm = getRepository(Device);
  }

  public async findByIdentifier(
    identifier: string,
  ): Promise<Device | undefined> {
    const deviceByName = await this.repositoryOrm.findOne({
      where: { identifier },
    });

    return deviceByName;
  }

  public async create({
    name,
    identifier,
    description,
    configuration,
  }: IDeviceCreateDTO): Promise<Device> {
    const device = this.repositoryOrm.create({
      name,
      identifier,
      description,
      configuration,
    });
    await this.repositoryOrm.save(device);
    return device;
  }
}
export default DevicesRepository;
