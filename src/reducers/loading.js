import * as actionTypes from '../action-types';

const loading = (state = true, action)=> {
  switch(action.type) {
    case actionTypes.RECEIVE_DATA:
      return false
    default:
      return state
  }
}

export default loading;