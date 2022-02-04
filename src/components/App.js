// Import libraries
import react from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';


// Import Components, etc...
import '../dist/css/app.css';
import Home from './home';
import Question from './question';
import Leaders from './leaders';
import Header from './header';

class App extends react.Component {

  componentDidMount () {
    
  }

  render() {

    if (this.props.loading) {
      return (
        <h1>Loading...</h1>
      )
    }

    return (
      <BrowserRouter>
        <div className="app-wrapper">
          <Header />
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
