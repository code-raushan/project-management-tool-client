import moment from "moment";

export function getDateAsString(): string {
  return moment().format("Do MMMM YYYY");
}
export function convertDateAsString(date: string): string {
  return moment(date).format("Do MMMM YYYY");
}

export function isCurrentDateBeforeDate(givenDate: string): boolean {
  return (
    new Date().setHours(0, 0, 0, 0) <= new Date(givenDate).setHours(0, 0, 0, 0)
  );
}

export function getDateInYYYYMMDD(defaultDate?: string): string {
  let dateObj;

  if (defaultDate) {
    dateObj = new Date(defaultDate);
  } else {
    dateObj = new Date();
  }

  const year = dateObj.getFullYear().toString();
  const month = (dateObj.getMonth() + 1).toString();
  const date = dateObj.getDate().toString();

  let updatedMonth = month;
  if (month.length == 1) {
    updatedMonth = "0";
    updatedMonth += month;
  }

  let updatedDate = date;
  if (date.length == 1) {
    updatedDate = "0";
    updatedDate += date;
  }
  return year + "-" + updatedMonth + "-" + updatedDate;
}

export function getDateInDDMMYYYY(): string {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = today.getMonth() + 1; // Months start at 0!
  const dd = today.getDate();
  let date = dd.toString();
  let month = mm.toString();
  if (dd < 10) date = "0" + dd;
  if (mm < 10) month = "0" + mm;
  const formattedToday = date + "/" + month + "/" + yyyy;
  return formattedToday;
}
export function getDatesBetween(startDate: string, endDate: string) {
  console.log({ startDate, endDate });
  // Helper function to parse a date in DD-MM-YYYY format

  function parseDate(dateStr: string) {
    let [day, month, year] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  // Parse the input dates
  let start = parseDate(startDate);
  let end = parseDate(endDate);

  // Array of weekday names
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Initialize an array to hold the dates
  let dateArray = [];

  // Generate dates between the start and end date
  while (start <= end) {
    // Format the date as DD-MM-YYYY
    let day = String(start.getDate()).padStart(2, "0");
    let month = String(start.getMonth() + 1).padStart(2, "0");
    let year = start.getFullYear();

    // Get the weekday
    let weekday = weekdays[start.getDay()];

    // Add formatted date to the array
    dateArray.push(`${day}-${month}-${year} (${weekday})`);
    // dateArray.push(`${day}-${month}-${year}`);

    // Move to the next day
    start.setDate(start.getDate() + 1);
  }

  return dateArray;
}

export function getWeekDay(date: string) {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function parseDate(dateStr: string) {
    let [day, month, year] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  let parsedDate = parseDate(date);

  let weekday = weekdays[parsedDate.getDay()];

  return weekday;
}
