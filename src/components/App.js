import react from 'react';
import { Link, Route, Routes} from 'react-router-dom';
import Home from './home';
import Question from './question';
import Leaders from './leaders';
import Header from './header';

class App extends react.Component {

  render() {

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
