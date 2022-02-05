import * as actionTypes from '../action-types';

const questions = (state = [], action)=> {
  switch(action.type) {
    case actionTypes.RECEIVE_DATA:
      return action.questions
    default:
      return state
  }
}

export default questions;