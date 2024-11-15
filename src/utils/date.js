const formatDate = (dateString) => {
  const expiryDate = new Date(dateString);
  const year = expiryDate.getFullYear();
  const month = (expiryDate.getMonth() + 1).toString().padStart(2, "0");
  const day = expiryDate.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const calculateEndDate = (subscription) => {
  let duration = subscription?.duration;
  let durationMode = subscription?.durationMode;
  let endDate = null;
  let startDate = new Date();

  if (!endDate) {
    if (duration && durationMode) {
      if (durationMode === "months") {
        let newEndDate = new Date(startDate);
        newEndDate.setMonth(newEndDate.getMonth() + duration);
        endDate = newEndDate;
      } else if (durationMode === "years") {
        let newEndDate = new Date(startDate);
        newEndDate.setFullYear(newEndDate.getFullYear() + duration);
        endDate = newEndDate;
      } else if (durationMode === "days") {
        let newEndDate = new Date(startDate);
        newEndDate.setDate(newEndDate.getDate() + duration);
        endDate = newEndDate;
      }
    }
  }
  return new Date(endDate).toISOString();
};

const formatLastLogin = (dateString) => {
  if (dateString) {
      const date = new Date(dateString);
      // Check if the date is valid
      if (!isNaN(date.getTime())) {
          const options = {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
          };
          return date.toLocaleString(undefined, options);
      } else {
          // Date is invalid
          return "No activity";
      }
  } else {
      // No date provided
      return "No activity";
  }
};


export { formatDate, calculateEndDate, formatLastLogin };
