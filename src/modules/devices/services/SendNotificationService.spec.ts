import FakeDevicesRepository from '@modules/devices/repositories/fakes/FakeDevicesRepository';
import FakeNotificationProvider from '@shared/container/provider/NotificationProvider/fakes/FakeNotificationProvider';

import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '../repositories/fakes/FakeNotificationsRepository';

import SendNotificationsService from './SendNotificationService';

describe('SendNotificationService', () => {
  let fakeNotificationsRepository: FakeNotificationsRepository;
  let fakeNotificationProvider: FakeNotificationProvider;
  let fakeDevicesRepository: FakeDevicesRepository;
  let sendNotificationsService: SendNotificationsService;

  beforeEach(() => {
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeDevicesRepository = new FakeDevicesRepository();
    fakeNotificationProvider = new FakeNotificationProvider();

    sendNotificationsService = new SendNotificationsService(
      fakeNotificationsRepository,
      fakeNotificationProvider,
      fakeDevicesRepository,
    );
  });

  it('Should be able send a new notification to app user.', async () => {
    const { identifier } = await fakeDevicesRepository.create({
      name: 'BabaEletronica',
      identifier: 'quartoInteligente1',
      description: 'Baba Eletrônica Aysha',
      configuration: "{ tempoAlertaChoro: '10', alturaAlertaChoro: '100', }", // TODO alterar para array de configurações criar tabela de configuração);
    });

    const notificationDevice = await sendNotificationsService.execute({
      device_identifier: identifier,
      message: 'Acorda papai e mamãe',
      players_id: 'player_id_app',
    });

    expect(notificationDevice.message).toEqual('Acorda papai e mamãe');
  });

  it('Should not be able send a notification without a register device .', async () => {
    await expect(async () =>
      sendNotificationsService.execute({
        device_identifier: 'babaeletronica1',
        message: 'Acorda papai e mamãe',
        players_id: 'player_id_app',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
