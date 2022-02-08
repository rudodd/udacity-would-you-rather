// Import libraries
import react from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';


// Import Components, etc...
import '../dist/css/app.css';
import LoginForm from './LoginForm'
import Header from './Header';
import Home from './Home';
import Poll from './Poll';
import Question from './Question';
import Leaders from './Leaders';

// Import actions
import getDataHandler from '../actions/data';

const ConnectedQuestion = connect((state) => ({
  session: state.session,
  users: state.users,
  questions: state.questions
}))(Question);

const ConnectedLeaders = connect((state) => ({
  users: state.users,
}))(Leaders);

class App extends react.Component {

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch(getDataHandler())
  }

  render() {

    if (this.props.loading) {
      return (
        <h1>Loading...</h1>
      )
    }

    if (!this.props.session.loggedIn) {
      return (
        <LoginForm store={this.props} />
      )
    }

    return (
      <BrowserRouter>
        <div className="app-wrapper">
          <Header store={this.props} />
          <Routes>
            <Route path="/" element={<Home store={this.props} />} />
            <Route exact path="/poll/:id" element={<Poll />} />
            <Route exact path="/question" element={<ConnectedQuestion />} />
            <Route exact path="/leaders" element={<ConnectedLeaders />} />
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
