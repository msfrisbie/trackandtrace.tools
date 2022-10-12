export function generateRandomTag() {
  var result = "";
  var characters = "ABCDEF0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 24; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
