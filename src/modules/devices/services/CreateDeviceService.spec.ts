import FakeDevicesRepository from '@modules/devices/repositories/fakes/FakeDevicesRepository';

import AppError from '@shared/errors/AppError';

import CreateDeviceService from './CreateDeviceService';

describe('CreateDeviceService', () => {
  it('Should be able create a new device.', async () => {
    const fakeDevicesRepository = new FakeDevicesRepository();

    const createDeviceService = new CreateDeviceService(fakeDevicesRepository);

    const device = await createDeviceService.execute({
      name: 'BabaEletronica',
      identifier: 'quartoInteligente1',
      description: 'Baba Eletrônica quarto Aysha',
      configuration: "{ tempoAlertaChoro: '10', alturaAlertaChoro: '100', }", // TODO alterar para array de configurações criar tabela de configuração
    });

    expect(device.name).toEqual('BabaEletronica');
  });

  it('Should not be able create duplicate identifier device.', async () => {
    const fakeDevicesRepository = new FakeDevicesRepository();
    const createDeviceService = new CreateDeviceService(fakeDevicesRepository);

    await createDeviceService.execute({
      name: 'BabaEletrônica 1',
      identifier: 'quartoInteligente1',
      description: 'Baba Eletrônica quarto casal',
      configuration: "{ tempoAlertaChoro: '15', alturaAlertaChoro: '14', }",
    });
    expect(async () =>
      createDeviceService.execute({
        name: 'BabaEletrônica',
        identifier: 'quartoInteligente1',
        description: 'Baba Eletrônica quarto Aysha',
        configuration: "{ tempoAlertaChoro: '10', alturaAlertaChoro: '100', }",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
