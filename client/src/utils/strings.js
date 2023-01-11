export const toSentenceCase = (word) => {
  if (!word || typeof word !== "string" || word.length === 0) return word;
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const showGender = (gender) => {
  return gender === "m" ? "Male" : gender === "f" ? "Female" : "Others";
};
