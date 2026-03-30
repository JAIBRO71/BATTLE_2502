async function resolveConflict() {
    const input = document.getElementById("input").value;
    const output = document.getElementById("output");

    output.innerHTML = `
        <h3>Decision:</h3>
        <p>Analyzing requirements using AI...</p>
    `;

    try {
        const response = await fetch("/resolve", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                input: input
            })
        });

        const data = await response.json();

        output.innerHTML = `
            <h3>Decision:</h3>
            <p>${data.reply}</p>
        `;
    } catch (error) {
        output.innerHTML = `
            <h3>Error:</h3>
            <p>Could not connect to backend server.</p>
        `;
        console.error(error);
    }
}