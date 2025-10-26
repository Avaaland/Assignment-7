console.log("script.js connected!");

// Track selections like, q1: rock, q2: pop
const selections = {};

// Toggle button highlight per question + store answer
const questionBlocks = document.querySelectorAll(".question-block");

questionBlocks.forEach((block) => {
    const buttons = block.querySelectorAll(".answer-btn");

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            // Remove highlight from all buttons in this block
            buttons.forEach((b) => b.classList.remove("selected"));

            // Add highlight to clicked
            btn.classList.add("selected");
            
            // Read data attributes
            const qid = btn.dataset.question;
            const category = btn.dataset.category;
            
            // Store selection
            selections[qid] = category;
            
            // Debugging
            console.log("Updated selections:", selections);
        });
    });
});

// Compute + display result
const showResultBtn = document.getElementById("show-result");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");

showResultBtn.addEventListener("click", displayResult);

function displayResult() {
    // Make sure all questions are answered
    const required = ["q1", "q2", "q3", "q4"];
    const missing = required.filter((q) => !selections[q]);
    if (missing.length > 0) {
        resultText.textContent = "Please answer all questions before viewing results.";
        resultContainer.style.display = "block";
        return;
    }

    // Tally categories ("most picked category" logic)
    const tally = { rock: 0, pop: 0, hiphop: 0, classical: 0 };
    Object.values(selections).forEach((cat) => {
        if (tally[cat] !== undefined) tally[cat] += 1;
    });

    // Determine the winner
    const pref = ["rock", "pop", "hiphop", "classical"];
    let winner = pref[0];
    let best = -1;

    pref.forEach((cat) => {
        if (tally[cat] > best) {
            best = tally[cat];
            winner = cat;
        }
    });

    // Messages by category
    const messages = {
        rock: {
            title: "You're ROCK!",
            blurb:
                "Bold, energetic, and unapologetically you. You thrive on intensity and big moments"
        },
        pop: {
            title: "You're POP!",
            blurb:
                "Upheat, social, and trend-savvy. You love good vibes and sharing them with others"
        },
        hiphop: {
            title: "You're HIPHOP!",
            blurb:
                "Creative, expressive, and confident. You turn ideas into rhythm and style"
        },
        classical: {
            title: "You're CLASSICAL!",
            blurb:
                "Calm, thoughtful, and precise. You value depth, focus, and timeless quality"
        }
    };

    const { title, blurb } = messages[winner];
    resultText.innerHTML = `<span class="fw-bold>${title}</span> ${blurb}`;

    // Reveal the result container
    resultContainer.style.display = "block";
}