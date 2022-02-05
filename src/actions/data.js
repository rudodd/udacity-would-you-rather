import * as actionTypes from '../action-types';
import * as Data from '../_DATA';

// Action Object
function getDataObject (users, questions) {
  return {
    type: actionTypes.RECEIVE_DATA,
    users,
    questions,
  }
}

// Action Handler
function getDataHandler () {
  return (dispatch) => {
    return Promise.all([
      Data._getUsers(),
      Data._getQuestions()
    ]).then(([ users, questions ]) => {
      dispatch(getDataObject(users, questions))
    })
  }
}

export default getDataHandler;