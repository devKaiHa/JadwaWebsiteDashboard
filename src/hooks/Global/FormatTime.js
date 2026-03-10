import PropTypes from "prop-types";

const FormatTime = (time) => {
  if (!time) return "";

  // Convert time to Date object
  const date = new Date(time);

  // Format date and time manually
  const formattedDate = date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
  const hours = String(date.getHours() - 3).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${formattedDate} ${hours}:${minutes}`;
};

// Prop validation
FormatTime.propTypes = {
  time: PropTypes.string.isRequired,
};

export default FormatTime;
