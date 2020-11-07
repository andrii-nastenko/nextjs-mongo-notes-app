import {createNoteApi, deleteNoteApi} from "../api/notes";
import {notificationError, notificationSuccess} from "../utils/notifications";

const SET_NOTES = "SET_NOTES"
const SET_IS_FETCHING = "SET_IS_FETCHING"
const CREATE_NOTE = "CREATE_NOTE"
const IS_NOTE_CREATING = "IS_NOTE_CREATING"
const DELETE_NOTE = "DELETE_NOTE"
const IS_NOTE_DELETING = "IS_NOTE_DELETING"

const initialState = {
    notes: [],
    isCreatingInProcess: false,
    isDeletingInProcess: [],
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
        case CREATE_NOTE:
            return {
                ...state, notes: [...state.notes, action.note]
            }
        case IS_NOTE_CREATING:
            return {
                ...state, isCreatingInProcess: action.boolean
            }
        case DELETE_NOTE:
            return {
                ...state, notes: state.notes.filter(note => {
                    if (note._id !== action.id) {
                        return note
                    }
                })
            }
        case IS_NOTE_DELETING:
            return {
                ...state, isDeletingInProcess: action.boolean
                    ? [...state.isDeletingInProcess, action.id]
                    : state.isDeletingInProcess.filter(id => id !== action.id)
            }
        default:
            return state
    }
}

export const setNotes = (notes) => ({type: SET_NOTES, notes})
export const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching})
const createNoteAction = (note) => ({type: CREATE_NOTE, note})
const isNoteCreating = (boolean) => ({type: IS_NOTE_CREATING, boolean})
const deleteNoteAction = (id) => ({type: DELETE_NOTE, id})
const isNoteDeleting = (id, boolean) => ({type: IS_NOTE_DELETING, id, boolean})

export const createNote = (note) => async (dispatch) => {
    try {
        dispatch(isNoteCreating(true))
        const res = await createNoteApi(note)
        if (res.success) {
            dispatch(createNoteAction(res.data))
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
        dispatch(isNoteCreating(false))
    }
}

export const deleteNote = (id) => async (dispatch) => {
    try {
        dispatch(isNoteDeleting(id,true))
        const res = await deleteNoteApi(id)
        if (res.success) {
            dispatch(deleteNoteAction(id))
            notificationSuccess('Note is deleted!')
        }
    } catch (error) {
        if (error.response) {
            notificationError(error.response.data.error)
        } else {
            notificationError(error)
        }
    } finally {
        dispatch(isNoteDeleting(id,false))
    }
}