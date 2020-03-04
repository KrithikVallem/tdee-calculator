restoreFormFieldInputs(inputs) {
    alert("hi");
}

function formSubmit() {

    const inputs = {
        //gender: document.querySelector("#gender").value,
        age: document.querySelector("#age").value,
        weight: document.querySelector("#weight").value,
        height: document.querySelector("#height").value,
        activityLevel: document.querySelector("#activityLevel").value,
        //bodyFatPercent: document.querySelector("#bodyFatPercent").value,
    };

    restoreFormFieldInputs(inputs);

    alert(inputs.age);
}

document.querySelector("#submitBtn").addEventListener("click", formSubmit);

document.querySelector("table").addEventListener("mouseover", restoreFormFieldInputs);


