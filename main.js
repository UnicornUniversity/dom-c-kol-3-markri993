// Pomocná funkce pro získání náhodného celého čísla včetně obou hran.
// Používám ji na výběr jména, příjmení, úvazku i náhodného věku.
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Seznam křestních jmen, ze kterých se náhodně vybírá.
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

// Seznam příjmení pro generování zaměstnanců.
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

// Hlavní funkce úkolu. Přijímá vstupní objekt dtoIn a vrací pole generovaných zaměstnanců.
// Funkce esport pro automatické testy na GitHubu.
export function main(dtoIn) {

  // Výstupní seznam zaměstnanců, do kterého se vkládají vytvořené objekty.
  const dtoOut = [];

  // Základní validace vstupu – kontrola, zda vůbec nějaký vstup existuje.
  if (!dtoIn) return dtoOut;

  // Kontrola počtu generovaných zaměstnanců – musí být kladné číslo.
  if (typeof dtoIn.count !== "number" || dtoIn.count < 1)
    return dtoOut;

  // Kontrola, že věkový rozsah existuje a obsahuje číselné hodnoty.
  if (
    !dtoIn.age ||
    typeof dtoIn.age.min !== "number" ||
    typeof dtoIn.age.max !== "number"
  ) {
    return dtoOut;
  }

  // Hlavní generovací cyklus – proběhne tolikrát, kolik zaměstnanců chceme vytvořit.
  for (let i = 0; i < dtoIn.count; i++) {

    // Náhodný výběr pohlaví.
    const gender = Math.random() < 0.5 ? "male" : "female";

    // Náhodné jméno a příjmení z předpřipravených seznamů výše.
    const name = names[randomInt(0, names.length - 1)];
    const surname = surnames[randomInt(0, surnames.length - 1)];

    // Náhodně zvolený pracovní úvazek.
    const workloads = [10, 20, 30, 40];
    const workload = workloads[randomInt(0, workloads.length - 1)];

    // Aktuální datum použité k výpočtu náhodného věku.
    const now = new Date();

    // Náhodně zvolený věk v zadaném rozsahu (min, max).
    const age = randomInt(dtoIn.age.min, dtoIn.age.max);

    // Vytvoření základního data narození – odečte se celý počet let.
    const birth = new Date(now);
    birth.setUTCFullYear(now.getUTCFullYear() - age);

    /*Aby měl každý zaměstnanec unikátní datum narození až do milisekundy,
    posunu datum o malý počet milisekund směrem dozadu.
    Posun je velmi malý, takže nemění skutečný věk mimo toleranci,
    ale zaručí jedinečnost pro automatické testy.*/
    birth.setTime(birth.getTime() - (i + 1));

    // Převedení data narození do ISO formátu.
    const birthdate = birth.toISOString();

    // Vytvoření objektu zaměstnance ve formátu požadovaném zadáním.
    const employee = {
      gender,
      birthdate,
      name,
      surname,
      workload
    };

    // Přidání vytvořeného zaměstnance do výstupního pole.
    dtoOut.push(employee);
  }

  // Vrácení hotového pole zaměstnanců.
  return dtoOut;
}
