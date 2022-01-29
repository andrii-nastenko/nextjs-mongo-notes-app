import { api } from '../api/notes';
import { notifications } from '../utils/notifications';

const SET_NOTES = 'SET_NOTES';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const CREATE_NOTE = 'CREATE_NOTE';
const SET_IS_NOTE_CREATING = 'SET_IS_NOTE_CREATING';
const DELETE_NOTE = 'DELETE_NOTE';
const IS_NOTE_DELETING = 'IS_NOTE_DELETING';
const UPDATE_NOTE = 'UPDATE_NOTE';
const SET_IS_NOTE_UPDATING = 'SET_IS_NOTE_UPDATING';
const SET_IS_MODAL_VISIBLE = 'SET_IS_MODAL_VISIBLE';
const SET_PAGE_NUMBER = 'SET_PAGE_NUMBER';

const initialState = {
  notes: [],
  pageNumber: 1,
  totalCount: 0,
  isDeletingInProcess: [],
  isCreatingInProcess: false,
  isUpdatingInProcess: false,
  isFetching: false,
  isModalVisible: false
};

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTES:
      return {
        ...state,
        notes: [...action.notes],
        totalCount: action.totalCount
      };
    case SET_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: action.pageNumber
      };
    case SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      };
    case SET_IS_MODAL_VISIBLE:
      return {
        ...state,
        isModalVisible: action.isModalVisible
      };
    case CREATE_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.note],
        totalCount: state.totalCount + 1
      };
    case SET_IS_NOTE_CREATING:
      return {
        ...state,
        isCreatingInProcess: action.boolean
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => {
          if (note._id !== action.id) {
            return note;
          }
        }),
        totalCount: state.totalCount - 1
      };
    case IS_NOTE_DELETING:
      return {
        ...state,
        isDeletingInProcess: action.boolean
          ? [...state.isDeletingInProcess, action.id]
          : state.isDeletingInProcess.filter((id) => id !== action.id)
      };
    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note._id === action.note._id) {
            return action.note;
          } else {
            return note;
          }
        })
      };
    case SET_IS_NOTE_UPDATING:
      return {
        ...state,
        isUpdatingInProcess: action.boolean
      };
    default:
      return state;
  }
};

export const setNotes = (notes, totalCount) => ({ type: SET_NOTES, notes, totalCount });
export const setIsFetching = (isFetching) => ({ type: SET_IS_FETCHING, isFetching });
export const setIsModalVisible = (isModalVisible) => ({
  type: SET_IS_MODAL_VISIBLE,
  isModalVisible
});
export const setPageNumber = (pageNumber) => ({ type: SET_PAGE_NUMBER, pageNumber });
const createNoteAction = (note) => ({ type: CREATE_NOTE, note });
const isNoteCreating = (boolean) => ({ type: SET_IS_NOTE_CREATING, boolean });
const deleteNoteAction = (id) => ({ type: DELETE_NOTE, id });
const isNoteDeleting = (id, boolean) => ({ type: IS_NOTE_DELETING, id, boolean });
const updateNoteAction = (note) => ({ type: UPDATE_NOTE, note });
const isNoteUpdating = (boolean) => ({ type: SET_IS_NOTE_UPDATING, boolean });

export const createNote = (note) => async (dispatch) => {
  try {
    dispatch(isNoteCreating(true));
    const res = await api.createNote(note);
    if (res.success) {
      dispatch(createNoteAction(res.data));
      notifications.success('Note is created!');
    }
    return res;
  } catch (error) {
    if (error.response) {
      if (error.response.data.error.includes('E11000', 'title')) {
        notifications.error('This title is already taken');
      } else {
        notifications.error(error.response.data.error);
      }
    } else {
      notifications.error(error);
    }
  } finally {
    dispatch(isNoteCreating(false));
  }
};

export const deleteNote = (id) => async (dispatch) => {
  try {
    dispatch(isNoteDeleting(id, true));
    const res = await api.deleteNote(id);
    if (res.success) {
      dispatch(deleteNoteAction(id));
      notifications.success('Note is deleted!');
    }
  } catch (error) {
    if (error.response) {
      notifications.error(error.response.data.error);
    } else {
      notifications.error(error);
    }
  } finally {
    dispatch(isNoteDeleting(id, false));
  }
};

export const updateNote = (id, note) => async (dispatch) => {
  try {
    dispatch(isNoteUpdating(true));
    const res = await api.updateNote(id, note);
    if (res.success) {
      dispatch(updateNoteAction(res.data));
      notifications.success('Note is updated!');
      return res;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.data.error.includes('E11000', 'title')) {
        notifications.error('This title is already taken');
      } else {
        notifications.error(error.response.data.error);
      }
    } else {
      notifications.error(error);
    }
  } finally {
    dispatch(isNoteUpdating(false));
  }
};
