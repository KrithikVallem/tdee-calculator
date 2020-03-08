//set width of results text to the same as the input form
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
    alert("1 no");
    
    /*if (gender === "M") {
        const safeMinCalories = MIN_CAL_MALE;
        const genderModifier = MALE_CAL_MODIFIER;
    }
    else {
        const safeMinCalories = MIN_CAL_FEMALE;
        const genderModifier = FEMALE_CAL_MODIFIER;
    }*/

    alert("2 no");

    if (weightUnit === "LBS") {
        weight *= KILOGRAMS_PER_POUND;
    }

    alert("3 no");

    if (heightUnit === "IN") {
        height *= CENTIMETERS_PER_INCH;
    }

    alert("4 no");

    //const BMR = (10 * weight) + (6.25 * height) - (5.0 * age) + genderModifier;

    alert("5 no");

    // if tdee is under safe min calories, then set tdee to safe min calories
    //const TDEE = Math.max(safeMinCalories, Math.round(BMR * activityMultiplier));

    alert("6 no");
    TDEE = 2000;

    return TDEE;
}


function calculateTDEEwithBF(gender, weight, weightUnit, bodyFatPercent, activityMultiplier) {
    // Katch-McArdle
    // Katch = 370 + (21.6 * LBM)
    // where LBM is lean body mass 

    safeMinCalories = (gender === "M") ? MIN_CAL_MALE : MIN_CAL_FEMALE;

    if (weightUnit === "LBS") {
        weight *= KILOGRAMS_PER_POUND;
    }

    const LBM = (100 - bodyFatPercent) * 0.01 * weight;
    const BMR = (21.6 * LBM) + 370;
    const TDEE = Math.max(safeMinCalories, Math.round(BMR * activityMultiplier));

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
        BMI_RANGE = "Underweight";
    }
    else if (BMI < 25) {
        BMI_RANGE = "Healthy";
    }
    else if (BMI < 30) {
        BMI_RANGE = "Overweight";
    }
    else {
        BMI_RANGE = "Obese";
    }

    document.querySelector("#infoContainer").innerText = 
        `Your TDEE is ${TDEE} calories per day.
        Your BMI is ${BMI}, so you are ${BMI_RANGE}.`

    document.querySelector("#resultsContainer").innerText = 
        `To lose 2 lbs/week, eat ${Math.max(TDEE - 1000, safeMinCalories)} calories per day.
        To lose 1 lbs/week, eat ${Math.max(TDEE - 500, safeMinCalories)} calories per day.
        To maintain weight, eat ${Math.max(TDEE, safeMinCalories)} calories per day.
        To gain 1 lbs/week, eat ${Math.max(TDEE + 500, safeMinCalories)} calories per day.
        To lose 2 lbs/week, eat ${Math.max(TDEE + 1000, safeMinCalories)} calories per day.`;

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
        const TDEE = (inputs.bodyFatEntered) ? calculateTDEEwithBF(inputs.gender, inputs.weight, inputs.weightUnit, inputs.bodyFatPercent, inputs.activityLevel) : calculateTDEEnoBF(inputs.gender, inputs.age, inputs.weight, inputs.weightUnit, inputs.height, inputs.heightUnit, input.activityLevel);

        const BMI = calculateBMI(inputs.weight, inputs.weightUnit, inputs.height, inputs.heightUnit);
        
        printOutput(TDEE, BMI, inputs.gender);
    }
}


document.querySelector("#submitBtn").addEventListener("click", formSubmit);




