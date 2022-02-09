// Import libraries
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Home screen individual question componenet **************************************************************
 */
class HomeQuestion extends React.Component {

  render() {
    const { store, question } = this.props;
    const author = store.users[question.author];

    return (
      <div className="question">
        <div className="question-title"><h2>{author.name} asks:</h2></div>
        <div className="question-avatar"><img src={author.avatarURL} alt={author.name} /></div>
        <div className="question-detail">
          <h3>Would you rather...</h3>
          <p>{question.optionOne.text}</p>
          <p>or</p>
          <p>{question.optionTwo.text}</p>
          <Link to={`/question/${question.id}`}>View Poll</Link>
        </div>
      </div>
    )
  }
}

/**
 * Home screen questions componenet **************************************************************
 */
class HomeQuestionContainer extends React.Component {

  render() {

    return (
      <div className="home-question-wrapper">
        {this.props.questions.map((question, index)=> <HomeQuestion key={index} store={this.props.store} question={question} />)}
      </div>
    )
  }
}

/**
 * Home screen main componenet **************************************************************
 */
class Home extends React.Component {

  // Set initial tab state for showing answer or unanswered questions
  state = {
    tab: 'unanswered'
  }

  render() {
    const { store } = this.props;

    // Create array of answered questions
    let answeredQuestions = Object.entries(store.users[store.session.user].answers).map((answer)=> store.questions[answer[0]]);

    // Create array of unanswered questions
    let unAnsweredQuestions = Object.entries(store.questions).filter((question)=> {
      let matches = Object.entries(store.users[store.session.user].answers).filter((answer)=> {
        return question[0] === answer[0];
      });
      return !matches.length;
    }).map((question)=> question[1]);

    // Method to toggle the displayed tab for answered and unanswered questions
    const toggleQuestions = (tab)=> { this.setState({tab: tab}) }

    return(
      <div className="home-wrapper">
        <div className="home-tabs">
          <button className={this.state.tab === 'unanswered' ? 'active' : 'inactive'} onClick={()=> toggleQuestions('unanswered')}>Unanswered Questions</button>
          <button className={this.state.tab === 'answered' ? 'active' : 'inactive'} onClick={()=> toggleQuestions('answered')}>Answered Questions</button>
        </div>
        {this.state.tab != 'answered'
          ? <HomeQuestionContainer store={store} questions={unAnsweredQuestions} />
          : <HomeQuestionContainer store={store} questions={answeredQuestions} />
        }
      </div>
    )
  }
};

export default Home;
