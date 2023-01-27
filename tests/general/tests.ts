function generate() {
  const letters = [
    "a", "b", "c", "d",
    "e", "f", "g", "h",
    "i", "j", "k", "l",
    "m", "n", "o", "p",
    "q", "r", "s", "t",
    "u", "v", "w", "x",
    "y", "z"
  ];
  
  const id = new Array(25)
    .fill("-")
    .map(char => letters[Math.floor(Math.random() * letters.length)])
    .join("");

  return id;
}