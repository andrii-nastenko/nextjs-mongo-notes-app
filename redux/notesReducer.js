import {createNoteApi, deleteNoteApi, updateNoteApi} from "../api/notes";
import {notificationError, notificationSuccess} from "../utils/notifications";

const SET_NOTES = "SET_NOTES"
const SET_IS_FETCHING = "SET_IS_FETCHING"
const CREATE_NOTE = "CREATE_NOTE"
const SET_IS_NOTE_CREATING = "SET_IS_NOTE_CREATING"
const DELETE_NOTE = "DELETE_NOTE"
const IS_NOTE_DELETING = "IS_NOTE_DELETING"
const UPDATE_NOTE = "UPDATE_NOTE"
const SET_IS_NOTE_UPDATING = "SET_IS_NOTE_UPDATING"
const SET_IS_MODAL_VISIBLE = "SET_IS_MODAL_VISIBLE"

const initialState = {
    notes: [],
    isDeletingInProcess: [],
    isCreatingInProcess: false,
    isUpdatingInProcess: false,
    isFetching: false,
    isModalVisible: false
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
        case SET_IS_MODAL_VISIBLE:
            return {
                ...state, isModalVisible: action.isModalVisible
            }
        case CREATE_NOTE:
            return {
                ...state, notes: [...state.notes, action.note]
            }
        case SET_IS_NOTE_CREATING:
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
        case UPDATE_NOTE:
            return {
                ...state, notes: state.notes.map(note => {
                    if (note._id === action.note._id) {
                        return action.note
                    } else {
                        return note
                    }
                })
            }
        case SET_IS_NOTE_UPDATING:
            return {
                ...state, isUpdatingInProcess: action.boolean
            }
        default:
            return state
    }
}

export const setNotes = (notes) => ({type: SET_NOTES, notes})
export const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching})
export const setIsModalVisible = (isModalVisible) => ({type: SET_IS_MODAL_VISIBLE, isModalVisible})
const createNoteAction = (note) => ({type: CREATE_NOTE, note})
const isNoteCreating = (boolean) => ({type: SET_IS_NOTE_CREATING, boolean})
const deleteNoteAction = (id) => ({type: DELETE_NOTE, id})
const isNoteDeleting = (id, boolean) => ({type: IS_NOTE_DELETING, id, boolean})
const updateNoteAction = (note) => ({type: UPDATE_NOTE, note})
const isNoteUpdating = (boolean) => ({type: SET_IS_NOTE_UPDATING, boolean})

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
        dispatch(isNoteDeleting(id, true))
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
        dispatch(isNoteDeleting(id, false))
    }
}

export const updateNote = (id, note) => async (dispatch) => {
    try {
        dispatch(isNoteUpdating(true))
        const res = await updateNoteApi(id, note)
        if (res.success) {
            dispatch(updateNoteAction(res.data))
            notificationSuccess('Note is updated!')
            return res
        }
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
        dispatch(isNoteUpdating(false))
    }
}