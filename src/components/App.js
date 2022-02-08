// Import libraries
import react from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
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
    .then(()=> {
      this.setState({
        redirect: this.props.sessionloggedIn && window.location.pathname != '/' ? false : true,
      })
    })
  }

  render() {

    if (this.props.loading) {
      return (
        <h1>Loading...</h1>
      )
    }

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
