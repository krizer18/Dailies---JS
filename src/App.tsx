import countries from "../countries.json"

function randcount(){
    const randomi = Math.floor(Math.random() * countries.length);
    return countries[randomi];
}



export function App(){
    const country = randcount();
    return ( <div className="countPk">
        <h1><strong>{country.name}</strong> and the code is {country.code} </h1>
        <textarea placeholder="place your question here"
        cols = {10} rows={50}></textarea>
        <div></div>
    </div>
    

    )
}