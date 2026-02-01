class TaxCalculator {
  constructor() {
    this.salary = 0;
    this.basicSalary = 0;
    this.rentalIncome = 0;
    this.netRentalIncome = 0;

    this.hraReceived = 0;
    this.rentPaid = 0;
    this.cityType = null;
    this.hraExemption = 0;

    this.deduction80C = 0;
    this.regime = "new";
  }

  addSalary(amount, basicSalary) {
    this.salary = amount;
    this.basicSalary = basicSalary;
    return this;
  }

  addRentalIncome(amount) {
    this.rentalIncome = amount;
    this.netRentalIncome = amount * 0.7;
    return this;
  }

  addHRA(hraReceived, rentPaid, cityType) {
    this.hraReceived = hraReceived;
    this.rentPaid = rentPaid;
    this.cityType = cityType;
    return this;
  }

  add80CDeduction(amount) {
    this.deduction80C = Math.min(amount, 150000);
    return this;
  }

  chooseRegime(type) {
    this.regime = type === "old" ? "old" : "new";
    return this;
  }

  calculateHRAExemption() {
    if (this.regime !== "old") return 0;

    const option1 = this.hraReceived;
    const option2 = Math.max(
      this.rentPaid - (0.1 * this.basicSalary),
      0
    );

    const option3 =
      this.cityType === "metro"
        ? 0.5 * this.basicSalary
        : 0.4 * this.basicSalary;

    return Math.min(option1, option2, option3);
  }

  calculateTax() {
    let taxableIncome = this.salary + this.netRentalIncome;
    let tax = 0;

    if (this.salary > 0) {
      taxableIncome -= this.regime === "old" ? 50000 : 75000;
    }

    if (this.regime === "old") {
      this.hraExemption = this.calculateHRAExemption();
      taxableIncome -= this.hraExemption;
      taxableIncome -= this.deduction80C;
    }

    taxableIncome = Math.max(taxableIncome, 0);

    tax =
      this.regime === "old"
        ? this.calculateOldTax(taxableIncome)
        : this.calculateNewTax(taxableIncome);

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
const tax = new TaxCalculator()
  .addSalary(800000, 720000)
  .addRentalIncome(150000)
  .addHRA(360000, 300000, "metro")
  .add80CDeduction(50000)
  .chooseRegime("old")
  .calculateTax();

console.log(tax);
