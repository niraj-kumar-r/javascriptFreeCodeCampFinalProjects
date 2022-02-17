# Free Code Camp - Final projects for the data structures and algorithms course in JavaScript

This is a public repository for the solutions of the final projects given by [Free Code Camp](https://www.freecodecamp.org/)

## Table of Contents

## The Challenges

### Palindrome Checker

-   Return true if the given string is a palindrome. Otherwise, return false.

-   A palindrome is a word or sentence that's spelled the same way both forward and backward, ignoring punctuation, case, and spacing.

-   You'll need to remove all non-alphanumeric characters (punctuation, spaces and symbols) and turn everything into the same case (lower or upper case) in order to check for palindromes.

-   We'll pass strings with varying formats, such as racecar, RaceCar, and race CAR among others.

-   We'll also pass strings with special symbols, such as 2A3*3a2, 2A3 3a2, and 2_A3*3#A2.

-   [See My solution](#The-palindrome-function)

## The Solutions

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
