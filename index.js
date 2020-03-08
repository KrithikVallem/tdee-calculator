//set width of results and info divs to the same as the input form width
window.onload = () => {
    document.querySelector("#resultsContainer").style.width = window.getComputedStyle(document.querySelector("#inputsContainer")).getPropertyValue("width");
    document.querySelector("#infoContainer").style.width = window.getComputedStyle(document.querySelector("#inputsContainer")).getPropertyValue("width");
};

const KILOGRAMS_PER_POUND = 0.4536;
const CENTIMETERS_PER_INCH = 2.54;
const CM2_PER_M2 = 10000;

const MIN_CAL_FEMALE = 1200;
const MIN_CAL_MALE = 1500;

const MALE_CAL_MODIFIER = 5;
const FEMALE_CAL_MODIFIER = -161;


function validateFormInputs(inputs) {
    inputs.age = parseInt(document.querySelector("#age").value);
    inputs.weight = parseInt(document.querySelector("#weight").value);
    inputs.height = parseInt(document.querySelector("#height").value);

    inputs.bodyFatPercent = parseInt(document.querySelector("#bodyFatPercent").value);
    inputs.bodyFatEntered = false;

    if (!isNaN(inputs.bodyFatPercent)) {
        inputs.bodyFatEntered = true;

        if (isNaN(inputs.bodyFatPercent) || inputs.bodyFatPercent < 0 || inputs.bodyFatPercent > 100) {
            alert("Please enter a valid body fat percentage!");
            return false;
        }
    }

    if (isNaN(inputs.age) || inputs.age === "" || inputs.age < 0) {    
        alert("Please enter a valid age!");
        return false;
    }

    if (isNaN(inputs.weight) || inputs.weight === "" || inputs.weight < 0) {    
        alert("Please enter a valid weight!");
        return false;
    }

    if (isNaN(inputs.height) || inputs.height === "" || inputs.height < 0) {    
        alert("Please enter a valid height!");
        return false;
    }


    // getting values of dropdowns
    const gender = document.querySelector("#gender");
    const weightUnit = document.querySelector("#weightUnit");
    const heightUnit = document.querySelector("#heightUnit");
    const activityLevel = document.querySelector("#activityLevel");

    inputs.gender = gender.options[gender.selectedIndex].value;
    inputs.weightUnit = weightUnit.options[weightUnit.selectedIndex].value;
    inputs.heightUnit = heightUnit.options[heightUnit.selectedIndex].value;
    inputs.activityLevel = activityLevel.options[activityLevel.selectedIndex].value;

    return true;
}



function calculateTDEEnoBF(gender, age, weight, weightUnit, height, heightUnit, activityMultiplier) {
    // Mifflin St. Jeor
    // Mifflin = (10.m + 6.25h - 5.0a) + s
    // m is mass in kg, h is height in cm, a is age in years, s is +5 for males and -151 for females
    
    const safeMinCalories = (gender === "M") ? MIN_CAL_MALE : MIN_CAL_FEMALE;
    const genderModifier = (gender === "M") ? MALE_CAL_MODIFIER : FEMALE_CAL_MODIFIER;

    if (weightUnit === "LBS") {
        weight *= KILOGRAMS_PER_POUND;
    }

    if (heightUnit === "IN") {
        height *= CENTIMETERS_PER_INCH;
    }

    const BMR = (10 * weight) + (6.25 * height) - (5.0 * age) + genderModifier;

    // if tdee is under safe min calories, then set tdee to safe min calories
    const TDEE = Math.max(safeMinCalories, Math.round(BMR * activityMultiplier));

    return TDEE;
}



function calculateTDEEwithBF(gender, weight, weightUnit, bodyFatPercent, activityMultiplier) {
    // Katch-McArdle
    // Katch = 370 + (21.6 * LBM)
    // where LBM is lean body mass 

    const safeMinCalories = (gender === "M") ? MIN_CAL_MALE : MIN_CAL_FEMALE;

    if (weightUnit === "LBS") {
        weight *= KILOGRAMS_PER_POUND;
    }

    const LBM = (100 - bodyFatPercent) * 0.01 * weight;
    const BMR = (21.6 * LBM) + 370;

    const TDEE = Math.round(BMR * activityMultiplier);

    return TDEE;
}



function calculateBMI(weight, weightUnit, height, heightUnit) {
    // BMI = [weight(kg) / height(cm) / height(cm)] * 10,000

    if (weightUnit === "LBS") {
        weight *= KILOGRAMS_PER_POUND;
    }

    if (heightUnit === "IN") {
        height *= CENTIMETERS_PER_INCH;
    }

    const BMI = ((weight / height) / height) * CM2_PER_M2;

    return BMI.toFixed(1);
}


function printOutput(TDEE, BMI, gender) {
    safeMinCalories = (gender === "M") ? MIN_CAL_MALE : MIN_CAL_FEMALE;

    BMI = parseFloat(BMI);

    if (BMI < 18.5) {
        BMI_RANGE = "underweight";
    }
    else if (BMI < 25) {
        BMI_RANGE = "healthy";
    }
    else if (BMI < 30) {
        BMI_RANGE = "overweight";
    }
    else {
        BMI_RANGE = "obese";
    }

    let infoHTML = 
        `Your TDEE is <strong>${Math.max(TDEE, safeMinCalories)}</strong> calories per day.
        <br/>
        Your BMI is <strong>${BMI}</strong>, which is <strong>${BMI_RANGE}</strong>.`;

    let resultsHTML = 
        `To lose 2 lbs/week, eat <strong>${Math.max(TDEE - 1000, safeMinCalories)}</strong> calories per day.<br/>
        To lose 1 lbs/week, eat <strong>${Math.max(TDEE - 500, safeMinCalories)}</strong> calories per day.<br/>
        To maintain weight, eat <strong>${Math.max(TDEE, safeMinCalories)}</strong> calories per day.<br/>
        To gain 1 lbs/week, eat <strong>${Math.max(TDEE + 500, safeMinCalories)}</strong> calories per day.<br/>
        To lose 2 lbs/week, eat <strong>${Math.max(TDEE + 1000, safeMinCalories)}</strong> calories per day.`;
    
    const safeMinCaloriesRegex = new RegExp(safeMinCalories, "g");
    document.querySelector("#resultsContainer").innerHTML = resultsHTML.replace(safeMinCaloriesRegex, `<abbr title='${((gender === "M") ? "Men" : "Women")} are not advised to consume less than ${safeMinCalories} calories per day.'>${safeMinCalories}</abbr>`);
    document.querySelector("#infoContainer").innerHTML = infoHTML.replace(safeMinCaloriesRegex, `<abbr title='${((gender === "M") ? "Men" : "Women")} are not advised to consume less than ${safeMinCalories} calories per day.'>${safeMinCalories}</abbr>`);
    
    document.querySelector("#resultsContainer").style.visibility = "visible";
    document.querySelector("#infoContainer").style.visibility = "visible";
}


function formSubmit() {
    const inputs = {
        age: -1,

        weight: -1,
        weightUnit: "LBS",

        height: -1,
        heightUnit: "IN",

        bodyFatEntered: false,
        bodyFatPercent: -1,

        gender: "M",
        activityLevel: -1,
    };


    if (!validateFormInputs(inputs)) {
        return;
    }
    else {
        const TDEE = (inputs.bodyFatEntered) ? calculateTDEEwithBF(inputs.gender, inputs.weight, inputs.weightUnit, inputs.bodyFatPercent, inputs.activityLevel) : calculateTDEEnoBF(inputs.gender, inputs.age, inputs.weight, inputs.weightUnit, inputs.height, inputs.heightUnit, inputs.activityLevel);

        const BMI = calculateBMI(inputs.weight, inputs.weightUnit, inputs.height, inputs.heightUnit);
        
        printOutput(TDEE, BMI, inputs.gender);
    }
}


document.querySelector("#submitBtn").addEventListener("click", formSubmit);




