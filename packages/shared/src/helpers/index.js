// Format date to readable string
export const formatDate = (date) => {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

// Capitalise first letter of a string
export const capitalise = (str)=> {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Check if a value is empty
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  return false;
};