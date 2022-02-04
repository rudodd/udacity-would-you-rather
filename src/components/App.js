// Import libraries
import react from 'react';
import { Link, Route, Routes} from 'react-router-dom';
import * as Redux from 'redux';
import * as ReduxThunk from 'redux-thunk';
import * as Data from '../_DATA.js';

// Import actions
import initialDataHandler from '../actions/data';

// Import reducers
import loading from '../reducers/loading';

// Import Components, etc...
import '../dist/css/app.css';
import Home from './home';
import Question from './question';
import Leaders from './leaders';
import Header from './header';

// Actions


// Reducers


// Middleware
const logger = (store) => (next) => (action) => {
  console.group(action.type)
    console.log('The action: ', action)
    const result = next(action)
    console.log('The new state: ', store.getState())
  console.groupEnd()
  return result
}

class App extends react.Component {

  componentDidMount () {
    const store = Redux.createStore(Redux.combineReducers({
      loading,
    }), Redux.applyMiddleware(ReduxThunk.default, logger));
    store.dispatch(initialDataHandler());
    store.subscribe(() => this.forceUpdate());
  }

  render() {

    if (loading === false) {
      console.log(this.store);
    }

    return (
      <div className="app-wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/question" element={<Question />} />
          <Route exact path="/leaders" element={<Leaders />} />
        </Routes>
      </div>
    )
  }
}

export default App;
