import * as Yup from 'yup';
import Student from '../models/Student';

// index, show, store, update, delete
class StudentController {
  async index(req, res) {
    const students = await Student.findAll();
    return res.json(students);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid parameters!' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists!' });
    }

    const student = await Student.create(req.body);

    return res.json(student);
  }

  async update(req, res) {
    // const schema = Yup.object().shape({
    //   name: Yup.string(),
    //   email: Yup.string(),
    //   age: Yup.number(),
    //   weight: Yup.number(),
    //   height: Yup.number(),
    // });
    // unnecessary, cause all parameters are optional and
    // other names will cause no update

    const { id } = req.params;

    // if (!(await schema.isValid(req.body)) || !id) {
    if (!id) {
      return res.status(400).json({ error: 'Invalid parameters!' });
    }

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found!' });
    }

    await student.update(req.body);

    return res.json(student);
  }

  async delete(req, res) {
    const { id } = req.params;

    // if (!(await schema.isValid(req.body)) || !id) {
    if (!id) {
      return res.status(400).json({ error: 'Invalid parameters!' });
    }

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found!' });
    }

    await student.destroy();

    return res.json({ message: 'Successful!' });
  }
}
export default new StudentController();
