// Cash Register
// Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

// cid is a 2D array listing available currency.

// The checkCashRegister() function should always return an object with a status key and a change key.

// Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

// Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

// Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

// Currency Unit	Amount
// Penny	$0.01 (PENNY)
// Nickel	$0.05 (NICKEL)
// Dime	$0.1 (DIME)
// Quarter	$0.25 (QUARTER)
// Dollar	$1 (ONE)
// Five Dollars	$5 (FIVE)
// Ten Dollars	$10 (TEN)
// Twenty Dollars	$20 (TWENTY)
// One-hundred Dollars	$100 (ONE HUNDRED)
// See below for an example of a cash-in-drawer array:

// [
//   ["PENNY", 1.01],
//   ["NICKEL", 2.05],
//   ["DIME", 3.1],
//   ["QUARTER", 4.25],
//   ["ONE", 90],
//   ["FIVE", 55],
//   ["TEN", 20],
//   ["TWENTY", 60],
//   ["ONE HUNDRED", 100]
// ]

function checkCashRegister(price, cash, cid) {
    let newCid = cid.slice();
    let changeDue = cash * 100 - price * 100;
    let valueArr = {
        PENNY: 0.01,
        NICKEL: 0.05,
        DIME: 0.1,
        ONE: 1,
        QUARTER: 0.25,
        FIVE: 5,
        TEN: 10,
        TWENTY: 20,
        "ONE HUNDRED": 100,
    };
    for (let c of Object.keys(valueArr)) {
        valueArr[c] *= 100;
    }
    newCid = newCid.map((a) => [a[0], Math.round(a[1] * 100)]);

    let totalCid = newCid.reduce((totalCash, value) => totalCash + value[1], 0);

    if (totalCid < changeDue) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    } else if (changeDue === totalCid) {
        return { status: "CLOSED", change: cid };
    }
    let changeCheck = changeDue;
    let changeArr = newCid.reverse().reduce((change, noteArr) => {
        if (valueArr[noteArr[0]] <= changeCheck && noteArr[1] !== 0) {
            let i = 0;
            let valueGiven = 0;

            while (true) {
                i += 1;
                valueGiven = valueArr[noteArr[0]] * i;
                if (valueGiven > changeCheck || valueGiven > noteArr[1]) {
                    break;
                }
            }
            i -= 1;
            valueGiven = valueArr[noteArr[0]] * i;
            changeCheck -= valueGiven;
            change.push([noteArr[0], valueGiven]);
        }
        return change;
    }, []);
    let valueGivenFinal = changeArr.reduce(
        (sum, noteArr) => sum + noteArr[1],
        0
    );
    for (let c of Object.keys(valueArr)) {
        valueArr[c] /= 100;
    }
    newCid = newCid.map((a) => [a[0], Math.round(a[1] / 100)]);
    changeArr = changeArr.map((a) => [a[0], a[1] / 100]);
    if (changeDue - valueGivenFinal > 0) {
        changeDue = (cash - price) / 100;
        return {
            status: "INSUFFICIENT_FUNDS",
            change: [],
            // changeArr,
            // changeDue,
            // valueGivenFinal,
            // totalCid,
        };
    } else {
        changeDue /= 100;
        valueGivenFinal /= 100;
        totalCid /= 100;
        return {
            status: "OPEN",
            change: changeArr,
        };
    }
}

console.log(
    checkCashRegister(3.26, 100, [
        ["PENNY", 1.01],
        ["NICKEL", 2.05],
        ["DIME", 3.1],
        ["QUARTER", 4.25],
        ["ONE", 90],
        ["FIVE", 55],
        ["TEN", 20],
        ["TWENTY", 60],
        ["ONE HUNDRED", 100],
    ])
);

//should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}
