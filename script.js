async function resolveConflict() {
    const input = document.getElementById("input").value;
    const output = document.getElementById("output");

    output.innerHTML = `
        <h3>Decision:</h3>
        <p>Analyzing requirements using AI...</p>
    `;

    try {
        const response = await fetch("https://api.featherless.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer YOUR_API_KEY_HERE"
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are an AI conflict resolver. Analyze conflicting requirements and give the best balanced recommendation with a short explanation."
                    },
                    {
                        role: "user",
                        content: input
                    }
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();

        const aiReply = data.choices[0].message.content;

        output.innerHTML = `
            <h3>Decision:</h3>
            <p>${aiReply}</p>
        `;
    } catch (error) {
        output.innerHTML = `
            <h3>Error:</h3>
            <p>Failed to connect to AI service.</p>
        `;
        console.error(error);
    }
}