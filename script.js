let persons = [
    {
        name: "Bennet",
        birthday: new Date("2011-02-10"),
    },
    {
        name: "Mattis",
        birthday: new Date("2010-11-09"),
    },
    {
        name: "Heute",
        birthday: stripTime(new Date()),
    },
    {
        name: "Morgen",
        birthday: new Date("2010-03-07"),
    },
];


let inputs = document.getElementById("inputs");

inputs.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(event);

    let formData = new FormData(inputs);
    let name = formData.get("name");
    let birthday = formData.get("birthday");

    console.log("Name:", name);
    console.log("Birthday:", birthday);

    //Personen updaten
    persons.push({
        name: name,
        birthday: new Date(birthday),
    });

    inputs.reset();

    updateBirthdays();
    updateBirthdays()
})

function stripTime(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// Funktion daysUntilBirthday(birthday) {}
function daysUntilBirthday(bd) {
    let today = stripTime(new Date());
    let birthday = new Date(bd);
    // Das Jahr des Geburtstages auf das Aktuelle Jahr setzten
    birthday.setFullYear(today.getFullYear());
    // Falls der Geburtstag schon dieses Jahr war, das Jahr auf nächstes Jahr setzten
    if (birthday < today) {
        birthday.setFullYear(today.getFullYear() + 1);
    }
    // Erst die differenz in Millisekunden rauskriegen sie dann in Tage umwandeln und dann flooren 
    let dateDistance = Math.ceil((birthday - today) / (1000 * 60 * 60 * 24));
    return dateDistance
}

// Funktion die die Geburtage nach dem nächsten sortiert
function sortBirthdays() {
    persons.sort((a, b) => {
        let daysA = daysUntilBirthday(a["birthday"]) // 1 bis a | 2 bis a
        let daysB = daysUntilBirthday(b["birthday"]) // 2 bis b | 1 bis b
        return daysA - daysB; // soll unter 0 sein | soll über null sein
    })
}
// Funktion die updateBirthdays heißt und das hierunter macht
function updateBirthdays() {
    console.log("Updated bds");
    sortBirthdays();
    let insidehtml = "";
    let datesWrapper = document.getElementById("dates");
    for (let i = 0; i < persons.length; i = i + 1) {
        let dateDistance = daysUntilBirthday(new Date(persons[i].birthday));

        let distanceText;
        if (dateDistance === 0) {
            distanceText = "Heute"
        }
        else if (dateDistance === 1) {
            distanceText = "Morgen"
        }
        else {
            distanceText = `in ${dateDistance} Tagen`;
        }
        // Alter berechnen
        let birthDate = stripTime(persons[i]["birthday"]);
        let today = stripTime(new Date());
        let age = today.getFullYear() - birthDate.getFullYear();
        console.log("birthDate:", birthDate);
        console.log("today:", today);
        console.log("birthDate.getFullYear():", birthDate.getFullYear());
        console.log("today.getFullYear():", today.getFullYear());
        console.log(age);
        if (
            today.getMonth() < birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        insidehtml += `
        <div class="bd ${((i + 1) % 2 === 0) ? "right" : ""} ">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="bd-icon"
        >
          <g clip-path="url(#clip0_11_1317)">
            <path
              d="M16 13H13C12.45 13 12 13.45 12 14V17C12 17.55 12.45 18 13 18H16C16.55 18 17 17.55 17 17V14C17 13.45 16.55 13 16 13ZM16 3V4H8V3C8 2.45 7.55 2 7 2C6.45 2 6 2.45 6 3V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4H18V3C18 2.45 17.55 2 17 2C16.45 2 16 2.45 16 3ZM18 20H6C5.45 20 5 19.55 5 19V9H19V19C19 19.55 18.55 20 18 20Z"
              fill="#323232"
            />
          </g>
          <defs>
            <clipPath id="clip0_11_1317">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <div class="bd-content left">
          <div class="bd-col">
            <h3 class="bd-title">${persons[i]["name"]}</h3>
            <div class="bd-info">${String(persons[i]["birthday"].getDate()).padStart(2, "0")}.${String(persons[i]["birthday"].getMonth() + 1).padStart(2, "0")}.${String(persons[i]["birthday"].getFullYear()).slice(-2)} ${distanceText}</div >
          </div >
    <h3 class="bd-age">${age}</h3>
        </div >
        </div >
    `;
    }
    datesWrapper.innerHTML = insidehtml;
}

updateBirthdays();
