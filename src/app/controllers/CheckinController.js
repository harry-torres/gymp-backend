import { Op } from 'sequelize';
import { startOfDay, endOfDay, subWeeks } from 'date-fns';
import Checkin from '../models/Checkin';

// index, show, store, update, delete
class CheckinController {
  async store(req, res) {
    const { student_id } = req.params;
    if (!student_id) {
      return res.status(400).json({ error: 'Invalid Parameters!' });
    }

    const now = new Date();

    const lastWeek = subWeeks(now, 1);
    const count = await Checkin.count({
      where: {
        student_id,
        created_at: {
          [Op.between]: [startOfDay(lastWeek), endOfDay(now)],
        },
      },
    });
    if (!(count < 5)) {
      return res
        .status(400)
        .json({ error: 'Cannot exceed the limit of 5 checkins!' });
    }
    const checkin = await Checkin.create({ student_id });
    return res.json(checkin);
  }

  async show(req, res) {
    const { student_id } = req.params;
    if (!student_id) {
      return res.status(400).json({ error: 'Invalid Parameters!' });
    }
    const checkin = await Checkin.findAll({
      student_id,
      attributes: ['created_at'],
    });
    return res.json(checkin);
  }
}

export default new CheckinController();
