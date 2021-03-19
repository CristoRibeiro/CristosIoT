import { uuid } from 'uuidv4';

import IDevicesCreateDTO from '@modules/devices/dtos/IDeviceCreateDTO';
import Device from '@modules/devices/infra/typeorm/entities/device';
import IDevicesRepository from '../IDevicesRepository';

class DevicesRepository implements IDevicesRepository {
  private devices: Device[] = [];

  public async findByIdentifier(
    identifier: string,
  ): Promise<Device | undefined> {
    const deviceByIdentifier = this.devices.find(device => {
      return device.identifier === identifier;
    });
    return deviceByIdentifier;
  }

  public async create({
    name,
    identifier,
    description,
    configuration,
  }: IDevicesCreateDTO): Promise<Device> {
    const device = new Device();

    Object.assign(device, {
      id: uuid(),
      identifier,
      name,
      description,
      configuration,
    });
    this.devices.push(device);
    return device;
  }

  public findAll(): Array<Device> {
    return this.devices;
  }
}
export default DevicesRepository;
