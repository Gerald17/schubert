export const getOptions = options => {
  return options.map(option => {
    return { value: option.id, name: option.name };
  });
};
