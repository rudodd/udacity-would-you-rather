import * as actionTypes from '../action-types';

const loggedIn = (state = true, action)=> {
  switch(action.type) {
    case actionTypes.LOG_IN:
      return true
    default:
      return state
  }
}

export default loggedIn;