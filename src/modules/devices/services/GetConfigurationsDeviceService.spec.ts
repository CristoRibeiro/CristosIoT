import FakeDevicesRepository from '@modules/devices/repositories/fakes/FakeDevicesRepository';

import AppError from '@shared/errors/AppError';

import GetConfigurationsDeviceService from './GetConfigurationsDeviceService';

let fakeDevicesRepository: FakeDevicesRepository;

describe('GetConfigurationsDeviceService', () => {
  beforeEach(() => {
    fakeDevicesRepository = new FakeDevicesRepository();
  });

  it('Should be able get configurations devices.', async () => {
    await fakeDevicesRepository.create({
      name: 'BabaEletrônica 1',
      identifier: 'quartoInteligente1',
      description: 'Baba Eletrônica quarto casal',
      configuration: "{ tempoAlertaChoro: '15', alturaAlertaChoro: '14', }",
    });

    const getConfigurationsDeviceService = new GetConfigurationsDeviceService(
      fakeDevicesRepository,
    );

    const configuration = await getConfigurationsDeviceService.execute({
      identifier: 'quartoInteligente1',
    });

    expect(configuration).toEqual(
      "{ tempoAlertaChoro: '15', alturaAlertaChoro: '14', }",
    );
  });

  it('Should not be able get configurations with invalid device.', async () => {
    const getConfigurationsDeviceService = new GetConfigurationsDeviceService(
      fakeDevicesRepository,
    );

    await expect(
      getConfigurationsDeviceService.execute({
        identifier: 'quartoInteligente1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
