import Plan from '../models/Plan';

// index, show, store, update, delete
class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();
    return res.json(plans);
  }

  async store(req, res) {
    const plan = await Plan.create(req.body);
    return res.json(plan);
  }

  async update(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);
    await plan.update(req.body);

    return res.json(plan);
  }

  async delete(req, res) {
    const { id } = req.params;
    const plan = await Plan.findByPk(id);
    await plan.destroy();
    return res.json({ message: 'Successful!' });
  }
}
export default new PlanController();
