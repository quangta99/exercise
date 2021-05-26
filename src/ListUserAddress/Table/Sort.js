export const SortField = (data, sortedField, type) => {
  if(type) {
    data.sort((a, b) => {
      if (a[sortedField] > b[sortedField]) {
        return 1;
      }
      if (a[sortedField] < b[sortedField]) {
        return -1;
      }
      return 0;
  })}
  else {
    data.sort((a, b) => {
      if (a[sortedField] < b[sortedField]) {
        return 1;
      }
      if (a[sortedField] > b[sortedField]) {
        return -1;
      }
      return 0;
  })}
  return data;
};
