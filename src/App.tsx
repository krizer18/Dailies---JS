import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { onclickprompt } from "./backend/gpt";

export function App() {

    interface GameState {
    game_id: string;
    guessesLeft: number;
    isGameOver: boolean;
    isWon: boolean;
    country?: string;
    guessHistory: string[];
    } 

    const [question, setQuestion] = useState("");
    const [countryGuess, setCountryGuess] = useState("");
    const [answer, setAnswer] = useState<string | null>(null);
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [gameMessage, setGameMessage] = useState<string>("");

    const startNewGame = async () => {
        setError(null);
        setAnswer(null);
        setGameMessage("");
        setQuestion("");
        setCountryGuess("");
        try {
        const response = await fetch("http://localhost:8000/api/new-game", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Failed to start new game");
        }
        const data = await response.json();
        setGameState({
          game_id: data.game_id,
                      guessesLeft: data.guessesLeft,
                      isGameOver: false,
                      isWon: false,
                      guessHistory: []
        })
        setGameMessage(data.message);
      } catch (err) {
          console.error("Error starting new game:", err);
          return null;
      };
    }

    const askQuestion = async () => {
        if (!question.trim() || !gameState) {
            setError("Please enter a question");
            return;
        }
        setError(null);
        const message = await onclickprompt(gameState.game_id, question);
        setAnswer(message);
        setQuestion("");
        setQuestion("");
    };

    const makeGuess = async () => {
        if (!countryGuess.trim() || !gameState) {
            setError("Please enter a country name");
            return;
        }
        setError(null);
        
        try {
            const response = await fetch("http://localhost:8000/api/guessmade", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    game_id: gameState.game_id,
                    guess: countryGuess 
                })
            });
            
            if (!response.ok) {
                const bodyText = await response.text();
                console.error("Guess API failed:", response.status, bodyText);
                setError(`Server ${response.status}: ${bodyText}`);
                return;
            }
            
            const data = await response.json();
            
            setGameState(prev => prev ? {
                ...prev,
                guessesLeft: data.guessesLeft,
                isGameOver: data.isGameOver,
                isWon: data.isWon,
                country: data.country,
                guessHistory: data.guessHistory || prev.guessHistory
            } : null);
            
            setGameMessage(data.message);
            setCountryGuess("");
            setAnswer(null);
            
        } catch (err) {
            setError("Failed to make guess " + err);
        }
    };

    useEffect(() => {
        startNewGame();
    }, []);

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="text-center mb-0"> GUESS THE FLAG!</h2>
                        </div>
                        <div className="card-body">
                            
                            {/* Game Status */}
                            {gameState && (
                                <div className="alert alert-info mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span><strong>Guesses Left:</strong> {gameState.guessesLeft}</span>
                                        <button 
                                            className="btn btn-sm btn-outline-primary" 
                                            onClick={startNewGame}
                                        >
                                            New Game
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Game Message */}
                            {gameMessage && (
                                <div className={`alert ${gameState?.isWon ? 'alert-success' : gameState?.isGameOver ? 'alert-danger' : 'alert-primary'}`}>
                                    {gameMessage}
                                </div>
                            )}

                            {/* Error Display */}
                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            {/* Game Over Display */}
                            {gameState?.isGameOver && (
                                <div className={`alert ${gameState.isWon ? 'alert-success' : 'alert-warning'}`}>
                                    <h4>{gameState.isWon ? '🎉 Congratulations!' : '😞 Game Over'}</h4>
                                    <p>The country was: <strong>{gameState.country}</strong></p>
                                    <button className="btn btn-primary" onClick={startNewGame}>
                                        Play Again
                                    </button>
                                </div>
                            )}

                            {/* Game Interface - only show if game is active */}
                            {gameState && !gameState.isGameOver && (
                                <>
                                    {/* Ask Questions Section */}
                                    <div className="mb-4">
                                        <h5>Ask about the flag:</h5>
                                        <div className="input-group mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="e.g., 'Does the flag have red color?'"
                                                value={question}
                                                onChange={(e) => setQuestion(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && askQuestion}
                                            />
                                            <button 
                                                className="btn btn-info" 
                                                type="button"
                                                onClick={askQuestion}
                                                disabled={!question.trim()}
                                            >
                                                Ask
                                            </button>
                                        </div>
                                        
                                        {answer && (
                                            <div className="alert alert-light">
                                                <strong>Answer:</strong> {answer}
                                            </div>
                                        )}
                                    </div>

                                    {/* Country Guess Section */}
                                    <div className="mb-4">
                                        <h5>Guess the country:</h5>
                                        <div className="input-group mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter country name"
                                                value={countryGuess}
                                                onChange={(e) => setCountryGuess(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && makeGuess()}
                                            />
                                            <button 
                                                className="btn btn-success" 
                                                type="button"
                                                onClick={makeGuess}
                                                disabled={!countryGuess.trim()}
                                            >
                                                Guess
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Guess History */}
                            {gameState?.guessHistory && gameState.guessHistory.length > 0 && (
                                <div className="mt-4">
                                    <h6>Guess History:</h6>
                                    <div className="list-group">
                                        {gameState.guessHistory.map((guess, index) => (
                                            <div key={index} className="list-group-item">
                                                <small>{guess}</small>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Game Instructions */}
                            <div className="mt-4 text-muted">
                                <small>
                                    <strong>How to play:</strong> Ask yes/no questions about the flag to gather clues, 
                                    then guess the country. You have 5 country guesses total. Questions don't count against your guesses!
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}