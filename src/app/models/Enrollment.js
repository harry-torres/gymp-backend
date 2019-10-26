import { startOfDay, endOfDay, addMonths } from 'date-fns';
import Sequelize, { Model } from 'sequelize';
import Plan from './Plan';

// TODO: add Yup
class Enrollment extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.DECIMAL,
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async enrollment => {
      const plan = await Plan.findByPk(enrollment.plan_id);
      const total_price = plan.duration * plan.price;
      enrollment.start_date = startOfDay(enrollment.start_date);
      enrollment.end_date = endOfDay(
        addMonths(enrollment.start_date, plan.duration)
      );
      enrollment.price = total_price;
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
  }
}

export default Enrollment;
