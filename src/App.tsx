import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { onclickprompt } from "./backend/gpt";

async function getCountry(): Promise<string> {
    try {
      const res = await fetch("http://localhost:8000/api/country");
      if (!res.ok) {
        throw new Error("Failed to fetch country");
      }
      const data = (await res.json()) as { country: string };
      return data.country;
    } catch (err) {
      console.error("Error fetching country:", err);
      return ""; // return empty string on failure
    }
  }

export function App(){
    const [question, setquestion] = useState("");
    const [ans, setans] = useState<string | null>(null);
    const [country, setCountry]   = useState<string>("");

    const handleSubmit = async () => {
    if(!country){
      const fetched = await getCountry();
      setCountry(fetched);
    }
    const responseText = await onclickprompt(question, country);
    setans(responseText);
    };

    return ( <div className="countPk">
        <textarea onChange = {(e) => setquestion(e.target.value)} className="form-control" placeholder="place your question here"></textarea>

        <div>
            <button onClick = {async () => {
                    handleSubmit();
                }}
                type= "button" className="btn btn-success">
                Submit Question 
            </button>
        </div>
        <div className="box">The answer to the question is: {ans}</div>

      <textarea onChange = {(e) => setquestion(e.target.value)} className="form-controlg" placeholder="place your guess here"></textarea>
      <div>
            <button onClick = {async () => {
                    _guessplaced()
                }}
                type= "button" className="btn btn-success">
                Submit Guess 
            </button>

        <div className="guessres">your guess was:</div>
        </div>
    </div>
        

    )
}