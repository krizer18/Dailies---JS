import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { onclickprompt } from "./backend/gpt";





export function App(){
    const [question, setquestion] = useState("");
    const [ans, setans] = useState("");

    return ( <div className="countPk">

        <textarea onChange = {(e) => setquestion(e.target.value)} className="form-control" placeholder="place your question here"></textarea>

        <div>
            <button onClick = {async () => { setans(await onclickprompt(question));}}type= "button" className="btn btn-success">
                submit question
            </button>
        </div>
        <div className="box">The answer to the question is: ${ans}</div>
    </div>
    

    )
}