import * as actionTypes from '../action-types';

const questions = (state = [], action)=> {
  switch(action.type) {
    case actionTypes.RECEIVE_DATA:
      return action.questions
    case actionTypes.SAVE_ANSWER:
      return action.questions
    default:
      return state
  }
}

export default questions;