function getTodayDate() {
  const today = new Date();
  const date = ("0" + today.getDate()).slice(-2);
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const year = today.getFullYear();
  const stringDate = year + "-" + month + "-" + date;
  return stringDate;
}

module.exports = { getTodayDate };
