(function () {
'use strict';

    // variables
    const availableProducts = {
        "10 Very Fair": {
            "Cool": ["Pink"],
            "Neutral": ["Neutral"],
            "Warm": ["Yellow"]
        },
        "20 Fair": {
            "Cool": ["Pink"],
            "Neutral": ["Neutral"],
            "Warm": ["Yellow"]
        },
        "30 Light": {
            "Cool": ["Pink", "Green"],
            "Neutral": ["Neutral"],
            "Warm": ["Yellow"]
        },
        "40 Light-Medium": {
            "Cool": ["Pink"],
            "Neutral": ["Neutral"],
            "Warm": ["Yellow", "Orange"]
        },
        "50 Medium": {
            "Cool": ["Pink", "Green"],
            "Neutral": ["Neutral"],
            "Warm": ["Yellow", "Orange"]
        },
        "60 Medium-Dark": {
            "Cool": ["Green"],
            "Neutral": ["Neutral"],
            "Warm": ["Yellow", "Orange", "Red"]
        },
        "70 Dark": {
            "Cool": ["Blue"],
            "Neutral": ["Neutral"],
            "Warm": ["Yellow", "Red"]
        },  
        "80 Deep": {
            "Cool": ["Green"],
            "Neutral": ["Neutral"],
            "Warm": ["Yellow", "Orange", "Red"]
        },
        "90 Ultra Deep": {
            "Cool": ["Blue"],
            "Neutral": ["Neutral"],
            "Warm": ["Orange", "Red"]
        }
    };

    const translationForProducts = {
        "10 Very Fair": ["Very Fair"],
        "20 Fair": ["Fair"],
        "30 Light": ["Light"],
        "40 Light-Medium": ["Light-Medium"],
        "50 Medium": ["Medium"],
        "60 Medium-Dark": ["Medium-Dark"],
        "70 Dark": ["Dark"],
        "80 Deep": ["Deep"],
        "90 Ultra Deep": ["Ultra Deep"],
        "Cool": ["Chłodna", "Chłodny", "Chłodnym"],
        "Neutral": ["Neutralna", "Neutralny", "Neutralnym"],
        "Warm": ["Ciepła", "Ciepły", "Ciepłym"],
        "Pink": ["Różowa", "Różowy", "Różowym"],
        "Blue": ["Niebieska", "Niebieski", "Niebieskim"],
        "Green": ["Oliwkowa", "Oliwkowy", "Oliwkowym"],
        "Yellow": ["Złota", "Złoty", "Złotym"],
        "Orange": ["Brzosk-winiowa", "Brzosk-winiowy", "Brzoskwiniowym"],
        "Red": ["Czerwona", "Czerwony", "Czerwonym"]
    };

    const imagePath = "./img/faces/";
    // variables END

    let state = {
        selected: {
            intensity: "",
            mastertone: "",
            undertone: ""
        },
        result: "",
        step: 1
    };

    function updateView(state, availableProducts, imagePath) {
        updateIntensity(state.selected.intensity);
        updateMastertone(state.selected.intensity, state.selected.mastertone, availableProducts);
        updateUndertone(state.selected.undertone);
        updateResult(state, imagePath);
    }

    function updateIntensity(intensity) {
        // update intensity submenu
        document.querySelector(".intensity-value").innerHTML = intensity;

        if (intensity) {
            document.querySelector(".mastertone").classList.add("active");

            setTimeout(() => {
                activateStep("2");
            }, 200);
        }
    }

    function updateMastertone(intensity, mastertone, availableUndertones) {
        // update mastertone submenu
        document.querySelector(".mastertone-value").innerHTML = mastertone;

        if (mastertone) {
            document.querySelector(".undertone").classList.add("active");
            showAvailableUndertones(mastertone);
            activateAvailableUndertones(intensity, mastertone, availableUndertones);
            setTimeout(() => {
                activateStep("3");
            }, 200);
        }
    }

    function updateUndertone(undertone) {
        // update mastertone submenu
        document.querySelector(".undertone-value").innerHTML = undertone;

        if (undertone) {
            document.querySelector(".result").classList.add("active");
            setTimeout(() => {
                activateStep("4");
            }, 200);
        }
    }

    function updateResult(state, imagePath) {
        if (state.selected.intensity && state.selected.mastertone && state.selected.undertone) {
            const intensity = state.selected.intensity;
            const mastertone = state.selected.mastertone;
            const undertone = state.selected.undertone;
            const shortenedResult = `${intensity.substring(0,2)}${mastertone.substring(0,1)}${undertone.substring(0,1)}`;

            const intensityTranslated = translate(intensity, translationForProducts);
            const mastertoneTranslated = translate(mastertone, translationForProducts);
            const undertoneTranslated = translate(undertone, translationForProducts);

            state.result = shortenedResult;

            // render result
            document.querySelector(".result-container").classList.remove(`c10`, `c20`, `c30`, `c40`, `c50`, `c60`, `c70`, `c80`, `c90`);
            document.querySelector(".result-container").classList.add(`c${shortenedResult.substring(0,2)}`);

            document.querySelector(".result-value").innerHTML = shortenedResult;
            document.querySelector(".result-code").innerHTML = shortenedResult;

            document.querySelector(".section-result .before-image").src = `${imagePath}${shortenedResult}-before.jpg`;
            document.querySelector(".section-result .after-image").src = `${imagePath}${shortenedResult}-after.jpg`;

            document.querySelector(".translate-intensity").innerHTML = `
                <strong>${intensityTranslated[0]}</strong><br/>
                <span>Intensywność odcienia</span>`;
            document.querySelector(".translate-mastertone").innerHTML = `
                <strong>${state.selected.mastertone}</strong><br/>
                <span>${mastertoneTranslated[0]}</span>
                <span>tonacja</span>`;
            document.querySelector(".translate-undertone").innerHTML = `
                <strong>${state.selected.undertone}</strong><br/>
                <span>${undertoneTranslated[1]}</span>
                <span>odcień</span>`;

            document.querySelector(".result-description").innerHTML = `
                ${intensityTranslated[0]} ${mastertoneTranslated[1]} o ${undertoneTranslated[2] } odcieniu`;

        }
    }

    function showAvailableUndertones(mastertone) {
        if (mastertone !== "") {
            const mastertoneToLowerCase = mastertone.toLowerCase();

            document.querySelectorAll(".section-undertone .selectors").forEach( (element) =>
                element.classList.remove("visible") );

            document.querySelector(`.selectors-${mastertoneToLowerCase}`).classList.add("visible");
        }
    }

    function activateAvailableUndertones(intensity, mastertone, availableTones) {
        const availableUndertones = getAvailableTones(intensity, mastertone, availableTones);

        document.querySelectorAll("[data-undertone]").forEach( (element) =>
            element.classList.remove("available") );

        if (availableUndertones) {
            availableUndertones.forEach( (element) => {
                document.querySelector(`[data-undertone="${element}"`).classList.add("available");
            });
        }
    }

    function activateStep(section) {
        document.querySelectorAll(`[data-step]`).forEach( (element) =>
            element.classList.remove("active") );

        document.querySelector(`[data-step="${section}"]`).classList.add("active");
    }

    function stepBack(stepNumber) {
        // override state
        if (stepNumber < 2) {
            state.selected.mastertone = "";
            state.selected.undertone = "";
            state.result = "";
        } else if (stepNumber < 3) {
            state.selected.undertone = "";
            state.result = "";
        } else if (stepNumber < 4) {
            state.result = "";
        }

        const navButtons = document.querySelectorAll(`[data-step-vis]`);

        // update classes for navigation buttons
        navButtons.forEach( (element) => {
            if (element.dataset.stepVis > stepNumber) {
                element.classList.remove("active") ;
            }
        });

        document.querySelector(`[data-step-vis="${stepNumber}"]`).classList.add("active");

        // set state step
        state.step = stepNumber;

        activateStep(stepNumber);
    }

    function getAvailableTones(intensity, mastertone, availableTones) {
        return availableTones[intensity][mastertone];
    }

    function translate(phrase, translationArray) {
        return translationArray[phrase];
    }

    // app init
    function initializeApp() {
        document.querySelector("#ff-header").classList.remove("active");
        document.querySelector("#ff-app").classList.add("active");
    }

    // start the app button
    const startButton = document.querySelector("#ff-start-button");

    startButton.addEventListener('click', (event) => {
        setTimeout(() => {
            initializeApp();
        }, 200);
    });

    // buttons setting state
    const selectorButtons = document.querySelectorAll(".data-selector");

    selectorButtons.forEach((item) => {
        item.addEventListener('click', (event) => {
            const key = Object.keys(item.dataset)[0];   // get data-key
            const value = Object.values(item.dataset)[0];   // get data-key="value"

            state.selected[key] = value;    // update state
            updateView(state, availableProducts, imagePath);  // update view
        });
    });

    // navigation buttons
    const navButtons = document.querySelectorAll(`[data-step-vis]`);

    navButtons.forEach((item) => {
        item.addEventListener('click', (event) => {
            let step = item.dataset.stepVis;
            state.step = step;
            stepBack(step);
        })
    })

})();