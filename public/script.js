document.getElementById("fitness-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form input values
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const activity = document.getElementById("activity").value;

    // Check if all required fields are filled
    if (!name || !age || !weight || !height || !activity) {
        document.getElementById("results").innerHTML = `
            <p style="color: red;">Please fill out all fields!</p>
        `;
        return;
    }

    try {
        // Show a loading message
        document.getElementById("results").innerHTML = `
            <p>Loading...</p>
        `;

        // Make API request
        const response = await fetch("http://localhost:8080/api/fitness", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                weight: weight,
                height: height,
                activity: activity
            })
        });

        // Parse the response
        const data = await response.json();
        data.message = data.message.replace(/```html/g, "").replace(/```/g, "");

        if (response.ok) {
            // Hide the form and display AI recommendations
            document.querySelector(".form").style.display = "none";

            // Display AI recommendations with additional buttons
            document.getElementById("results").innerHTML = `
                <h3>AI Recommendations:</h3>
                <table style="border-style: dashed; width: 100%">
                    <tr>
                        <td><strong>Name<strong></td>
                        <td>${name}</td>
                        <td><strong>Age</strong></td>
                        <td>${age}</td>
                    </tr>
                <table>
                <div>${data.message}</div>
                <div class="actions">
                    <button id="change-parameters">Change Parameters</button>
                </div>
            `;

            // Add functionality to "Change Parameters" button
            document.getElementById("change-parameters").addEventListener("click", () => {
                if (confirm("Are you sure you want to change parameters? This will reset the current form.")) {
                    document.querySelector(".form").style.display = "block";
                    document.getElementById("results").innerHTML = ""; // Clear results
                    document.getElementById("fitness-form").reset(); // Reset form
                }
            });
            
        } else {
            // Handle API error responses
            document.getElementById("results").innerHTML = `
                <p style="color: red;">Error: ${data.error || "Failed to get recommendations."}</p>
            `;
        }
    } catch (error) {
        // Handle network errors or other exceptions
        document.getElementById("results").innerHTML = `
            <p style="color: red;">An error occurred: ${error.message}</p>
        `;
    }
});
