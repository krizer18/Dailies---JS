<<<<<<< HEAD
import express from "express";
=======
import express, { Request, Response } from "express";
>>>>>>> cf38ded306c5dd1d5aa837ad97c4fe626064a590
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import countries from "../../countries.json"
<<<<<<< HEAD
import {v4 as uuid4} from 'uuid';

=======
>>>>>>> cf38ded306c5dd1d5aa837ad97c4fe626064a590

//random country generator
export function randcount(){
    const randomi = Math.floor(Math.random() * countries.length);
    return countries[randomi].name;
}

<<<<<<< HEAD
=======
//generate random country
export const country = randcount();

>>>>>>> cf38ded306c5dd1d5aa837ad97c4fe626064a590
//setting up the app
dotenv.config();

const port = 8000;
const app = express();

<<<<<<< HEAD
=======

>>>>>>> cf38ded306c5dd1d5aa837ad97c4fe626064a590
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

<<<<<<< HEAD
//game session
interface GameSession {
    country: string;
    guessesLeft: number;
    isGameOver: boolean;
    isWon: boolean;
    guessHistory: string[];
}

const gameSessions: Map<string, GameSession> = new Map();


app.post("/api/new-game", async(_req, res) =>{
  const game_id = uuid4();
  const country = randcount();
  const game_session: GameSession = {
    country: country,
    guessesLeft: 5, 
    isGameOver: false,
    isWon: false,
    guessHistory: []
  }

  gameSessions.set(game_id, game_session);

   res.json({ 
        game_id, 
        guessesLeft: game_session.guessesLeft,
        message: "New game started. Yes or No questions only!"
    });
});


app.post("/api/guessmade", async(req, res) => {
  const {game_id, guess} = req.body;

  try{
  if (!game_id || !guess) {
      res.status(400).json({ error: "game_id or guess is missing" });
      return;
    }

  const game_session = gameSessions.get(game_id);

  if(!game_session){
    res.status(400).json({error: "game session does not exist"});
    return;
  }

  if(game_session.isGameOver){
    res.status(400).json({error: "game session is already over"});
    return;
  }

  const guess_mod = guess.toLowerCase().trim();
  const country_mod = game_session.country.toLowerCase().trim();

  if(guess_mod === country_mod){
    game_session.isGameOver = true;
    game_session.isWon = true;
    game_session.guessHistory.push(`GUESS: ${guess} was correct`);
    res.json({
            correct: true,
            isWon: true,
            isGameOver: true,
            guessesLeft: game_session.guessesLeft,
            country: game_session.country,
            message: `Big ups. The country was guessed correctly!`,
            guessHistory: game_session.guessHistory
        });
    return;
  }

  game_session.guessesLeft --;
  game_session.guessHistory.push("guess was incorrect");

  if(game_session.guessesLeft <= 0){
    game_session.isGameOver = true;
    game_session.isWon = false;
    game_session.guessHistory.push("game has ended without finding right country");

    res.json({
      correct: false,
            isWon: false,
            isGameOver: true,
            guessesLeft: 0,
            country: game_session.country,
            message: `Game Over! the answer was: ${game_session.country}`,
            guessHistory: game_session.guessHistory
    });
    return;
  }

  res.json({
        correct: false,
        isWon: false,
        isGameOver: false,
        guessesLeft: game_session.guessesLeft,
        message: `wrong! You have ${game_session.guessesLeft} guesses left.`,
        guessHistory: game_session.guessHistory
    });
  }catch(err){
    res.status(500).send(err);
  }
});


const key = process.env.OpenAi_apikey;

=======
app.get("/api/country", (_req: Request, res: Response) => {
  res.json({ country });
});

const key = process.env.OpenAi_apikey;


>>>>>>> cf38ded306c5dd1d5aa837ad97c4fe626064a590
const ai = new OpenAI({
    apiKey: key
})

<<<<<<< HEAD
app.post("/api/prompt", async(req, res) => {
const {game_id, prompt} = req.body;
try {
const response = await ai.chat.completions.create({
model: "gpt-3.5-turbo",
messages: [
    {
  "role": "system",
  "content": [
    {
      "type": "text",
      "text": `You are given two words to answer with those being yes or no you may not respond with any other words. The questions you answer are based on the country: ${gameSessions.get(game_id)?.country} flag. Only answer questions related to the flag. If the question does not relate to the country flag respond with: this question does not pertain to the country's flag.`
    }
]
},
  {
    "role" : "assistant",
    "content" : [
        {
            "type" : "text",
            "text" : `${gameSessions.get(game_id)?.country}`
        }
    ]
  },
  {
    "role" : "user",
    "content" : [
        {
            "type" : "text",
            "text" : `${prompt}`
        }
    ]
  }
],
response_format: {
    "type": "text"
},
temperature: 1,
max_completion_tokens: 2048,
top_p: 1,
frequency_penalty: 0,
presence_penalty: 0
})
const reply = response.choices[0].message.content;
res.json({ message: reply });
return;
}
catch(err){
  res.status(500).send(err);
}
})
=======
 app.post("/api/prompt", async(req, res) => {
    const {prompt} = req.body;
    
    try {
    const response = await ai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
       {
      "role": "system",
      "content": [
        {
          "type": "text",
          "text": `You are given two words to answer with those being yes or no you may not respond with any other words. The questions you answer are based on the country: ${country} flag. Only answer questions related to the flag. If the question does not relate to the country flag respond with: this question does not pertain to the country's flag.`
        }
    ]
    },
      {
        "role" : "assistant",
        "content" : [
            {
                "type" : "text",
                "text" : `${country}`
            }
        ]
      },
      {
        "role" : "user",
        "content" : [
            {
                "type" : "text",
                "text" : `${prompt}`
            }
        ]
      }
    ],
    response_format: {
        "type": "text"
    },
    temperature: 1,
    max_completion_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
    })
    const reply = response.choices[0].message.content;
    res.json({ message: reply });
    return;
    }
    catch(err){
        res.status(500).send(err);
    }
    })
>>>>>>> cf38ded306c5dd1d5aa837ad97c4fe626064a590

app.listen(port, () => console.log(`Backend is running on ${port}`));
