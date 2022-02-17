# Free Code Camp - Final projects for the data structures and algorithms course in JavaScript

This is a public repository for the solutions of the final projects given by [Free Code Camp](https://www.freecodecamp.org/)

## Table of Contents

## The Challenges

### The Cash Register

-   Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

-   cid is a 2D array listing available currency.

-   The checkCashRegister() function should always return an object with a status key and a change key.

-   Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

-   Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

-   Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

-   [See My solution](#the-checkcashregister-function)

### Palindrome Checker

-   Return true if the given string is a palindrome. Otherwise, return false.

-   A palindrome is a word or sentence that's spelled the same way both forward and backward, ignoring punctuation, case, and spacing.

-   You'll need to remove all non-alphanumeric characters (punctuation, spaces and symbols) and turn everything into the same case (lower or upper case) in order to check for palindromes.

-   We'll pass strings with varying formats, such as racecar, RaceCar, and race CAR among others.

-   We'll also pass strings with special symbols, such as 2A3*3a2, 2A3 3a2, and 2_A3*3#A2.

-   [See My solution](#The-palindrome-function)

### Roman Numeral Convertor

-   Convert the given number into a roman numeral.

-   All roman numerals answers should be provided in upper-case.

-   For details visit [Roman Numerals](https://www.mathsisfun.com/roman-numerals.html)

-   [See My solution](#The-convertToRoman-function)

### Caesars Cipher

-   One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. In a shift cipher the meanings of the letters are shifted by some set amount.

-   A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus A ↔ N, B ↔ O and so on.

-   Write a function which takes a ROT13 encoded string as input and returns a decoded string.

-   All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.

-   [See my solution](#the-rot13-function)

### The Telephone Number Validator

-   Telephone Number Validator
-   Return true if the passed string looks like a valid US phone number.

-   The user may fill out the form field any way they choose as long as it has the format of a valid US number. The following are examples of valid formats for US numbers (refer to the tests below for other variants):

-- 555-555-5555
-- (555)555-5555
-- (555) 555-5555
-- 555 555 5555
-- 5555555555
-- 1 555 555 5555

-   For this challenge you will be presented with a string such as 800-692-7753 or 8oo-six427676;laskdjf. Your job is to validate or reject the US phone number based on any combination of the formats provided above. The area code is required. If the country code is provided, you must confirm that the country code is 1. Return true if the string is a valid US phone number; otherwise return false.

-   [See my solution](#the-telephonecheck-function)

## The Solutions

### The checkCashRegister function

```js
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
```

### The palindrome function

```js
function palindrome(str) {
    let newStr = str
        .split("")
        .filter((a) => /[A-Za-z0-9]/.test(a))
        .join("")
        .toLowerCase();
    return newStr.split("").reverse().join("") === newStr ? true : false;
}
console.log(palindrome("2A3*3a2"));
console.log(palindrome("not a palindrome"));
```

### The convertToRoman function

```js
function convertToRoman(num) {
    const CONVERTARR = {
        1: "I",
        2: "II",
        3: "III",
        4: "IV",
        5: "V",
        6: "VI",
        7: "VII",
        8: "VIII",
        9: "IX",
        10: "X",
        20: "XX",
        30: "XXX",
        40: "XL",
        50: "L",
        60: "LX",
        70: "LXX",
        80: "LXXX",
        90: "XC",
        100: "C",
        200: "CC",
        300: "CCC",
        400: "CD",
        500: "D",
        600: "DC",
        700: "DCC",
        800: "DCCC",
        900: "CM",
        1000: "M",
        2000: "MM",
        3000: "MMM",
    };

    return String(num)
        .split("")
        .reverse()
        .map((a, index) => CONVERTARR[a * 10 ** index])
        .reverse()
        .join("");
}

console.log(convertToRoman(3699));
```

### The rot13 function

```js
function rot13(str) {
    return str
        .toUpperCase()
        .split("")
        .map((a) => {
            return !/[A-Za-z]/.test(a)
                ? a
                : a > "M"
                ? String.fromCharCode(a.charCodeAt(0) - 13)
                : String.fromCharCode(a.charCodeAt(0) - 13 + 26);
        })
        .join("");
}

console.log(rot13("SERR PBQR PNZC"));
```

### The telephoneCheck Function

```js
function telephoneCheck(str) {
    let regArr = [
        {
            reg: /^(1 )?\d{3}-\d{3}-\d{4}$/,
            eg: ["555-555-5555", "1 555-555-5555"],
        },
        {
            reg: /^1?\s?\(\d{3}\)\s{0,1}\d{3}-\d{4}$/,
            eg: [
                "(555)555-5555",
                "(555) 555-5555",
                "1 (555)555-5555",
                "1 (555) 555-5555",
                "1(555)555-5555",
                "1(555) 555-5555",
            ],
        },
        {
            reg: /^(1 )?\d{3} \d{3} \d{4}$/,
            eg: ["555 555 5555", "1 555 555 5555"],
        },
        { reg: /^\d{10}$/, eg: ["5555555555"] },
    ];

    return regArr.some((reg) => (reg["reg"].test(str) ? true : false));
}

console.log(telephoneCheck("1(555) 555-5555"));
```
