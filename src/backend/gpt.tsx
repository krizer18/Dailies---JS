export async function onclickprompt(question: string): Promise<string| null> {
    try {
    const response = await fetch("http://localhost:8000/api/prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: question }),
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