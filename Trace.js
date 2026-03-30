async function startPractice() {
    const topicInput = document.getElementById('topicInput');
    const ghostText = document.getElementById('ghostText');
    const userInput = document.getElementById('userInput');
    const topic = topicInput.value;

    if (!topic) {
        alert("Please enter a topic!");
        return;
    }

    // Processing status
    ghostText.innerText = "Generating paragraph, please wait...";
    userInput.value = "";

    const apiKey =  process.env.API_KEY; // api key 
    const url = "https://api.groq.com/openai/v1/chat/completions";

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                "model": "llama-3.3-70b-versatile",
                "messages": [{
                    "role": "user",
                    "content": "Write a very short essay (maximum 300 characters) about: " + topic
                }]
            })
        });

        const data = await response.json();

        if (data.choices && data.choices.length > 0) {
            let essay = data.choices[0].message.content;

            // --- Yahan text limit apply ho rahi hai ---
            const maxChars = 250;
            if (essay.length > maxChars) {
                essay = essay.substring(0, maxChars) + "...";
            }
            // ------------------------------------------

            ghostText.innerText = essay;
            userInput.focus();
        } else {
            ghostText.innerText = "Error: Could not generate essay.";
        }
    } catch (error) {
        ghostText.innerText = "Error: " + error.message;
    }
}

function clearTyping() {
    document.getElementById('userInput').value = "";
    document.getElementById('ghostText').innerText = "start typing here";
    document.getElementById('topicInput').value = "";
}


























