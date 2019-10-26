import { Router } from 'express';
import PlanController from './app/controllers/PlanController';
import AnswerController from './app/controllers/AnswerController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import CheckinController from './app/controllers/CheckinController';
import QuestionController from './app/controllers/QuestionController';
import EnrollmentController from './app/controllers/EnrollmentController';
import auth from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/students/:student_id/checkins', CheckinController.store);
routes.get('/students/:student_id/checkins', CheckinController.show);

routes.get('/students/help-orders', QuestionController.index);
routes.get('/students/:student_id/help-orders', QuestionController.show);
routes.post('/students/:student_id/help-orders', QuestionController.store);

// daqui em diante so req autenticada
routes.use(auth);

routes.get('/students', StudentController.index);
routes.put('/students/:id', StudentController.update);
routes.post('/students', StudentController.store);
routes.delete('/students/:id', StudentController.delete);

routes.get('/plans', PlanController.index);
routes.put('/plans/:id', PlanController.update);
routes.post('/plans', PlanController.store);
routes.delete('/plans/:id', PlanController.delete);

routes.get('/enrollments', EnrollmentController.index);
routes.put('/enrollments/:id', EnrollmentController.update);
routes.post('/enrollments', EnrollmentController.store);
routes.delete('/enrollments/:id', EnrollmentController.delete);

routes.post('/help-orders/:id/answer', AnswerController.store);

export default routes;
