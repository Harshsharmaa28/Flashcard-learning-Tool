# FlashCard Learning Tool

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Overview
## Homepage Where You can view and share FlashCard with Friends.
![Screenshot 2024-08-12 195421](https://github.com/user-attachments/assets/08165519-cc47-4f5f-acf6-2f0d7a77dabe)

## You Can save Your Fav. FlashCard and View them later.
![Screenshot 2024-08-12 195507](https://github.com/user-attachments/assets/b0695cad-3d3e-4aa4-ac3e-bee85d8a624a)

## Admin DashBoard Where you can Create , Edit and Delete Flashcards.
![Screenshot 2024-08-12 195601](https://github.com/user-attachments/assets/ae8ba4a8-ba83-4dde-8a1c-4ffdce29f9b1)


## Available Scripts

In the project directory, you can run the following commands:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.\
The page will reload when you make changes. You may also see any lint errors in the console.

### `npm run server`

Starts the backend server. Make sure to set up environment variables before running this command.

## Installation

To set up the FlashCard Learning Tool locally:

### Prerequisites

- Node.js installed on your machine.
- MySQL database set up with the required tables.

### Steps

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/flashcard-learning-tool.git
    cd flashcard-learning-tool
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

    ```env
    PORT=5000
    DATABASE_URL=mysql://username:password@host:port/database
    CORS_ORIGIN=http://localhost:3000
    ```

4. **Create the database schema:**

    Use the provided SQL script to create the necessary tables in your MySQL database.

    ```bash
    mysql -u username -p database_name < schema.sql
    ```

5. **Start the backend server:**

    ```bash
    npm run server
    ```

6. **Start the frontend application:**

    ```bash
    npm start
    ```

7. **Access the application:**

   Open your browser and navigate to [https://flashcard-learning-tool-woad.vercel.app/](https://flashcard-learning-tool-woad.vercel.app/) to start using the FlashCard Learning Tool.
   ### Frontend Hosted on : vercel.com
   ### Backend Hosted on : render.com
