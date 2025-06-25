
export async function onclickprompt(gameId: string, prompt: string): Promise<string| null> {
    try {
    const response = await fetch("http://localhost:8000/api/prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({game_id: gameId, prompt}),
    });

    if (!response.ok) {
      throw new Error("no response from server");
    }

    const data = (await response.json());
    return data.message;
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  };

}

//game helper functions

export async function startNewGame(): Promise<{ gameId: string; guessesLeft: number; message: string } | null> {
    try {
        const response = await fetch("http://localhost:8000/api/new-game", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Failed to start new game");
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Error starting new game:", err);
        return null;
    }
}

export async function makeguess(gameId: string, guess:string){
  try{
    const response = await fetch("http://localhost:8000/api/guessmade",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({gameId, guess})
    });
    
    if(!response.ok){
      throw new Error("failed to register guess");

    }

    const data = await response.json();
    return data;
  }catch(err){
    console.error("Error registering guess", err);
    return null;
  }
}

export async function gamestat(gameId: string){
  try{
    const response = await fetch(`http://localhost:8000/api/game/${gameId}`);

    if(!response.ok){
      throw new Error("failed to get game");
    }

    const data = await response.json();
    return data;
  }catch(err){
    console.log("failed to get game", err);
    return null;
  }
}