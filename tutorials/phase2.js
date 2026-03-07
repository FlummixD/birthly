// let students = ["Bennet", "Jakob", "Mattis"];
// let alter = [14, 13, 15];
// let len = students.length
// Ein Porgramm was Die namen in der ersten liste und die alter ausgibt immer so:
// Bennet: 14
// ...

// for (let i = 0; i < len; i = i + 1) {
//     console.log(students[i] + ":", alter[i]);
// }

let persons = [
    {
        name: "Mattis",
        birthday: "2010-09-11",
    }
]
console.log("Zuerst:", persons)
persons.push({
    name: "Bennet",
    birthday: "2011-02-10",
})
console.log("Danach:", persons)