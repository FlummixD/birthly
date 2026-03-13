let persons = [];

const CACHE_KEY = "birthdays";

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
    loadToCache();
})
// Person entfernen
function deletePerson(personIndex) {
    // Funktion array.splice(index, anzahl)
    persons.splice(personIndex, 1);

    updateBirthdays();
    loadToCache();
}
function stripTime(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function loadToCache() {
    localStorage.setItem(CACHE_KEY, JSON.stringify(persons));
}

function loadFromCache() {
    let data = localStorage.getItem(CACHE_KEY);

    if (!data) {
        persons = [];
        return;
    }

    persons = JSON.parse(data);

    for (let i = 0; i < persons.length; i++) {
        persons[i].birthday = new Date(persons[i].birthday);
    }
}

// Funktion daysUntilBirthday(birthday)
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
        if (dateDistance === 1) {
            distanceText = "Heute"
        }
        else if (dateDistance === 2) {
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
            <h3 class="bd-age">${age}</h3>
            <div class="bd-content left">
                <div class="bd-col">
                    <div class="bd-title">${persons[i]["name"]}</div>
                    <div class="bd-info">${String(persons[i]["birthday"].getDate()).padStart(2, "0")}.${String(persons[i]["birthday"].getMonth() + 1).padStart(2, "0")}.${String(persons[i]["birthday"].getFullYear()).slice(-2)} ${distanceText}</div >
                </div >
                <svg onclick="deletePerson(${i})" class="delete" width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_55_71)">
                    <path d="M8.50016 26.9167C8.50016 28.475 9.77516 29.75 11.3335 29.75H22.6668C24.2252 29.75 25.5002 28.475 25.5002 26.9167V12.75C25.5002 11.1917 24.2252 9.91667 22.6668 9.91667H11.3335C9.77516 9.91667 8.50016 11.1917 8.50016 12.75V26.9167ZM12.7502 12.75H21.2502C22.0293 12.75 22.6668 13.3875 22.6668 14.1667V25.5C22.6668 26.2792 22.0293 26.9167 21.2502 26.9167H12.7502C11.971 26.9167 11.3335 26.2792 11.3335 25.5V14.1667C11.3335 13.3875 11.971 12.75 12.7502 12.75ZM21.9585 5.66667L20.9527 4.66083C20.6977 4.40583 20.3293 4.25 19.961 4.25H14.0393C13.671 4.25 13.3027 4.40583 13.0477 4.66083L12.0418 5.66667H8.50016C7.721 5.66667 7.0835 6.30417 7.0835 7.08333C7.0835 7.8625 7.721 8.5 8.50016 8.5H25.5002C26.2793 8.5 26.9168 7.8625 26.9168 7.08333C26.9168 6.30417 26.2793 5.66667 25.5002 5.66667H21.9585Z" fill="white"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_55_71">
                    <rect width="34" height="34" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
            </div >
        </div >
    `;
    }
    datesWrapper.innerHTML = insidehtml;
}

loadFromCache();
updateBirthdays();
