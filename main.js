// Pomocná funkce na náhodné celé číslo
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Seznam křestních jmen pro výběr
const names = [
    "Jan", "Petr", "Lukáš", "Jiří", "Tomáš",
    "Martin", "Jakub", "Marek", "Ondřej", "Karel",
    "Václav", "Roman", "Daniel", "Michal", "Josef",
    "Filip", "Radek", "Zdeněk", "Adam", "David",
    "Jaroslav", "Aleš", "Stanislav", "Dominik", "Erik",
    "Štěpán", "Matěj", "Richard", "Patrik", "Robert",
    "Hana", "Lucie", "Eva", "Petra", "Tereza",
    "Jana", "Kristýna", "Kateřina", "Barbora", "Adéla",
    "Alena", "Veronika", "Eliška", "Markéta", "Magdaléna",
    "Natálie", "Denisa", "Karolína", "Nikola", "Sabina"
];

// Seznam příjmení pro výběr
const surnames = [
    "Novák", "Svoboda", "Dvořák", "Černý", "Procházka",
    "Kuřil", "Pokorný", "Veselý", "Krejčí", "Horák",
    "Němec", "Malý", "Urban", "Beneš", "Kučera",
    "Říha", "Vaněk", "Král", "Fiala", "Sedláček",
    "Kolář", "Růžička", "Bartoš", "Martínek", "Kadlec",
    "Bláha", "Šimek", "Vlček", "Musil", "Šťastný",
    "Ševčík", "Kříž", "Doležal", "Mach", "Holub",
    "Zeman", "Tomek", "Pavlík", "Straka", "Kopecký",
    "Pospíšil", "Mašek", "Hájek", "Pavelka", "Sýkora",
    "Tichý", "Vacek", "Havlíček", "Ptáček", "Hruška"
];

export function main(dtoIn) {

    // Výsledek, do kterého zadáme zaměstnance
    const dtoOut = [];

    // Validace vstupu - kontrola správnosti zadávaných dat
    if (!dtoIn) {
        // Návrat prázdného pole při chybě.
        return dtoOut;
    }

    // Kontrola počtu zaměstnanců
    if (typeof dtoIn.count !== "number" || dtoIn.count < 1) {
        // Při zadání čísla menší než 1 program vrátí prázdný výsledek.
        return dtoOut;
    }

    // Kontrola věku zaměstnanců (min a max věk musí být čísla). 
    if (!dtoIn.age || typeof dtoIn.age.min !== "number" || typeof dtoIn.age.max !== "number") {
        //Při zadání nesprávného věku program rovněž nebude nic generovat.
        return dtoOut;
    }

for (let i = 0; i < dtoIn.count; i++) {

    // Náhodný výběr pohlaví
    const gender = Math.random() < 0.5 ? "male" : "female";

    // Náhodné jméno z připraveného seznamu
    const randomNameIndex = randomInt(0, names.length - 1);
    const name = names[randomNameIndex];

    // Náhodné příjmení z připraveného seznamu
    const randomSurnameIndex = randomInt(0, surnames.length - 1);
    const surname = surnames[randomSurnameIndex];

    // Náhodný pracovní úvazek
    const workloads = [10, 20, 30, 40];
    const workload = workloads[randomInt(0, workloads.length - 1)];

    // Vytvoření náhodného data narození v daném věkovém rozmezí
    const now = new Date();

   // náhodný věk v rozmezí <min, max>
    const age = randomInt(dtoIn.age.min, dtoIn.age.max);

    // základní datum = dnešní datum mínus age let
    const birth = new Date(now);
    birth.setUTCFullYear(now.getUTCFullYear() - age);

    // náhodný posun o 0–30 dní, aby měli lidé různé narozeniny
    const randomOffsetDays = randomInt(0, 30);
    birth.setUTCDate(birth.getUTCDate() - randomOffsetDays);

    const birthdate = birth.toISOString();
    
    // Vytvoření jednoho generovaného zaměstnance jako objekt
    const employee = {
        gender: gender,
        birthdate: birthdate,
        name: name,
        surname: surname,
        workload: workload
    };

    // Přidání zaměstnance do výsledného pole
    dtoOut.push(employee);
}

return dtoOut;
}
