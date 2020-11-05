import {getNotesApi} from "../api/notes";

const SET_NOTES = "SET_NOTES"
const SET_IS_FETCHING = "SET_IS_FETCHING"

const initialState = {
    notes: [],
    isFetching: false
}

export const appReducer = (state = initialState, action) => {
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

const setNotes = (notes) => ({type: SET_NOTES, notes})
const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching})

export const getNotes = () => async (dispatch) => {
    try {
        dispatch(setIsFetching(true))
        const notes = await getNotesApi()
        if (notes.length) {
            dispatch(setNotes(notes))
        }
    } catch (error) {
        alert(error)
    } finally {
        dispatch(setIsFetching(false))
    }
}