const jokecontainer = document.getElementById("joke");
const btn = document.getElementById("btn");
const categorySelect = document.getElementById("category");

// All categories for random mode
const categories = ["Programming","Misc","Dark","Pun","Spooky","Christmas"];

let getJoke = async () => {
    try {
        btn.disabled = true;
        jokecontainer.classList.add("fade");

        setTimeout(async () => {

            let selected = categorySelect.value;

            // 🎲 Random Mix logic
            if (selected === "random") {
                selected = categories[Math.floor(Math.random() * categories.length)];
            }

            const url = `https://v2.jokeapi.dev/joke/${selected}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`;

            const response = await fetch(url);
            const data = await response.json();

            let jokeText = "";

            // Handle both types
            if (data.type === "single") {
                jokeText = data.joke;
            } else {
                jokeText = `${data.setup} 🤔\n\n${data.delivery}`;
            }

            jokecontainer.textContent = jokeText;

            jokecontainer.classList.remove("fade");
            btn.disabled = false;

        }, 300);

    } catch (error) {
        jokecontainer.textContent = "Failed to load 😢";
        btn.disabled = false;
    }
};

// Events
btn.addEventListener("click", getJoke);
categorySelect.addEventListener("change", getJoke);

// Load first joke
getJoke();