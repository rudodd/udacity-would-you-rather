// Import libraries
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// Import custom components
import NotFound from './NotFound';

// Import actions
import answerHandler from '../actions/answer';


// Function to count and calculate votes and return a results object to be analyzed
const calculateVotes = (id, questions)=> {
  const optionOneVotes = questions[id].optionOne.votes.length;
  const optionTwoVotes = questions[id].optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;
  const optionOnePerent = Math.round((optionOneVotes / totalVotes) * 100);
  const optionTwoPercent = Math.round((optionTwoVotes / totalVotes) * 100);
  let winningOption = null;
  if (optionOneVotes > optionTwoVotes) {
    winningOption = 'optionOne';
  } else if (optionOneVotes < optionTwoVotes) {
    winningOption = 'optionTwo';
  }
  return {
    winner: winningOption,
    percents: {
      optionOne: optionOnePerent,
      optionTwo: optionTwoPercent,
    },
    counts: {
      total: totalVotes,
      optionOne: optionOneVotes,
      optionTwo: optionTwoVotes,
    }
  }
}

// Function to get results of votes and create an object to use rendering
const getVoteData = (id, user, questions)=> {
  let votes = calculateVotes(id, questions);
  const optionOneVoteClassArray = ['question-answer'];
  const optionTwoVoteClassArray = ['question-answer'];
  if (user.answers[id] === 'optionOne') {
    optionOneVoteClassArray.push('user-choice');
  } else {
    optionTwoVoteClassArray.push('user-choice');
  }
  if (votes.winner === 'optionOne') {
    optionOneVoteClassArray.push('winner');
  } else if (votes.winner === 'optionTwo') {
    optionTwoVoteClassArray.push('winner');
  }
  const optionOneClasses = optionOneVoteClassArray.join(' ');
  const optionTwoClasses = optionTwoVoteClassArray.join(' ');
  return {
    totalVotes: votes.counts.total,
    optionOne: {
      classes: optionOneClasses,
      percent: `${votes.percents.optionOne}%`,
      count: votes.counts.optionOne,
    },
    optionTwo: {
      classes: optionTwoClasses,
      percent: `${votes.percents.optionTwo}%`,
      count: votes.counts.optionTwo,
    }
  }
}

/**
 * Poll question componenet **************************************************************
 */
class PollQuestion extends React.Component {

  render() {
    const { questions, users, id, session, dispatch } = this.props;

    // Display 404 page if the poll question doesn't exist
    if (typeof questions[id] === 'undefined') {
      return (
        <NotFound />
      )
    }

    // Else if the poll question does exist, determine if it has been answered by the current user
    const question = questions[id];
    const user = users[session.user];
    const author = users[question.author];
    const answered = Object.entries(user.answers).filter((answer)=> id === answer[0]).length ? true : false;

    // Method to dispatch the answerHandler when a question is answered
    const answerSubmit = (e)=> {
      e.preventDefault();
      const answer = e.target[0].checked ? 'optionOne' : 'optionTwo';
      dispatch(answerHandler(user.id, id, answer));
    }

    // If the poll question has been answered return the results
    if (answered) {
      const voteData = getVoteData(id, user, questions);
      return (
        <div className="question">
          <div className="question-title"><h3>{author.name} asks:</h3></div>
          <div className="question-avatar"><img src={author.avatarURL} alt={author.name} /></div>
          <div className="question-detail">
            <h4>Results:</h4>
            <div className={voteData.optionOne.classes}>
              <p>You would rather {question.optionOne.text}</p>
              <div className="answer-guage-wrapper">
                <div className="answer-guage" style={{'width' : voteData.optionOne.percent}}>
                  <p>{voteData.optionOne.percent}</p>
                </div>
              </div>
              <div className="answer-count">
                <p>{voteData.optionOne.count} out of {voteData.totalVotes} votes</p>
              </div>
            </div>
            <div className={voteData.optionTwo.classes}>
              <p>You would rather {question.optionTwo.text}</p>
              <div className="answer-guage-wrapper">
                <div className="answer-guage" style={{'width' : voteData.optionTwo.percent}}>
                  <p>{voteData.optionTwo.percent}</p>
                </div>
              </div>
              <div className="answer-count">
                <p>{voteData.optionTwo.count} out of {voteData.totalVotes} votes</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // If the question has not been answered return the form to answer the poll question
    return (
      <div className="question">
        <div className="question-title"><h2>{author.name} asks:</h2></div>
        <div className="question-avatar"><img src={author.avatarURL} alt={author.name} /></div>
        <div className="question-detail">
          <h3>Would you rather...</h3>
          <form className="question-form" onSubmit={answerSubmit}>
            <div className="input-wrapper">
              <input value="optionOne" type="radio" name="answer" id="optionOne" />
              <label htmlFor="optionOne">{question.optionOne.text}</label>
            </div>
            <p>or</p>
            <div className="input-wrapper">
              <input value="optionTwo" type="radio" name="answer" id="optionTwo" />
              <label htmlFor="optionTwo">{question.optionTwo.text}</label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );

  }
}

// Connect the poll question component to the redux store
const ConnectedPollQuestion = connect((state) => ({
  session: state.session,
  users: state.users,
  questions: state.questions
}))(PollQuestion)

// Use a functional component to pass the useParams() to the connected component
function Poll() {
  const { id } = useParams();

  return (
    <div className="poll-question-wrapper">
      <ConnectedPollQuestion id={id} />
    </div>
  )
}

export default Poll;