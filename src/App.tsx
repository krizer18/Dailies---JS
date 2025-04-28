import { useState } from "react";
import countries from "../countries.json"
import 'bootstrap/dist/css/bootstrap.min.css';


function randcount(){
    const randomi = Math.floor(Math.random() * countries.length);
    return countries[randomi];
}



export function onclickprompt(){
    console.log("calling the api")
}



export function App(){
    const [country, setCountry] = useState(() => randcount());
    const [question, setquestion] = useState("");
    return ( <div className="countPk">

        <h1><strong>{country.name}</strong> and the code is {country.code} </h1>

        <textarea onChange = {(e) => setquestion(e.target.value)}className="form-control" placeholder="place your question here"></textarea>

        <div>
            <button onClick = {onclickprompt} type= "button" className="btn btn-success">
                submit question
            </button>
        </div>
    </div>
    

    )
}