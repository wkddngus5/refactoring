const plays = require('../plays.json');
const invoces = require('../invoces.json');
const createStatementData = require('./createStatementData');

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));

  function renderPlainText(data) {
    let result = `청구 내역 (고객명: ${data.customer})\n`;

    for (let perf of data.performances) {
      // 청구 내역을 출력한다.
      result += `${perf.play.name}: ${perf.amount} (${perf.audience}석)\n`;
    }
    result += `총액: ${usd(data.totalAmount)}\n`;
    result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
    return result;

    function usd(aNumber) {
      return new Intl.NumberFormat(
        'en-US',
        { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }
      ).format(aNumber / 100);
    }
  }
}

console.log(statement(invoces[0], plays));

