import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';

import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let resetPasswordService: ResetPasswordService;

describe('SendEmailForgotPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokenRepository,
    );
  });

  it('Should be able user reset the password.', async () => {
    const user = await fakeUsersRepository.create({
      email: 'Iasmim@gmail.com',
      name: 'Iasmim',
      password: '123456',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    await resetPasswordService.execute({
      password: '123789',
      token,
    });

    expect(user.password).toBe('123789');
  });

  it('Should not be able user reset the password with invalid token.', async () => {
    const user = await fakeUsersRepository.create({
      email: 'Iasmim@gmail.com',
      name: 'Iasmim',
      password: '123456',
    });

    await fakeUserTokenRepository.generate(user.id);

    await expect(async () =>
      resetPasswordService.execute({
        password: '123789',
        token: '144566',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
