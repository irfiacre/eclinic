const firstNames = ['Odile'];
const lastNames = ['Iradukunda'];

export const mockNidaApi = (): { firstName: string; lastName: string } => {
  const randomFirstName =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];

  return { firstName: randomFirstName, lastName: randomLastName };
};
