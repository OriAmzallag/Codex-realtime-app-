# Codex - Your Code Solution for COVID

Codex is an interactive platform designed to help teachers and students engage in real-time coding lessons. It features different coding challenges related to common JavaScript issues such as async function usage, callback execution in loops, and event handling.

## Features

- **Real-Time Code Editing:** Students can edit code in real-time, with changes being reflected instantly for all participants.
- **Role-Based Access:** Mentors have read-only access while students can modify the code.
- **Interactive Lessons:** Each lesson focuses on a specific coding challenge with an integrated code editor for hands-on practice.
- **Socket.IO Integration:** Real-time updates are facilitated using Socket.IO, ensuring seamless collaboration.

## Technologies Used

- **React:** Front-end framework for building the user interface.
- **Socket.IO:** For real-time communication between the client and server.
- **CodeMirror:** A versatile text editor implemented in JavaScript for the code editing interface.
- **React Router:** For navigation and routing within the app.
- **Express:** Backend framework to handle API requests and WebSocket connections.
- **Netlify:** For deployment of the front-end application.
- **Render:** For deployment of the back-end server.

## Installation

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/OriAmzallag/Codex.git
   cd Codex

   ```

2. **Install Dependencies:**

   npm install

3. **Set Up Environment Variables:**

   REACT_APP_BACKEND_URL=http://your-backend-url

4. **Run the Application:**

   npm start

## Project Structure

- **/components:** Contains all the React components for different cases.
- **/App.tsx:** Main application file with route definitions.
- **/index.tsx:** Entry point of the React application.

## Routes

1. **Navigate to the HomePage:**
   Access the main page where you can choose the coding challenge you want to work on

2. **Select a Code Block:**
   Click on any of the cases to start the lesson and access the code editor.

3. **Real-Time Collaboration:**
   As a student, edit the code and see changes in real-time. Mentors can observe the changes and provide guidance.

## Deployment

The project is deployed on Netlify for the front-end and Heroku for the back-end. You can access the live application in the URL: https://codex-realtime-app.netlify.app/

## Contributing

Feel free to fork the repository and submit pull requests. For major changes, please open an issue to discuss what you would like to change.

Happy coding!
