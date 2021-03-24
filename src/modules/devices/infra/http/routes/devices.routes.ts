import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import DevicesController from '../controllers/DevicesController';
import NotificationsController from '../controllers/NotificationsController';

const devicesRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', new DevicesController().create);
appointmentsRouter.post('/notification', new NotificationsController().create);

export default appointmentsRouter;
