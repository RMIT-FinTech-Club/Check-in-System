/**
 * Validate the student sID whether it is currently in the correct format
 * @param {String} sID - the student sID
 */
function validatesID(sID) {
  function isNumber(char) {
    return /^\d$/.test(char);
  }

  sID = sID.trim();
  if (sID.length != 8) return false;
  if (sID.charAt(0) !== "s" && sID.charAt(0) !== "S") return false;
  for (let i = 1; i < 8; i++) {
    if (!isNumber(sID.charAt(i))) return false;
  }
  return true;
}

/**
 * Validate the student name whether it is in the commonly know format
 * @param {String} name - the student name
 * @returns
 */
function validatesName(name) {
  name = name.trim();
  if (name === "") return false;
  if (name.length < 3 || name.length > 100) return false;
  return true;
}

module.exports = {
  validatesID,
  validatesName,
};
