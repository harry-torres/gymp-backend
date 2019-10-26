import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class ConfirmationMail {
  get key() {
    return 'ConfirmationMail';
  }

  async handle({ data }) {
    const { enrollment, student, plan } = data;
    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Enrollment Confirmed!',
      template: 'enrollment',
      context: {
        student: student.name,
        plan: plan.title,
        end_date: format(parseISO(enrollment.end_date), 'MMMM do, H:mm a'),
        price: enrollment.price,
      },
    });
  }
}
export default new ConfirmationMail();
