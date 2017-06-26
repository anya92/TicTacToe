export const whoStartsFirst = () => {
  const randomNumber = Math.random() * 10;
  const firstMove = (randomNumber >= 5) ? 'player' : 'computer';
  return firstMove;
}
