import Device from '../infra/typeorm/entities/device';
import IDeviceCreateDTO from '../dtos/IDeviceCreateDTO';

export default interface IDevicesRepository {
  findByIdentifier(identifier: string): Promise<Device | undefined>;
  create(deviceDTO: IDeviceCreateDTO): Promise<Device>;
}
