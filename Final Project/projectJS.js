document.getElementById("submitButton").addEventListener("click", function () {
    const email = document.getElementById("emailInput").value;
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (emailPattern.test(email)) {
        document.querySelector(".form-wrapper").classList.add("slide-left");
    } else {
        alert('Please enter a valid email address')
    }

    userName = document.getElementById("nameInput").value;
    userGoals = document.getElementById("goals").value;
});

let mealPlan = {
    monday: {},
    tuesday: {},
    wednesday: {},
    thursday: {},
    friday: {},
    saturday: {},
    sunday: {},
}

let currentDay = 'monday';

document.getElementById("saveMeal").addEventListener("click", function () {
    mealPlan[currentDay] = {
        breakfast: document.getElementById("breakfast").value,
        snack1: document.getElementById("snack1").value,
        lunch: document.getElementById("lunch").value,
        snack2: document.getElementById("snack2").value,
        dinner: document.getElementById("dinner").value
    };

    document.getElementById("breakfast").value = "";
    document.getElementById("snack1").value = "";
    document.getElementById("lunch").value = "";
    document.getElementById("snack2").value = "";
    document.getElementById("dinner").value = "";

    if (currentDay !== "sunday") {
        document.getElementById("nextDay").style.display = "inline";
    } else {
        displayMealPlans();
    }
});


document.getElementById("nextDay").addEventListener("click", function() {
    
    switch (currentDay) {
        case "monday": currentDay = "tuesday"; break;
        case "tuesday": currentDay = "wednesday"; break;
        case "wednesday": currentDay = "thursday"; break;
        case "thursday": currentDay = "friday"; break;
        case "friday": currentDay = "saturday"; break;
        case "saturday": currentDay = "sunday"; break;
        case "sunday": 
            alert("Meal plan completed!"); 
            return; 
    }

    document.querySelector("h3").innerText = `${currentDay.charAt(0).toUpperCase() + currentDay.slice(1)} Meal Plan`;
    document.getElementById("nextDay").style.display = "none";   
});



function displayMealPlans() {
    let mealPlanDetails = `
        <h2>${userName}</h2>
        <p><strong>Weekly Goals:</strong> ${userGoals}</p>
        <hr>
    `;

    for (let day in mealPlan) {
        mealPlanDetails += `<h3>${day.charAt(0).toUpperCase() + day.slice(1)} Meal Plan:</h3>`;
        mealPlanDetails += `
            <p>Breakfast: ${mealPlan[day].breakfast}</p>
            <p>Snack 1: ${mealPlan[day].snack1}</p>
            <p>Lunch: ${mealPlan[day].lunch}</p>
            <p>Snack 2: ${mealPlan[day].snack2}</p>
            <p>Dinner: ${mealPlan[day].dinner}</p>
            <hr>`;
    }

    let popupWindow = window.open("", "Meal Plans", "width=600,height=400");
    popupWindow.document.write(`
        <html>
            <head>
                <title>Meal Plans</title>
            </head>
            <body>
                <h1>Complete Meal Plans for</h1>
                ${mealPlanDetails}
                <button onclick="downloadPlan()">Download Plan</button>

                <script>
                    function downloadPlan() {
                        const text = document.body.innerText;
                        const blob = new Blob([text], { type: "text/plain" });
                        const link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = "meal-plan.txt";
                        link.click();
                    }
                </script>
            </body>
        </html>
    `);
}