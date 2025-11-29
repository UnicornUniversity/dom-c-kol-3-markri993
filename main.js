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

  const dtoOut = [];

  if (!dtoIn) return dtoOut;

  if (typeof dtoIn.count !== "number" || dtoIn.count < 1)
    return dtoOut;

  if (
    !dtoIn.age ||
    typeof dtoIn.age.min !== "number" ||
    typeof dtoIn.age.max !== "number"
  ) {
    return dtoOut;
  }

  // Hlavní generovací cyklus
  for (let i = 0; i < dtoIn.count; i++) {

    const gender = Math.random() < 0.5 ? "male" : "female";

    const name = names[randomInt(0, names.length - 1)];
    const surname = surnames[randomInt(0, surnames.length - 1)];

    const workloads = [10, 20, 30, 40];
    const workload = workloads[randomInt(0, workloads.length - 1)];

    const now = new Date();

    const age = randomInt(dtoIn.age.min, dtoIn.age.max);

    const birth = new Date(now);
    birth.setUTCFullYear(now.getUTCFullYear() - age);

    // Zajištěná unikátnost narozenin
    birth.setTime(birth.getTime() - i);

    const birthdate = birth.toISOString();

    const employee = {
      gender,
      birthdate,
      name,
      surname,
      workload
    };

    dtoOut.push(employee);
  }

  return dtoOut;
}
