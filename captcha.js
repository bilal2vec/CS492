function addCaptcha(prefix, target, images) {
    const captchaGrid = document.getElementById(prefix + "captcha");
    const startButton = document.getElementById(prefix + "captcha-start");
    const submitButton = document.getElementById(prefix + "captcha-submit");
    const timerDisplay = document.getElementById(prefix + "captcha-timer");
    const scoreDisplay = document.getElementById(prefix + "captcha-score");
    const resetButton = document.getElementById(prefix + "captcha-reset");

    let gameActive = true;
	let timer;
	let timerActive = false;
    let timeElapsed = 0;

    initializeGame();

    function updateTimerDisplay() {
        const minutes = Math.floor(timeElapsed / 60);
        const seconds = timeElapsed % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    startButton.addEventListener("click", () => {
        initializeGame(init_event_listeners = true);
        startButton.hidden = true;
        updateTimerDisplay();

        time_elapsed = 0;
        timerDisplay.hidden = false;
        updateTimerDisplay();

		if (!timerActive) {
			console.log("reactive")
			timer = setInterval(() => {
				timeElapsed++;
				updateTimerDisplay();
			}, 1000);
		}
		timerActive = true;

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

		scoreDisplay.textContent = `${correct}/${total} Correct, ${incorrect} Incorrect`;
		if (correct == total && incorrect == 0) {
			console.log("valid");
			clearInterval(timer);
			timerActive = false;
		}
        submitButton.disabled = true;
        submitButton.hidden = true;
        resetButton.hidden = false;
        gameActive = false;
    });

    resetButton.addEventListener("click", () => {
        initializeGame();
        scoreDisplay.textContent = "";
        startButton.disabled = false;
        startButton.hidden = false;
        resetButton.hidden = true;
        timerDisplay.hidden = true;
        updateTimerDisplay();
    });

	function getRandomImages(images, count) {
		const shuffledImages = images.sort(() => 0.5 - Math.random());
		for (var i = 0; i < shuffledImages.length; i++) {
			console.log(shuffledImages[i]);
		}
        return shuffledImages.slice(0, count);
    }

    function initializeGame(init_event_listeners = false) {
        gameActive = true;

        captchaGrid.innerHTML = "";

        const randomImages = getRandomImages(images, 9);

        randomImages.forEach((src) => {
            const img = document.createElement("img");
            img.src = `images/${src}`;

            if (init_event_listeners) {
                img.addEventListener("click", (event) => {
                    if (gameActive) {
                        event.target.classList.toggle("selected");
                    }
                });
                submitButton.disabled = false;
                submitButton.hidden = false;
            }

            captchaGrid.appendChild(img);
        });

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
  "blurry_chimney_1.png",
  "blurry_chimney_2.png",
  "blurry_car_7.png",
  "blurry_car_8.png",
  "blurry_car_9.png",
  "blurry_car_10.png",
  "blurry_bicycle_1.png",
  "blurry_bicycle_2.png",
  "blurry_bicycle_3.png",
  "blurry_car_1.png",
  "blurry_car_2.png",
  "blurry_car_3.png",
  "blurry_car_4.png",
  "blurry_car_5.png",
  "blurry_bicycle_4.png",
  "blurry_bicycle_5.png",
  "blurry_bicycle_6.png",
  "blurry_chimney_3.png",
  "blurry_chimney_4.png",
  "blurry_chimney_5.png",
  "blurry_chimney_6.png",
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
  "color_trafficlight_red_4.png",
  "color_trafficlight_red_5.png",
  "color_trafficlight_red_6.png",
  "color_trafficlight_red_7.png",
];

const diabetes_images = [
  "diabetes_bicycle_1.png",
  "diabetes_bicycle_2.png",
  "diabetes_bicycle_3.png",
  "diabetes_bicycle_4.png",
  "diabetes_bicycle_5.png",
  "diabetes_bicycle_6.png",
  "diabetes_bus_1.png",
  "diabetes_bus_2.png",
  "diabetes_bus_3.png",
  "diabetes_bus_4.png",
  "diabetes_bus_5.png",
  "diabetes_bus_6.png",
  "diabetes_car_1.png",
  "diabetes_car_2.png",
  "diabetes_car_3.png",
  "diabetes_car_4.png",
  "diabetes_car_5.png",
  "diabetes_car_6.png",
  "diabetes_motorcycle_1.png",
  "diabetes_motorcycle_2.png",
  "diabetes_motorcycle_3.png",
  "diabetes_motorcycle_4.png",
  "diabetes_motorcycle_5.png",
  "diabetes_motorcycle_6.png",
  "diabetes_motorcycle_7.png",
  "diabetes_motorcycle_8.png",
  "diabetes_motorcycle_9.png",
  "diabetes_motorcycle_10.png",
  "diabetes_motorcycle_11.png",
];

addCaptcha("", "crosswalk", images); // Original captcha
addCaptcha("blurry_", "car", vision_loss_images); // Blurry captcha
addCaptcha("color_", "trafficlight_green", color_blindness_images); // Color blindness captcha
addCaptcha("diabetes_", "bicycle", diabetes_images); // Diabetic Retinopathy captcha
addCaptcha("dyslexia_", "crosswalk", images); // Dyslexia captcha
