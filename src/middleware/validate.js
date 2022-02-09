// Middleware to validate that question answers have text in them before allowing the question to be created
import * as actionTypes from '../action-types';

const validate = (store) => (next) => (action) => {
  if (action.type === actionTypes.CREATE_QUESTION && (!action.question.optionOneText.length || !action.question.optionTwoText.length)) {
    return alert("Create question failed. You are missing text for one or both or your options.")
  }

  return next(action)
}

export default validate;