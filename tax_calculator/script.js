
class TaxCalculator {
    constructor() {
        this.salary = 0;
        this.basicSalary = 0;
        this.rentIncome = 0;
        this.hraReceived = 0;
        this.rentPaid = 0;
        this.cityType = 'non-metro';
        this.deduction80CAmount = 0;
        this.taxRegime = 'old';
    }

    addSalary(amount) {
        if (amount < 0) throw new Error("Salary cannot be negative");
        this.salary = amount;
        this.basicSalary = 0.5 * amount;
        return this;
    }

    addRent(amount) {
        if (amount < 0) throw new Error("Rent income cannot be negative");
        this.rentIncome = amount;
        return this;
    }

    addHRA(hraReceived, rentPaid, cityType) {
        if (hraReceived < 0 || rentPaid < 0) throw new Error("HRA and Rent cannot be negative");
        this.hraReceived = hraReceived;
        this.rentPaid = rentPaid;
        this.cityType = cityType;
        return this;
    }

    deduction80C(amount) {
        if (amount < 0) throw new Error("80C deduction cannot be negative");
        this.deduction80CAmount = Math.min(amount, 150000);
        return this;
    }

    chooseRegime(regime) {
        if (regime !== 'old' && regime !== 'new') throw new Error("Regime must be 'old' or 'new'");
        this.taxRegime = regime;
        return this;
    }

    calculateHRAExemption() {
        if (this.taxRegime === 'new') return 0; 
        const option1 = this.hraReceived;
        const option2 = this.rentPaid - 0.1 * this.basicSalary;
        const option3 = this.cityType === 'metro' ? 0.5 * this.basicSalary : 0.4 * this.basicSalary;
        return Math.max(0, Math.min(option1, option2, option3));
    }

    calculateTax() {
        let standardDeduction = this.taxRegime === 'old' ? 50000 : 75000;

        const netRentalIncome = this.rentIncome - 0.3 * this.rentIncome;

        const hraExemption = this.calculateHRAExemption();

        let totalDeductions = standardDeduction + (this.taxRegime === 'old' ? hraExemption + this.deduction80CAmount : 0);

        const grossIncome = this.salary + netRentalIncome;

        const taxableIncome = Math.max(0, grossIncome - totalDeductions);

        const taxBreakup = [];
        let tax = 0;

        if (this.taxRegime === 'old') {
            const slabs = [
                { upto: 250000, rate: 0 },
                { upto: 500000, rate: 0.05 },
                { upto: 1000000, rate: 0.2 },
                { upto: Infinity, rate: 0.3 }
            ];

            let prevLimit = 0;
            for (const slab of slabs) {
                if (taxableIncome > prevLimit) {
                    const slabIncome = Math.min(taxableIncome, slab.upto) - prevLimit;
                    const slabTax = slabIncome * slab.rate;
                    taxBreakup.push({ slab: `${prevLimit + 1} - ${slab.upto}`, slabIncome, slabTax });
                    tax += slabTax;
                    prevLimit = slab.upto;
                }
            }
        } else { 
            const slabs = [
                { upto: 400000, rate: 0 },
                { upto: 800000, rate: 0.05 },
                { upto: 1200000, rate: 0.1 },
                { upto: 1600000, rate: 0.15 },
                { upto: 2000000, rate: 0.2 },
                { upto: Infinity, rate: 0.3 }
            ];

            let prevLimit = 0;
            for (const slab of slabs) {
                if (taxableIncome > prevLimit) {
                    const slabIncome = Math.min(taxableIncome, slab.upto) - prevLimit;
                    const slabTax = slabIncome * slab.rate;
                    taxBreakup.push({ slab: `${prevLimit + 1} - ${slab.upto}`, slabIncome, slabTax });
                    tax += slabTax;
                    prevLimit = slab.upto;
                }
            }
        }


        const cess = tax * 0.04;
        const totalTaxPayable = tax + cess;

        return {
            grossIncome,
            totalDeductions,
            taxableIncome,
            taxBreakup,
            cess,
            totalTaxPayable
        };
    }
}


document.getElementById('calculateBtn').addEventListener('click', () => {
    const salary = parseFloat(document.getElementById('salary').value) || 0;
    const rentIncome = parseFloat(document.getElementById('rentIncome').value) || 0;
    const hra = parseFloat(document.getElementById('hra').value) || 0;
    const rentPaid = parseFloat(document.getElementById('rentPaid').value) || 0;
    const cityType = document.getElementById('cityType').value;
    const deduction80C = parseFloat(document.getElementById('deduction80C').value) || 0;
    const taxRegime = document.getElementById('taxRegime').value;

    try {
        const calculator = new TaxCalculator();
        const result = calculator
            .addSalary(salary)
            .addRent(rentIncome)
            .addHRA(hra, rentPaid, cityType)
            .deduction80C(deduction80C)
            .chooseRegime(taxRegime)
            .calculateTax();

        displayResult(result);
    } catch (err) {
        alert(err.message);
    }
});

function displayResult(data) {
    const resultDiv = document.getElementById('result');
    let html = `
        <div class="result-row"><span>Gross Income:</span> ₹${data.grossIncome.toLocaleString()}</div>
        <div class="result-row"><span>Total Deductions:</span> ₹${data.totalDeductions.toLocaleString()}</div>
        <div class="result-row"><span>Taxable Income:</span> ₹${data.taxableIncome.toLocaleString()}</div>
        <h3>Tax Slab Breakdown:</h3>
    `;

    data.taxBreakup.forEach(item => {
        html += `<div class="result-row"><span>${item.slab}</span> ₹${item.slabTax.toLocaleString()}</div>`;
    });

    html += `
        <div class="result-row"><span>Health & Education Cess (4%):</span> ₹${data.cess.toLocaleString()}</div>
        <div class="result-row total-tax"><span>Total Tax Payable:</span> ₹${data.totalTaxPayable.toLocaleString()}</div>
    `;

    resultDiv.innerHTML = html;
}
