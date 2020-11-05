import {dbConnect} from '../../../utils/dbConnection';
import notesModel from '../../../models/notes';

dbConnect()

export default async (req, res) => {
    const {method} = req
    switch (method) {
        case 'GET':
            try {
                const notes = await notesModel.find()
                res.status(200).json({success: true, data: notes})
            } catch (error) {
                res.status(400).json({success: false, error: error.message})
            }
            break
        case 'POST':
            try {
                if (req.body.toString().trim().length) {
                    const note = await notesModel.create(req.body)
                    res.status(201).json({success: true, data: note})
                } else {
                    res.status(400).json({success: false, error: 'Request body is required'})
                }
            } catch (error) {
                res.status(400).json({success: false, error: error.message})
            }
            break
        default:
            res.status(400).json({success: false, error: 'Unknown server error'})
            break
    }
}