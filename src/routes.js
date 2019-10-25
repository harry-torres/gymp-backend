import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import auth from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

// daqui em diante so req autenticada
routes.use(auth);

routes.get('/students', StudentController.index);
routes.put('/students/:id', StudentController.update);
routes.post('/students', StudentController.store);
routes.delete('/students/:id', StudentController.delete);

export default routes;
