import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const port = 8000;
const app = express();

app.listen(port, () => console.log('Backend is running on ${port}'))

app.use(cors());
app.use(express.json());

const key = process.env.OpenAi_apikey;

export async function onclickprompt(){
    const api_body = {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer" + key
        }
    }

    await fetch("https://api.openai.com/v1/responses")
}