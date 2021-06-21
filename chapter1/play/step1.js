const plays = require('./plays.json');
const invoces = require('./invoces.json');

function statement(invoice, plays) {
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  
  for (let perf of invoice.performances) {
    // 청구 내역을 출력한다.
    result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
  }
  result += `총액: ${usd(totalAmount())}\n`;
  result += `적립 포인트: ${totalVolumeCredits(invoice)}점\n`;
  return result;

  function totalAmount() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }
    return result;
  }
  
  function totalVolumeCredits(invoice) {
    let volumeCredits = 0;
    for (let perf of invoice.performances) {
      // 포인트를 적립한다.
      volumeCredits += volumeCreditsFor(perf);
    }
    return volumeCredits;
  }
  
  function usd(aNumber) {
    return new Intl.NumberFormat(
      'en-US',
      { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }
    ).format(aNumber / 100);
  }
  
  function volumeCreditsFor(perf) {
    let result = 0;
    result += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다
    if ('comedy' === playFor(perf).type) {
      result += Math.floor(perf.audience / 5);
    }
    return result;
  }
  
  function playFor(perf) {
    return plays[perf.playID];
  }
  
  function amountFor(perf) {
    let result;
    switch (playFor(perf).type) {
      case 'tragedy': // 비극
        result = 40000;
        if (perf.audience > 30) {
          result += 1000 * (perf.audience - 30);
        }
        break;
      case 'comedy': // 희극 
        result = 30000;
        if (perf.audience > 20) {
          result += 10000 + 500 * (perf.audience - 20);
        }
        result += 300 * perf.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${playFor(perf).type}`);
    }
    return result;
  }  
}

console.log(statement(invoces[0], plays));