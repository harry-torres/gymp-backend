import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import AnswerMail from '../jobs/AnswerMail';
import Queue from '../../lib/Queue';

// index, show, store, update, delete
class AnswerController {
  async store(req, res) {
    const { id } = req.params;
    const { answer } = req.body;
    const helpOrder = await HelpOrder.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
        },
      ],
    });

    if (!helpOrder) {
      return res.status(400).json({ error: 'Invalid Parameters!' });
    }

    helpOrder.answer = answer;
    helpOrder.answered_at = new Date();
    await helpOrder.save();

    await Queue.add(AnswerMail.key, {
      helpOrder,
      student: helpOrder.student,
    });

    return res.json(helpOrder);
  }
}

export default new AnswerController();
