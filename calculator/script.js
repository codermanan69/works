class TaxCalculator {
  constructor() {
    this.salary = 0;
    this.rent = 0;
    this.netRent = 0;
    this.deduction80C = 0;
    this.regime = "new"; 
  }

  addSalary(amount) {
    if (amount < 0) throw new Error("Invalid salary");
    this.salary = amount;
    return this;
  }

  addRent(amount) {
    if (amount < 0) throw new Error("Invalid rent");
    this.rent = amount;
    this.netRent = amount * 0.7; 
    return this;
  }

  add80Cdeduction80C(amount) {
    this.deduction80C = Math.min(amount, 150000);
    return this;
  }

  chooseRegime(type) {
    this.regime = type === "old" ? "old" : "new";
    return this;
  }

  calculateTax() {
    let taxableIncome = this.salary + this.netRent;
    let tax = 0;

   
    if (this.salary > 0) {
      taxableIncome -= this.regime === "old" ? 50000 : 75000;
    }

    
    if (this.regime === "old") {
      taxableIncome -= this.deduction80C;
    }

    taxableIncome = Math.max(taxableIncome, 0);

  
    if (this.regime === "old") {
      tax = this.calculateOldTax(taxableIncome);
    } else {
      tax = this.calculateNewTax(taxableIncome);
    }

    
    tax += tax * 0.04;

    return Math.round(tax);
  }

  calculateOldTax(income) {
    let tax = 0;

    if (income > 250000) {
      tax += Math.min(income - 250000, 250000) * 0.05;
    }
    if (income > 500000) {
      tax += Math.min(income - 500000, 500000) * 0.2;
    }
    if (income > 1000000) {
      tax += (income - 1000000) * 0.3;
    }

    return tax;
  }

  calculateNewTax(income) {
    let tax = 0;

    if (income > 400000) {
      tax += Math.min(income - 400000, 400000) * 0.05;
    }
    if (income > 800000) {
      tax += Math.min(income - 800000, 400000) * 0.1;
    }
    if (income > 1200000) {
      tax += Math.min(income - 1200000, 400000) * 0.15;
    }
    if (income > 1600000) {
      tax += Math.min(income - 1600000, 400000) * 0.2;
    }
    if (income > 2000000) {
      tax += (income - 2000000) * 0.3;
    }

    return tax;
  }
}
const taxCalculator = new TaxCalculator();

const tax = taxCalculator
  .addSalary(800000)
  .addRent(150000)
  .add80Cdeduction80C(50000)
  .chooseRegime("old")
  .calculateTax();

console.log(tax);
