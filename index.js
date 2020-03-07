

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
        activityLevel: "S",
    };

    if (!validateFormInputs(inputs)) {
        return;
    }

    
    alert(inputs.activityLevel);
    alert(inputs.weightUnit);
    alert(inputs.heightUnit);
}

document.querySelector("#submitBtn").addEventListener("click", formSubmit);




