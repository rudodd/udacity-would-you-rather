import * as actionTypes from '../action-types';
import * as Data from '../_DATA';

// Action Object
function receiveDataObject (users, questions) {
  // console.log({
  //   type: actionTypes.RECEIVE_DATA,
  //   users,
  //   questions,
  // });
  return {
    type: actionTypes.RECEIVE_DATA,
    users,
    questions,
  }
}

// Action Handler
function initialDataHandler () {
  return (dispatch) => {
    return Promise.all([
      Data._getUsers(),
      Data._getQuestions()
    ]).then(([ users, questions ]) => {
      dispatch(receiveDataObject(users, questions))
    })
  }
}

export default initialDataHandler;