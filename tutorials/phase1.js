let username = "Bennet";
let alter = 15;
let schwanger = false;
const JAHR = 2026;
let birthyear = JAHR - alter;


console.log("Hallo", username);
console.log('Geburtsjahr:', birthyear);

let schwangerText;

// if (schwanger) {
//     schwangerText = "Braschki ist schwanger";
// }
// else {
//     schwangerText = "Braschki ist nicht schwanger";
// }

schwangerText = (schwanger) ? "schwanger" : "nicht schwanger";

// const isGenZ = function (birthyear) {
//     let genZ = (birthyear <= 2010 && birthyear >= 1990) ? "GenZ" : "Kein GenZ";
//     return genZ;
// }


let isHeGenZ;
const isGenZ = (by) => {
    isHeGenZ = (by <= 2010 && by >= 1990) ? "GenZ" : "Kein GenZ";
}

let theReturn = isGenZ(1980);
console.log(theReturn);
console.log(schwangerText);