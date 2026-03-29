function resolveConflict() {
    const input = document.getElementById("input").value;
    const output = document.getElementById("output");

    if (input.includes("budget") && input.includes("luxury")) {
        output.innerHTML = `
            <h3>Decision:</h3>
            <p>Choose a mid-range option instead of a luxury one.</p>
            <h3>Reason:</h3>
            <p>Budget was prioritized over luxury.</p>
        `;
    } else {
        output.innerHTML = `
            <h3>Decision:</h3>
            <p>Conflict analyzed successfully.</p>
        `;
    }
}