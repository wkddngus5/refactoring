const PerformanceCalculator = require('./PerformanceCalculator');

class ComedyCalculator extends PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    super(aPerformance, aPlay);
  }

  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }

  // 희극 관객 5명마다 추가 포인트를 제공한다
  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}

module.exports = ComedyCalculator;