// Import libraries
import react from 'react';
import { Navigate } from 'react-router-dom';

// Import actions
import questionHandler from '../actions/question';

/**
 * Error message componenet **************************************************************
 */
function ErrorMessage() {
  return (
    <div className="error-message">
      <p><span className="material-icons">report</span> Question creation failed.  One or more of the option inouts is empty.  Please fill out both options and try again.</p>
    </div>
  )
}

/**
 * Create question componenet **************************************************************
 */
class Question extends react.Component {

  // Set display state for use in deciding whether to display the form or redirect home
  state = {
    questionCreated: false,
    error: false,
  }

  render() {
    const { session, dispatch } = this.props;

    // Method to dispatch the questionHandler on form submit
    const questionSubmit = (e)=> {
      e.preventDefault();
      const optionOneText = e.target[0].value;
      const optionTwoText = e.target[1].value;
      const author = session.user;
      if (optionOneText.length && optionTwoText.length) {
        dispatch(questionHandler({ optionOneText, optionTwoText, author }))
        this.setState({
          questionCreated: true
        })
      } else {
        this.setState({
          error: true,
        })
      }
    }

    // If the question was created redirect to the home screen
    if (this.state.questionCreated) {
      return (
        <Navigate to="/" />
      )
    }

    return (
      <div className="new-question-wrapper">
        <div className="new-question-title">
          <h1>Create a question</h1>
        </div>
        <div className="new-question-details">
          <p>Complete the question</p>
          <h2>Would you rather...</h2>
          {this.state.error ? <ErrorMessage /> : null}
          <form className="new-question-form" onSubmit={questionSubmit}>
            <div className="input-wrapper">
              <label className="sr-only">Option One Text</label>
              <input type="text" placeholder="Enter option one text here" name="optionOne" id="optionOne" />
            </div>
            <p>or</p>
            <div className="input-wrapper">
              <label className="sr-only">Option One Text</label>
              <input type="text" placeholder="Enter option one text here" name="optionOne" id="optionOne" />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
};

export default Question;
