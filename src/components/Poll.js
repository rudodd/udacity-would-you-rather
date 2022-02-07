import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

class PollQuestion extends React.Component {

  render() {
    const { questions, users, id, session } = this.props;
    const question = questions[id];
    const user = users[session.user];
    const author = users[question.author];
    const answered = Object.entries(user.answers).filter((answer)=> {
      return id === answer[0];
    });

    if (answered.length) {
      let winningOption = 'optionTwo';
      const optionOneVoteClass = user.answers[id] === 'optionOne' ? 'user-choice' : '';
      const optionTwoVoteClass = user.answers[id] === 'optionTwo' ? 'user-choice' : '';
      const optionOneClasses = winningOption === 'optionOne' ? optionOneVoteClass + ' ' + 'winner' : optionOneVoteClass;
      const optionTwoClasses = winningOption === 'optionTwo' ? optionTwoVoteClass + ' ' + 'winner' : optionTwoVoteClass;
      return (
        <div className="poll-question">
          <h2>Results:</h2>
          <div className="poll-question-title"><h3>{author.name} asks:</h3></div>
          <div className="poll-question-avatar"><img src={author.avatarURL} alt={author.name} /></div>
          <div className="poll-question-detail">
            <h4>Would you rather</h4>
            <p className={optionOneClasses}>{question.optionOne.text}</p>
            <p>or</p>
            <p className={optionTwoClasses}>{question.optionTwo.text}</p>
            <Link to={`/poll/${question.id}`}>View Poll</Link>
          </div>
        </div>
      );
    }

    return (
      <div className="poll-question">
        <div className="poll-question-title"><h2>{author.name} asks:</h2></div>
        <div className="poll-question-avatar"><img src={author.avatarURL} alt={author.name} /></div>
        <div className="poll-question-detail">
          <h3>Would you rather</h3>
          <form className="poll-form">
            <div className="input-wrapper">
              <input value="optionOne" type="radio" name="answer" id="optionOne" />
              <label htmlFor="optionOne">{question.optionOne.text}</label>
            </div>
            <p>or</p>
            <div className="input-wrapper">
              <input value="optionTwo" type="radio" name="answer" id="optionTwo" />
              <label htmlFor="optionTwo">{question.optionTwo.text}</label>
            </div>
          </form>
          <button type="submit">Submit</button>
        </div>
      </div>
    );

  }
}

const ConnectedPollQuestion = connect((state) => ({
  loading: state.loading,
  session: state.session,
  users: state.users,
  questions: state.questions
}))(PollQuestion)

function Poll() {
  const { id } = useParams();

  return (
    <div className="poll-wrapper">
      <ConnectedPollQuestion id={id} />
    </div>
  )
}

export default Poll;