import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import countries from "../../countries.json"

//random country generator
export function randcount(){
    const randomi = Math.floor(Math.random() * countries.length);
    return countries[randomi].name;
}

//generate random country
const country = randcount();


//setting up the app
dotenv.config();

const port = 8000;
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const key = process.env.OpenAi_apikey;


const ai = new OpenAI({
    apiKey: key
})


export async function onclickprompt(question: string) {
    app.post("/api/prompt", async(req, res) => {
    const {prompt} = req.body;
    
    try{
    const response = await ai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
       {
      "role": "system",
      "content": [
        {
          "type": "text",
          "text": "`You are given two words to answer with those being yes or no you may not respond with any other words. The questions you answer are based on the country: ${country} flag. Only answer questions related to the flag. If the question does not relate to the country flag respond with: \"this question does not pertain to the country's flag.`"
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
                "text" : `${question}`
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
    }
    )}
    catch(err){
        res.status(500).send(err);
    }
    })

}
app.listen(port, () => console.log(`Backend is running on ${port}`));