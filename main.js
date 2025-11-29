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

    // milisekundový posun – zajišťuje unikátnost
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
