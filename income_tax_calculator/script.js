const API_URL = "https://it-calculator-service.vercel.app/calculate-tax";

const form = document.getElementById("taxForm");
const resultBox = document.getElementById("result");
const loader = document.getElementById("loader");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    resultBox.innerHTML = "";
    loader.style.display = "block";

    resultBox.classList.add("hidden");


    const salary = Number(document.getElementById("salary").value);
    const rentIncome = Number(document.getElementById("rentIncome").value) || 0;
    const hra = Number(document.getElementById("hra").value) || 0;
    const annualRent = Number(document.getElementById("annualRent").value) || 0;
    const section80C = Number(document.getElementById("section80C").value) || 0;
    const regime = document.getElementById("regime").value;
    const isMetro = document.getElementById("isMetro").checked;

    if (!salary || salary < 0) {
        loader.style.display = "none";
        alert("Please enter a valid salary");
        return;
    }

    const payload = {
        incomeFromSalary: salary,
        incomeFromRent: rentIncome,
        regime: regime
    };

    if (regime === "old") {
        payload.hraComponent = hra;
        payload.annualRent = annualRent;
        payload.section80C = section80C;
        payload.isMetro = isMetro;
    }

    console.log("Request Payload:", payload);

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const data = await response.json();
        loader.style.display = "none";
        displayResult(data);

    } catch (error) {
        loader.style.display = "none";
        alert("Something went wrong while calculating tax. Please try again.");
        console.error(error);
    }
});

function displayResult(data) {
    resultBox.classList.remove("hidden");

    resultBox.innerHTML = `
        <h3>Tax Regime: ${data.regime.toUpperCase()}</h3>

        <p><strong>Gross Income:</strong> ₹${data.grossIncome.toLocaleString()}</p>
        <p><strong>Total Deductions:</strong> ₹${data.totalDeductions.toLocaleString()}</p>
        <p><strong>Taxable Income:</strong> ₹${data.taxableIncome.toLocaleString()}</p>

        <hr>

        <p><strong>Income Tax:</strong> ₹${data.incomeTax.toLocaleString()}</p>
        <p><strong>Cess:</strong> ₹${data.cess.toLocaleString()}</p>

        <h2>Total Tax Liability: ₹${data.totalTaxLiability.toLocaleString()}</h2>
    `;
}
