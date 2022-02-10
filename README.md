# The "Would You Rather" App
The "Would You Rather?" is a web app that lets a user play the “Would You Rather?” game. The game goes like this: A user is asked a question in the form: “Would you rather [option A] or [option B] ?”. Answering "neither" or "both" is against the rules.

In the app, users will be able to answer questions, see which questions they haven’t answered, see how other people have voted, post questions, and see the ranking of users on the leaderboard.

## Install and run the application

In the project directory, you can run:

### `npm install`

Installes the required node modules allowing for the app to be run.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## App functionality

### Login / User Info / Session
The application uses a login box that appears at the root of the application, allowing the user to select a name from the list of existing users. Information about the logged in user appears in the top right of the site in the header section. If someone tries to navigate anywhere by entering the address in the address bar, the user is asked to sign in and then taken to the home screen, or the screen for the URL the user tried to access before logging in. The application allows the user to log out and log back in.

### Polls Questions
Once the user logs in, the user can toggle between his/her answered and unanswered polls on the home page, which is located at the root. The unanswered questions are shown by default. Each polling question links to the details of that poll. The details of each poll are available at `questions/:question_id`.

#### Poll / Question Screen
When a poll is clicked on the home page, the following is shown:

- Text “Would You Rather”
- Avatar of the user who posted the polling question
- Two options

For answered polls, each of the two options contains the following:

- Text of the option
- Number of people who voted for that option
- Percentage of people who voted for that option
- The option selected by the logged-in user

The application shows a 404 page if the user is trying to access a poll that does not exist.

#### Poll / Question Creation
The form for posting new polling questions is available at `/add`. The application has a form for creating two options. Upon submitting the form, a new poll is created.  The user id then taken to the home page, and the new polling question appears in the correct category on the home page.

### Leaderboard
The application has a leaderboard that’s available at `/leaderboard`. Each entry on the leaderboard contains the following:

- User’s name
- User’s picture
- Number of questions the user asked
- Number of questions the user answered
- User's total score

Users are ordered in descending order based on the sum of the number of questions they’ve asked and the number of questions they’ve answered.