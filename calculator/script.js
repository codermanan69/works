class Calculator {
  constructor(initialvalue = 0) {
    this.value = initialvalue;
  }

  add(n) {
    this.value += n;
    return this;
  }

  subtract(n) {
    this.value -= n;
    return this;
  }

  multiply(n) {
    this.value *= n;
    return this;
  }

  divide(n) {
    if (n === 0) Error("Division by zero");
    this.value /= n;
    return this;
  }

  getResult() {
    return this.value;
  }
}

const calculator = new Calculator(1);
console.log(
  calculator.add(5).multiply(2).subtract(3).getResult()
);