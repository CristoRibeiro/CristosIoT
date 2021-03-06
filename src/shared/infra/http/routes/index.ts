import { Router } from 'express';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/devices', devicesRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
