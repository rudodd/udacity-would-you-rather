import React from 'react';
import { Link } from 'react-router-dom';

class HomeQuestion extends React.Component {

  render() {
    const { store, question } = this.props;
    const author = store.users[question.author];

    return (
      <div className="home-question">
        <div className="home-question-title"><h2>{author.name} asks:</h2></div>
        <div className="home-question-avatar"><img src={author.avatarURL} alt={author.name} /></div>
        <div className="home-question-detail">
          <h3>Would you rather</h3>
          <p>{question.optionOne.text}</p>
          <p>or</p>
          <p>{question.optionTwo.text}</p>
          <Link to={`/poll/${question.id}`}>View Poll</Link>
        </div>
      </div>
    )
  }
}

class HomeQuestionContainer extends React.Component {

  render() {

    return (
      <div className="home-question-wrapper">
        {this.props.questions.map((question, index)=> <HomeQuestion key={index} store={this.props.store} question={question} />)}
      </div>
    )
  }
}

class Home extends React.Component {

  state = {
    tab: 'unanswered'
  }

  render() {

    const toggleQuestions = (tab)=> {
      this.setState(
        {
          tab: tab
        }
      )
    }

    const { store } = this.props;
    let answeredQuestions = Object.entries(store.users[store.session.user].answers).map((answer)=> {
      const answerId = answer[0];
      return store.questions[answerId];
    });
    let unAnsweredQuestions = Object.entries(store.questions).filter((question)=> {
      const questionId = question[0];
      let matches = Object.entries(store.users[store.session.user].answers).filter((answer)=> {
        return questionId === answer[0];
      });
      return !matches.length;
    }).map((question)=> question[1]);

    return(
      <div className="home-wrapper">
        <div className="home-tabs">
          <button onClick={()=> toggleQuestions('unanswered')}>Unanswered Questions</button>
          <button onClick={()=> toggleQuestions('answered')}>Answered Questions</button>
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
