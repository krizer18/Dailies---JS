🏴 Guess the Flag Game
A fun and interactive web-based guessing game where players ask yes/no questions about country flags to deduce which country they're trying to guess. Built with React, Node.js, and OpenAI's GPT API.
🎮 How to Play

Start a New Game: A random country is selected for you to guess
Ask Questions: Ask yes/no questions about the flag (e.g., "Does the flag have red color?", "Are there stars on the flag?")
Get AI Responses: The AI will answer your questions based on the selected country's flag
Make Your Guess: When you think you know the country, make your guess!
Win or Learn: You have 5 country guesses to get it right. Questions don't count against your guesses!

✨ Features

AI-Powered Responses: Uses OpenAI's GPT-3.5-turbo to answer flag-related questions
Session Management: Multiple games can be played simultaneously with unique game IDs
Guess Tracking: Keep track of your previous guesses and remaining attempts
Responsive Design: Clean Bootstrap-based UI that works on desktop and mobile
Real-time Feedback: Instant responses to questions and guess attempts

🛠️ Tech Stack
Frontend

React with TypeScript
Bootstrap for styling
Fetch API for HTTP requests

Backend

Node.js with Express
TypeScript
OpenAI API (GPT-3.5-turbo)
UUID for unique game session IDs
CORS enabled for cross-origin requests

📋 Prerequisites
Before running this application, make sure you have:

Node.js (v14 or higher)
npm or yarn
OpenAI API key

🚀 Installation & Setup
1. Clone the Repository
bashgit clone <your-repo-url>
cd guess-the-flag-game
2. Install Dependencies
Backend:
bashcd backend
npm install
Frontend:
bashcd frontend
npm install
3. Environment Configuration
Create a .env file in the backend directory:
envOpenAi_apikey=your_openai_api_key_here
4. Countries Data
Ensure you have a countries.json file in the backend directory with the following structure:
json[
  {
    "name": "United States",
    "code": "US"
  },
  {
    "name": "Canada",
    "code": "CA"
  }
]
5. Run the Application
Start the Backend Server:
bashcd backend
npm run dev
# Server will run on http://localhost:8000
Start the Frontend:
bashcd frontend
npm start
# App will run on http://localhost:3000
🔧 API Endpoints
POST /api/new-game

Description: Start a new game session
Response:
json{
  "game_id": "uuid",
  "guessesLeft": 5,
  "message": "New game started. Yes or No questions only!"
}


POST /api/prompt

Description: Ask a question about the flag
Body:
json{
  "game_id": "uuid",
  "prompt": "Does the flag have red color?"
}

Response:
json{
  "message": "Yes"
}


POST /api/guessmade

Description: Make a country guess
Body:
json{
  "game_id": "uuid",
  "guess": "United States"
}

Response:
json{
  "correct": true,
  "isWon": true,
  "isGameOver": true,
  "guessesLeft": 4,
  "country": "United States",
  "message": "Big ups. The country was guessed correctly!",
  "guessHistory": ["GUESS: United States was correct"]
}


📁 Project Structure
guess-the-flag-game/
├── frontend/
│   ├── src/
│   │   ├── App.tsx           # Main React component
│   │   └── backend/
│   │       └── gpt.ts        # API helper functions
│   └── package.json
├── backend/
│   ├── server.ts             # Express server
│   ├── countries.json        # Countries data
│   ├── .env                  # Environment variables
│   └── package.json
└── README.md
🎯 Game Rules

5 Country Guesses: You get exactly 5 attempts to guess the correct country
Unlimited Questions: Ask as many yes/no questions as you want about the flag
Flag-Related Only: Questions must be about the country's flag (colors, shapes, symbols, etc.)
Case Insensitive: Country guesses are not case-sensitive
Exact Match: Country names must match exactly (consider adding fuzzy matching in future updates)

🔮 Future Enhancements

 Fuzzy Matching: Allow partial or alternative country name matches
 Difficulty Levels: Easy (popular countries) vs Hard (obscure countries)
 Hint System: Provide hints after wrong guesses
 Leaderboard: Track best scores and fastest wins
 Flag Images: Show the actual flag after the game ends
 Multiplayer Mode: Compete with friends in real-time
 Category Filtering: Filter by continent, region, or flag complexity

🐛 Known Issues

Country names must match exactly (no fuzzy matching)
Limited error handling for network issues
No flag image display
Session cleanup not implemented (sessions persist in memory)

🤝 Contributing

Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
🙏 Acknowledgments

OpenAI for providing the GPT API
Bootstrap for the responsive UI components
All the flag enthusiasts who will enjoy this game!


Happy Flag Guessing! 🎉
