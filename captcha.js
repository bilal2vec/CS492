function addCaptcha(prefix, target, images) {
    const captchaGrid = document.getElementById(prefix + "captcha");
    const submitButton = document.getElementById(prefix + "captcha-submit");
    const scoreDisplay = document.getElementById(prefix + "captcha-score");
    const resetButton = document.getElementById(prefix + "captcha-reset");
    const startButton = document.getElementById(prefix + "captcha-start");
    const timer = document.getElementById(prefix + "timer");
    const average = document.getElementById(prefix + "average");

    let gameActive = true;
    let totalTime = 0;
    let numAttempts = 0;
    let timerValue = 0;
    let timerInterval;

    initializeGame();
    submitButton.disabled = true;

    startButton.addEventListener("click", () => {
        startButton.disabled = true;
        submitButton.disabled = false;
        timerInterval = setInterval(setTimer, 1000);
    });

    submitButton.addEventListener("click", () => {
        const images = captchaGrid.getElementsByTagName("img");
        const selectedImages = captchaGrid.querySelectorAll(".selected");

        let total = 0;
        let correct = 0;
        let incorrect = 0;

        for (let i = 0; i < images.length; i++) {
            if (images[i].src.includes(target)) {
                total++;
            }
        }

        for (let i = 0; i < selectedImages.length; i++) {
            if (selectedImages[i].src.includes(target)) {
                correct++;
            } else {
                incorrect++;
            }
        }

        scoreDisplay.textContent = `Correct: ${correct}, Incorrect: ${incorrect}, Total: ${total}`;
        startButton.disabled = true;
        submitButton.disabled = true;
        resetButton.hidden = false;
        gameActive = false;
        clearInterval(timerInterval);
        numAttempts++;
        totalTime += timerValue;
        average.innerHTML = (totalTime / numAttempts).toFixed(2);
    });

    resetButton.addEventListener("click", () => {
        scoreDisplay.textContent = "";
        startButton.disabled = false;
        submitButton.disabled = true;
        resetButton.hidden = true;
        timerValue = 0;
        timer.innerHTML = timerValue;
        initializeGame();
    });

    function getRandomImages(images, count) {
        const shuffledImages = images.sort(() => 0.5 - Math.random());
        return shuffledImages.slice(0, count);
    }

    function initializeGame() {
        gameActive = true;

        captchaGrid.innerHTML = "";

        const randomImages = getRandomImages(images, 9);

        randomImages.forEach((src) => {
            const img = document.createElement("img");
            img.src = `images/${src}`;
            img.addEventListener("click", (event) => {
                if (gameActive) {
                    event.target.classList.toggle("selected");
                }
            });

            captchaGrid.appendChild(img);
        });
    }

    function setTimer() {
        ++timerValue;
        timer.innerHTML = timerValue;
    }
}

const images = [
    "bicycle_1.png",
    "bicycle_2.png",
    "bicycle_3.png",
    "bicycle_4.png",
    "bicycle_5.png",
    "bicycle_6.png",
    "chimney_1.png",
    "chimney_2.png",
    "chimney_3.png",
    "chimney_4.png",
    "chimney_5.png",
    "chimney_6.png",
    "crosswalk_1.png",
    "crosswalk_2.png",
    "crosswalk_3.png",
    "crosswalk_4.png",
    "crosswalk_5.png",
    "crosswalk_6.png",
    "trafficlight_1.png",
    "trafficlight_2.png",
    "trafficlight_3.png",
    "trafficlight_4.png",
    "trafficlight_5.png",
    "trafficlight_6.png",
];

const vision_loss_images = [
    "blurry_bicycle_1.png",
    "blurry_bicycle_2.png",
    "blurry_bicycle_3.png",
    "blurry_bicycle_4.png",
    "blurry_bicycle_5.png",
    "blurry_bicycle_6.png",
    "blurry_chimney_1.png",
    "blurry_chimney_2.png",
    "blurry_chimney_3.png",
    "blurry_chimney_4.png",
    "blurry_chimney_5.png",
    "blurry_chimney_6.png",
    "blurry_crosswalk_1.png",
    "blurry_crosswalk_2.png",
    "blurry_crosswalk_3.png",
    "blurry_crosswalk_4.png",
    "blurry_crosswalk_5.png",
    "blurry_crosswalk_6.png",
    "blurry_trafficlight_1.png",
    "blurry_trafficlight_2.png",
    "blurry_trafficlight_3.png",
    "blurry_trafficlight_4.png",
    "blurry_trafficlight_5.png",
    "blurry_trafficlight_6.png",
];

const color_blindness_images = [
    "color_chimney_1.png",
    "color_chimney_2.png",
    "color_chimney_3.png",
    "color_crosswalk_1.png",
    "color_crosswalk_2.png",
    "color_crosswalk_3.png",
    "color_trafficlight_green_1.png",
    "color_trafficlight_green_2.png",
    "color_trafficlight_green_3.png",
    "color_trafficlight_red_1.png",
    "color_trafficlight_red_2.png",
    "color_trafficlight_red_3.png",
];





addCaptcha("", "crosswalk", images); // Original captcha
addCaptcha("blurry_", "crosswalk", vision_loss_images); // Blurry captcha
addCaptcha("color_", "trafficlight_green", color_blindness_images); // Color blindness captcha
addCaptcha("dyslexia_", "crosswalk", images); // Dyslexia captcha
