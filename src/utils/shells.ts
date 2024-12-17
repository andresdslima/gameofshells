export const getShells = (quantity: number) => {
  const shells = [];
  for (let i = 0; i < quantity; i++) {
    shells.push({
      id: i,
    });
  }
  return shells;
};

export const shuffleBall = (max: number) => {
  return Math.floor(Math.random() * max);
};
