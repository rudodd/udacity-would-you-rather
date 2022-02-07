import react from 'react';

class Question extends react.Component {

  render() {
    const { store } = this.props;
    console.log(store);

    return (
      <div className="new-question-wrapper"></div>
    )
  }
};

export default Question;
