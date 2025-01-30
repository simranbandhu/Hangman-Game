# Backend Hangman Game

This is a backend implementation of the Hangman game using JavaScript, Express, Socket.io, and MongoDB.

## Project Description

### Welcome & Basic Auth
- Allow simple user account creation with name, email and password.
- A very basic login mechanism (for testing purposes, full-featured authentication can be a bonus).

### Game Rooms: The Core of the Action
- A system where one player creates a game room with a unique ID.
- Enable other players to join the room using the ID.

### Classic Hangman with a Multiplayer Twist
- **Word Selection**: Player can type or generate word from the system
- **Guessing & Tracking**: Handle single letter guesses, track the hidden word state, and manage the number of incorrect guesses allowed.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [WebSocket](#websocket)

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd hangmangame
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a [.env](http://_vscodecontentref_/0) file in the root directory and add the following environment variables:
    ```env
    PORT=3000
    MONGODB_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    ```

## Usage

To start the development server, run:
```sh
npm run dev
```

## API Endpoints

- POST /auth/signup - Sign up a new user
    - Request Body:
    ```
    {
        "username": "example",
        "password": "password"
    }
    ```
![signup_player1](https://github.com/simranbandhu/Hangman-Game/blob/main/public/signup_player1.png)
![signup_player2](https://github.com/simranbandhu/Hangman-Game/blob/main/public/signup_player2.png)

- POST /auth/signup - Login
    - Request Body:
    ```
    {
        "username": "example",
        "password": "password"
    }
    ```
![login_player1](https://github.com/simranbandhu/Hangman-Game/blob/main/public/login_player1.png)
![login_player2](https://github.com/simranbandhu/Hangman-Game/blob/main/public/login_player2.png)

- POST /rooms/create-room - Create a new room
    - Request Body:
    ```
    {
        "roomName": "exampleRoom"
    }
    ```
![Create_Room](https://github.com/simranbandhu/Hangman-Game/blob/main/public/create_room.png)


- POST /games/create-game - Create a new game
    - Request Body:
    ```
    {
        "roomName": "exampleRoom"
    }
    ```
![Create_Game](https://github.com/simranbandhu/Hangman-Game/blob/main/public/create-game.png)


- POST /rooms/join-room - Join an existing room
    - Request Body:
    ```
    {
        "roomName": "exampleRoom"
    }
    ```
![Join_Room](https://github.com/simranbandhu/Hangman-Game/blob/main/public/join_room.png)

- POST /rooms/new-word - Set a new word for the game by user
    - Request Body:
    ```
    {
        "roomId": "roomId",
        "word": "example",
        "useRandomWord": false
    }
    ```
![New_Word_User](https://github.com/simranbandhu/Hangman-Game/blob/main/public/newWord_by_user.png)

- POST /rooms/new-word - Set a new word for the game by Random Generated function
    - Request Body:
    ```
    {
        "roomId": "roomId",
        "useRandomWord": true
    }
    ```
![New_Word_Random](https://github.com/simranbandhu/Hangman-Game/blob/main/public/newWord_by_Random.png)

- POST /rooms/guess-letter - Guess a letter in the game
    - Request Body:
    ```
    {
        "roomId": "roomId",
        "letter": "a"
    }
    ```
![Guess_Word1](https://github.com/simranbandhu/Hangman-Game/blob/main/public/guess_word1.png)

![Guess_Word2](https://github.com/simranbandhu/Hangman-Game/blob/main/public/guess_word2.png)


## WebSocket

The WebSocket server is used for real-time communication during the game. It is implemented in socket.js.