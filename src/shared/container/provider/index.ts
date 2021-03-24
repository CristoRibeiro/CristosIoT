import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import INotificationProvider from './NotificationProvider/models/INotificationProvider';
import OneSignalProvider from './NotificationProvider/implementations/OneSignalProvider/OneSignalProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<INotificationProvider>(
  'NotificationProvider',
  OneSignalProvider,
);
