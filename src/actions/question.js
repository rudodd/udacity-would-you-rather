import * as actionTypes from '../action-types';
import * as Data from '../_DATA';

// Action Object
function questionObject (question, users, questions) {
  return {
    type: actionTypes.CREATE_QUESTION,
    question,
    users,
    questions
  }
}

// Action Handler
function questionHandler (question) {
  return (dispatch) => {
    return Data._saveQuestion(question)
      .then((res) => {
        dispatch(questionObject(question, res.users, res.questions))
      })
      .catch(() => {
        alert('There was an error. Try again.')
      })
  }
}

export default questionHandler;