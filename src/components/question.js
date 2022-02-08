import react from 'react';
import { Navigate } from 'react-router-dom';

// Import actions
import questionHandler from '../actions/question';

class Question extends react.Component {

  state = {
    questionCreated: false,
  }

  render() {
    const { session, dispatch } = this.props;

    const questionSubmit = (e)=> {
      e.preventDefault();
      const optionOneText = e.target[0].value;
      const optionTwoText = e.target[1].value;
      const author = session.user;
      dispatch(questionHandler({ optionOneText, optionTwoText, author }))
        .then(()=> {
          if (optionOneText.length && optionTwoText.length) {
            this.setState({
              questionCreated: true
            })
          }
        });
    }

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
