import {dbConnect} from '../../../utils/dbConnection'
import notesModel from '../../../models/notes'

dbConnect()

export default async (req, res) => {
    const id = req.query.id
    const {method} = req
    switch (method) {
        case 'GET':
            try {
                const note = await notesModel.findById(id)
                if (!note) {
                    res.status(400).json({success: false, error: 'Note was not found'})
                } else {
                    res.status(200).json({success: true, data: note})
                }
            } catch (error) {
                res.status(400).json({success: false, error: error.message})
            }
            break
        case 'PUT':
            try {
                const note = await notesModel.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
                if (!note) {
                    res.status(400).json({success: false, error: 'Note was not found. Nothing to updated'})
                } else {
                    res.status(201).json({success: true, data: note})
                }
            } catch (error) {
                res.status(400).json({success: false, error: error.message})
            }
            break
        case 'DELETE':
            try {
                const note = await notesModel.deleteOne({_id: id})
                if (!note.n) {
                    res.status(400).json({success: false, error: 'Note was not found. Nothing to delete'})
                } else {
                    res.status(204).json({success: true, data: {}})
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