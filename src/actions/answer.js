import * as actionTypes from '../action-types';
import * as Data from '../_DATA';

// Action Object
function answerObject (users, questions) {
  return {
    type: actionTypes.SAVE_ANSWER,
    users, 
    questions
  }
}

// Action Handler
function answerHandler (authedUser, qid, answer) {
  return (dispatch) => {
    return Data._saveQuestionAnswer({ authedUser, qid, answer })
      .then((res) => {
        dispatch(answerObject(res.users, res.questions))
      })
      .catch(() => {
        alert('There was an error. Try again.')
      })
  }
}

export default answerHandler;