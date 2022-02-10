// Import libraries
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * 404 Screen componenet **************************************************************
 */
class NotFound extends React.Component {

  render() {

    return (
      <div className="error-page-wrapper">
        <h1><span className="material-icons">error</span>Error 404</h1>
        <p>The requested page could not be found.</p>
        <Link to="/"><span className="material-icons">home</span> Home</Link>
      </div>
    )
  }
}

export default NotFound;