import {createNoteApi} from "../api/notes";
import {notificationError, notificationSuccess} from "../utils/notifications";

const SET_NOTES = "SET_NOTES"
const SET_IS_FETCHING = "SET_IS_FETCHING"

const initialState = {
    notes: [],
    isFetching: false
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NOTES:
            return {
                ...state, notes: [...action.notes]
            }
        case SET_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        default:
            return state
    }
}

export const setNotes = (notes) => ({type: SET_NOTES, notes})
export const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching})

export const createNote = (note) => async (dispatch) => {
    try {
        dispatch(setIsFetching(true))
        const res = await createNoteApi(note)
        if (res.success) {
            notificationSuccess('Note is created!')
        }
        return res
    } catch (error) {
        if (error.response) {
            if (error.response.data.error.includes('E11000', 'title')) {
                notificationError('This title is already taken')
            } else {
                notificationError(error.response.data.error)
            }
        } else {
            notificationError(error)
        }
    } finally {
        dispatch(setIsFetching(false))
    }
}