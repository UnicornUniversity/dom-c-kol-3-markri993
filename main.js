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


// Hlavní funkce programu pro generování zaměstnanců
export function main(dtoIn) {

  // Výstupní pole zaměstnanců
  const dtoOut = [];

  // Validace vstupu – kontrola, zda dtoIn existuje
  if (!dtoIn) return dtoOut;

  // Validace počtu generovaných zaměstnanců
  if (typeof dtoIn.count !== "number" || dtoIn.count < 1)
    return dtoOut;

  // Validace věku včetně existence objektu age
  if (
    !dtoIn.age ||
    typeof dtoIn.age.min !== "number" ||
    typeof dtoIn.age.max !== "number"
  ) {
    return dtoOut;
  }

  // Hlavní generovací cyklus
  for (let i = 0; i < dtoIn.count; i++) {

    // Náhodný výběr pohlaví
    const gender = Math.random() < 0.5 ? "male" : "female";

    // Náhodné jméno a příjmení ze seznamu
    const name = names[randomInt(0, names.length - 1)];
    const surname = surnames[randomInt(0, surnames.length - 1)];

    // Náhodný pracovní úvazek
    const workloads = [10, 20, 30, 40];
    const workload = workloads[randomInt(0, workloads.length - 1)];

    // Získání aktuálního data pro výpočet věku
    const now = new Date();

    // Náhodný věk v rozmezí <min, max>
    const age = randomInt(dtoIn.age.min, dtoIn.age.max);

    // Vytvoření základu data narození – dnešní datum minus věk
    const birth = new Date(now);
    birth.setUTCFullYear(now.getUTCFullYear() - age);

    // Zajištění unikátnosti narozenin + zachování max věku
    // Pokud je věk menší než max, přidáme posun (random + index)
    // Pokud je věk rovný max, offset = 0, aby věk nepřetekl
    let offsetDays = 0;
    if (age < dtoIn.age.max) {
      offsetDays = randomInt(0, 30) + i;
    }

    // Aplikace offsetu do data narození
    birth.setUTCDate(birth.getUTCDate() - offsetDays);

    // Převod data na ISO formát
    const birthdate = birth.toISOString();

    // Vytvoření objektu zaměstnance
    const employee = {
      gender: gender,
      birthdate: birthdate,
      name: name,
      surname: surname,
      workload: workload
    };

    // Přidání zaměstnance do výstupu
    dtoOut.push(employee);
  }

  // Vrácení kompletního výsledku
  return dtoOut;
}
