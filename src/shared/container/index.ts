import { container } from 'tsyringe';
import '@modules/users/provider';
import '@shared/container/provider';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';

import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import DevicesRepository from '@modules/devices/infra/typeorm/repositories/DevicesRepository';
import IDevicesRepository from '@modules/devices/repositories/IDevicesRepository';

import NotificationDeviceRepository from '@modules/devices/infra/typeorm/repositories/NotificationDeviceRepository';
import INotificationDeviceRepository from '@modules/devices/repositories/INotificationsRepository ';

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentRepository,
);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IDevicesRepository>(
  'DevicesRepository',
  DevicesRepository,
);

container.registerSingleton<INotificationDeviceRepository>(
  'NotificationDeviceRepository',
  NotificationDeviceRepository,
);
