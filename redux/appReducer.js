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

export const setNotes = (notes) => ({type: SET_NOTES, notes})
export const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching})