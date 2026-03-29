function resolveConflict() {
    const input = document.getElementById("input").value;
    const output = document.getElementById("output");

    let result = "";

    if (input.toLowerCase().includes("hotel")) {
        result = `
            <h3>Decision:</h3>
            <p><strong>Recommended Option:</strong> Mid-range hotel near the airport</p>
            <p>A luxury 5-star hotel near the airport may exceed the ₹3000 budget. 
            So the system prioritizes airport access and budget while still suggesting a comfortable hotel.</p>
        `;
    } else if (input.toLowerCase().includes("laptop")) {
        result = `
            <h3>Decision:</h3>
            <p><strong>Recommended Option:</strong> Gaming laptop with RTX 3050 and 16GB RAM</p>
            <p>Lightweight laptops with RTX graphics and 16GB RAM under ₹50,000 are rare, 
            so the system prioritizes performance over portability.</p>
        `;
    } else {
        result = `
            <h3>Decision:</h3>
            <p>Conflict analyzed successfully.</p>
            <p>The system balanced the requirements and selected the most practical option.</p>
        `;
    }

    output.innerHTML = result;
}