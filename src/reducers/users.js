import * as actionTypes from '../action-types';

const users = (state = [], action)=> {
  switch(action.type) {
    case actionTypes.RECEIVE_DATA:
      return action.users
    default:
      return state
  }
}

export default users;