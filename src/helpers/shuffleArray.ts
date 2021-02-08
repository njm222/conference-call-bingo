// A helper function to shuffle a 1D array (Fisher-Yates shuffle - https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)

export default (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
