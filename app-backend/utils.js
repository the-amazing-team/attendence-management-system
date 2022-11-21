function convertDateInstanceToNormalDate(dateInstance) {
  const date = ("0" + dateInstance.getDate()).slice(-2);
  const month = ("0" + (dateInstance.getMonth() + 1)).slice(-2);
  const year = dateInstance.getFullYear();
  const stringDate = year + "-" + month + "-" + date;
  return stringDate;
}

function generateUUID() {
  return Date.now();
}

module.exports = { convertDateInstanceToNormalDate, generateUUID };
