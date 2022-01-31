import { dbConnect } from '../../../utils/dbConnection';
import notesModel from '../../../models/notes';

export default async (req, res) => {
  await dbConnect();
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const size = req.query.size ? parseInt(req.query.size) : 10;
        const notes = await notesModel
          .find()
          .skip((page - 1) * size)
          .limit(size);
        const totalCount = await notesModel.countDocuments();
        res.status(200).json({ success: true, data: { notes, totalCount } });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'POST':
      try {
        if (req.body.toString().trim().length) {
          const note = await notesModel.create(req.body);
          res.status(201).json({ success: true, data: note });
        } else {
          res.status(400).json({ success: false, error: 'Request body is required' });
        }
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(405).json({ success: false, error: 'Method Not Allowed' });
      break;
  }
};
