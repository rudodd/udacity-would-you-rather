import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const calculateVotes = (id, users)=> {
  const optionOneVotes = Object.entries(users).filter((user)=> {
    let matches = Object.entries(user[1].answers).filter((answer)=> {
      return answer[0] === id && answer[1] === 'optionOne';
    });
    return matches.length ? matches : false;
  }).length;
  const optionTwoVotes = Object.entries(users).filter((user)=> {
    let matches = Object.entries(user[1].answers).filter((answer)=> {
      return answer[0] === id && answer[1] === 'optionTwo';
    });
    return matches.length ? matches : false;
  }).length;
  const totalVotes = optionOneVotes + optionTwoVotes;
  const optionOnePerent = (optionOneVotes / totalVotes) * 100;
  const optionTwoPercent = (optionTwoVotes / totalVotes) * 100;
  return {
    winner: optionOneVotes > optionTwoVotes ? 'optionOne' : 'optionTwo',
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

const getVoteData = (id, users, user)=> {
  let votes = calculateVotes(id, users);
  const optionOneVoteClassArray = ['poll-answer'];
  const optionTwoVoteClassArray = ['poll-answer'];
  if (user.answers[id] === 'optionOne') {
    optionOneVoteClassArray.push('user-choice');
  } else {
    optionTwoVoteClassArray.push('user-choice');
  }
  if (votes.winner === 'optionOne') {
    optionOneVoteClassArray.push('winner');
  } else {
    optionTwoVoteClassArray.push('winner');
  }
  const optionOneClasses = optionOneVoteClassArray.length ? optionOneVoteClassArray.join(' ') : '';
  const optionTwoClasses = optionTwoVoteClassArray.length ? optionTwoVoteClassArray.join(' ') : '';
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
      const voteData = getVoteData(id, users, user);
      return (
        <div className="poll-question">
          <h2>Results:</h2>
          <div className="poll-question-title"><h3>{author.name} asks:</h3></div>
          <div className="poll-question-avatar"><img src={author.avatarURL} alt={author.name} /></div>
          <div className="poll-question-detail">
            <h4>Would you rather</h4>
            <div className={voteData.optionOne.classes}>
              <p>{question.optionOne.text}</p>
              <div className="answer-guage-wrapper">
                <div className="answer-guage" style={{'width' : voteData.optionOne.percent}}>
                  {voteData.optionOne.percent}
                </div>
              </div>
              <div className="answer-count">
                <p>{voteData.optionOne.count} out of {voteData.totalVotes} votes</p>
              </div>
            </div>
            <p>or</p>
            <div className={voteData.optionTwo.classes}>
              <p>{question.optionTwo.text}</p>
              <div className="answer-guage-wrapper">
                <div className="answer-guage" style={{'width' : voteData.optionTwo.percent}}>
                  {voteData.optionTwo.percent}
                </div>
              </div>
              <div className="answer-count">
                <p>{voteData.optionTwo.count} out of {voteData.totalVotes} votes</p>
              </div>
            </div>
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