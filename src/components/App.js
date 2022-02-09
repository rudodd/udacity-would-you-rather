// Import libraries
import React from 'react';
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
import NotFound from './NotFound';

// Import actions
import getDataHandler from '../actions/data';

// Connect components to the the redux state
//  - Poll component conected in poll component file for use with useParams()
const ConnectedQuestion = connect((state) => ({
  session: state.session,
  users: state.users,
  questions: state.questions
}))(Question);

const ConnectedLeaders = connect((state) => ({
  users: state.users,
}))(Leaders);

/**
 * Main app componenet **************************************************************
 */
class App extends React.Component {

  // Get initial data when component mounts
  componentDidMount () {
    const { dispatch } = this.props;
    dispatch(getDataHandler())
  }

  render() {

    // If we don't have initial data yet, show a loading icon
    if (this.props.loading) {
      return (
        <h1>Loading...</h1>
      )
    }

    // If not logged in show the login form component
    //  - wrapped in the <BrowserRouter> component to allow for the use of useNavigation for redirect after logging in
    if (!this.props.session.loggedIn) {
      return (
        <BrowserRouter>
          <LoginForm store={this.props} />
        </BrowserRouter>
      )
    }

    return (
      <BrowserRouter>
        <div className="app-wrapper">
          <Header store={this.props} />
          <Routes>
            <Route exact path="/" element={<Home store={this.props} />} />
            <Route exact path="/question/:id" element={<Poll />} />
            <Route exact path="/add" element={<ConnectedQuestion />} />
            <Route exact path="/leaderboard" element={<ConnectedLeaders />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
