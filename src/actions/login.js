import * as actionTypes from '../action-types';

// Action Object
function loginObject (userId) {
  return {
    type: actionTypes.LOG_IN,
    userId,
  }
}

// Action Handler
function loginHandler (userId) {
  return (dispatch) => {
    dispatch(loginObject(userId));
  }
}

export default loginHandler;