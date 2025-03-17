export const checkOperators = (value: string) => {
  const mathOperators = new Set(["*", "+", "-", "/", "^"]);
  return mathOperators.has(value);
};
