module.exports = function findEmptyField(obj) {
  for (const field in obj) {
    if (obj[field] === null || obj[field] === undefined) return false;
    if (!obj[field].toString().trim()) {
      return false;
    }
  }
  return true;
}
