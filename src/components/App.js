// Import libraries
import react from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';


// Import Components, etc...
import '../dist/css/app.css';
import LoginForm from './LoginForm'
import Header from './Header';
import Home from './Home';
import Question from './Question';
import Leaders from './Leaders';

// Import actions
import getDataHandler from '../actions/data';

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
        <LoginForm users={this.props.users} dispatch={this.props.dispatch} />
      )
    }

    return (
      <BrowserRouter>
        <div className="app-wrapper">
          <Header store={this.props} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/question" element={<Question />} />
            <Route exact path="/leaders" element={<Leaders />} />
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
