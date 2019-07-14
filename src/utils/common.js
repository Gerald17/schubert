export const getOptions = options => {
  return options.map(option => {
    return { value: option.id, name: option.name };
  });
};

export const dateFormat = "YYYY-MM-DD";

export const formatDateYYYYMMDD = dateToFormat => {
  const date = new Date(dateToFormat);
  const year = date.getFullYear();
  const month = `${(date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() +1 )}`;
  const day = `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
  const newFormat = [year, month, day].join("-");
  return newFormat;
};
