// Telephone Number Validator
// Return true if the passed string looks like a valid US phone number.

// The user may fill out the form field any way they choose as long as it has the format of a valid US number. The following are examples of valid formats for US numbers (refer to the tests below for other variants):

// 555-555-5555
// (555)555-5555
// (555) 555-5555
// 555 555 5555
// 5555555555
// 1 555 555 5555
// For this challenge you will be presented with a string such as 800-692-7753 or 8oo-six427676;laskdjf. Your job is to validate or reject the US phone number based on any combination of the formats provided above. The area code is required. If the country code is provided, you must confirm that the country code is 1. Return true if the string is a valid US phone number; otherwise return false.

// function telephoneCheck(str) {
//     if (/^\d\s|^\d\(/.test(str)) {
//         if (str[0] !== "1") {
//             return false;
//         } else if (/^\d\s/.test(str)) {
//             return telephoneCheck(str.slice(2));
//         } else {
//             return telephoneCheck(str.slice(1));
//         }
//     } else if (/[^\d\(\)\-]/.test(str)) {
//         return false;
//     } else if (/\(|\)/.test(str)) {
//         if (str.match(/\(/g).length !== 1) {
//             return false;
//         } else if (str.match(/\(/).index !== 0) {
//             return false;
//         }
//         if (str.match(/\)/g).length !== 1) {
//             return false;
//         } else if (str.match(/\(/).index !== 4) {
//             return false;
//         }
//     }
// }

function telephoneCheck(str) {
    let regArr = [
        /^\d{3}-\d{3}-\d{4}$/, //"555-555-5555"
        /^\(\d{3}\)\d{3}-\d{4}$/, //"(555)555-5555"
        /^\(\d{3}\) \d{3}-\d{4}$/, //"(555) 555-5555"
    ];

    return regArr.some((reg) => (reg.test(str) ? true : false));
}

console.log(telephoneCheck("555-555-5555"));
