import HelpOrder from '../models/HelpOrder';

// index, show, store, update, delete
class QuestionController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: {
        answered_at: null,
      },
    });
    return res.json(helpOrders);
  }

  async show(req, res) {
    const { student_id } = req.params;
    const helpOrder = await HelpOrder.findAll({
      where: {
        student_id,
      },
    });

    if (!helpOrder) {
      return res.status(400).json({ error: 'Inalid Parameters!' });
    }

    return res.json(helpOrder);
  }

  async store(req, res) {
    req.body.student_id = req.params.student_id;
    const helpOrder = await HelpOrder.create(req.body);
    return res.json(helpOrder);
  }

  async update(req, res) {
    const { id } = req.params;

    const helpOrder = await HelpOrder.findByPk(id);
    await helpOrder.update(req.body);

    return res.json(helpOrder);
  }

  async delete(req, res) {
    const { id } = req.params;
    const helpOrder = await HelpOrder.findByPk(id);
    await helpOrder.destroy();
    return res.json({ message: 'Successful!' });
  }
}

export default new QuestionController();
