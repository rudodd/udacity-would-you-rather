import React from 'react';

class Leader extends React.Component {

  render() {
    const {user, users } = this.props;
    const id = user['id'];

    return (
      <div className="leader-board-item">
        <div className="user-image">
          <img src={users[id].avatarURL} alt={users[id].name} />
        </div>
        <div className="user-details">
          <h2>{users[id].name}</h2>
          <p>Answered questions: {user['answerCount']}</p>
          <p>Answered questions: {user['questionCount']}</p>
        </div>
        <div className="user-score-wrapper">
          <div className="user-score">
            <div className="score-title">
              <h3>Score</h3>
            </div>
            <div className="score">
              <p>{user['totalCount']}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class Leaders extends React.Component {

  render() {
    const { users } = this.props;
    let usersArray = [];
    for (let user in users) {
      let userArray = [];
      userArray['id'] = user;
      userArray['answerCount'] = Object.keys(users[user].answers).length;
      userArray['questionCount'] = users[user].questions.length;
      userArray['totalCount'] = userArray['answerCount'] + userArray['questionCount'];
      usersArray.push(userArray);
    }
    usersArray.sort((a, b) => b['totalCount'] - a['totalCount']);

    return (
      <div className="leader-board-wrapper">
        {usersArray.map((user, index)=> <Leader key={index} users={users} user={user} />)}
      </div>
    )
  }
};

export default Leaders;