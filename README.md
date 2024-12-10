# Frontend - Online Learning Platform

This is the frontend part of the Online Learning Platform. It is built with React and provides a user interface for students and instructors to interact with courses, lessons, and other platform features.

## Technologies Used

- **React** - Frontend framework for building interactive user interfaces
- **React Router** - For navigation between different pages
- **Axios** - For making HTTP requests to the backend API
- **CSS** (or SCSS) - For styling the application
- **JWT** - For user authentication and maintaining session
- **React Context API / State Management** (Optional)

## Setup and Installation

### Prerequisites

- Node.js (v16 or later)
- npm or yarn (npm is recommended)

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/Omar-Wael/online-learning-platform-frontend.git
    ```

2. Install the dependencies:
    ```bash
    cd online-learning-platform-frontend
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```
    REACT_APP_API_URL=<your_backend_api_url>
    ```

4. Run the development server:
    ```bash
    npm start
    ```

5. Open the application in your browser: `http://localhost:3000`.

### Available Routes

- `/` - Home page displaying available courses.
- `/courses/:id` - Detailed view of a course.
- `/courses/:id/lessons/:lessonId` - Detailed view of a lesson.
- `/login` - User login page.
- `/register` - User registration page (if applicable).

## Features

- **Student:** 
  - View list of courses
  - Enroll in courses
  - View lessons and supporting materials
  
- **Instructor:** 
  - Create, edit, and delete courses
  - Create, edit, and delete lessons within courses
  
## Authentication

- User authentication is handled using JWT.
- Store JWT token in `localStorage` after login.
  
## Deployment

You can deploy the app on any static hosting platform (Netlify, Vercel, GitHub Pages).
