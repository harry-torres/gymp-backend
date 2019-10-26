import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';
import Student from '../models/Student';
import ConfirmationMail from '../jobs/ConfirmationMail';
import Queue from '../../lib/Queue';

// index, show, store, update, delete
class EnrollmentController {
  async index(req, res) {
    const enrollments = await Enrollment.findAll({
      attributes: ['start_date', 'end_date', 'price'],
      include: [
        {
          model: Plan,
          as: 'plan',
          attributes: ['title'],
        },
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
      ],
    });
    return res.json(enrollments);
  }

  async store(req, res) {
    // const enrollment = req.body;
    // const plan = await Plan.findByPk(enrollment.plan_id);
    // const total_price = plan.duration * plan.price;
    // enrollment.start_date = startOfDay(parseISO(enrollment.start_date));
    // enrollment.end_date = endOfDay(
    //   addMonths(enrollment.start_date, plan.duration)
    // );
    // enrollment.price = total_price;
    const enrollment = await Enrollment.create(req.body);
    const plan = await Plan.findByPk(enrollment.plan_id);
    const student = await Student.findByPk(enrollment.student_id);

    await Queue.add(ConfirmationMail.key, {
      enrollment,
      plan,
      student,
    });

    return res.json(enrollment);
  }

  async update(req, res) {
    const { id } = req.params;
    const enrollment = await Enrollment.findByPk(id);

    // const enrollment = await Enrollment.findByPk(id, {
    //   include: [
    //     {
    //       model: Plan,
    //       as: 'plan',
    //     },
    //   ],
    // });
    // const total_price = enrollment.plan.duration * enrollment.plan.price;
    // enrollment.start_date = startOfDay(parseISO(req.body.start_date));
    // enrollment.end_date = endOfDay(
    //   addMonths(enrollment.start_date, enrollment.plan.duration)
    // );
    // enrollment.price = total_price;
    // req.body.start_date = parseISO(req.body.start_date);
    await enrollment.update(req.body);

    return res.json(enrollment);
  }

  async delete(req, res) {
    const { id } = req.params;
    const enrollment = await Enrollment.findByPk(id);
    await enrollment.destroy();
    return res.json({ message: 'Successful!' });
  }
}
export default new EnrollmentController();
