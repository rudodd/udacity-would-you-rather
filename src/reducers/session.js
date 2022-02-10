import * as actionTypes from '../action-types';

const session = (state = {loggedId: false, user: ''}, action)=> {
  switch(action.type) {
    case actionTypes.LOG_IN:
      return action.userId ? {loggedIn: true, user: action.userId} : {loggedIn: false, urser: ''}
    default:
      return state
  }
}

export default session;