import * as actionTypes from '../action-types';

const users = (state = [], action)=> {
  switch(action.type) {
    case actionTypes.RECEIVE_DATA:
      return action.users
    case actionTypes.SAVE_ANSWER:
      return action.users
    case actionTypes.CREATE_QUESTION:
      return action.users
    default:
      return state
  }
}

export default users;