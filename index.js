

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


    

    return true;
}

function formSubmit() {
    const inputs = {
        age: -1,
        weight: -1,
        height: -1,

        bodyFatEntered: false,
        bodyFatPercent: -1,

        gender: "M",
        activityLevel: "S",
    };

    if (!validateFormInputs(inputs)) {
        return;
    }

    
}

document.querySelector("#submitBtn").addEventListener("click", formSubmit);




