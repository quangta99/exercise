export const SortField = (data, sortedField, type, sortFieldSub) => {
  if (type) {
    data.sort((a, b) => {
      if (
        sortFieldSub
          ? a[sortedField][sortFieldSub] > b[sortedField][sortFieldSub]
          : a[sortedField] > b[sortedField]
      ) {
        return 1;
      }
      if (
        sortFieldSub
          ? a[sortedField][sortFieldSub] < b[sortedField][sortFieldSub]
          : a[sortedField] < b[sortedField]
      ) {
        return -1;
      }
      return 0;
    });
  } else {
    data.sort((a, b) => {
      if (
        sortFieldSub
          ? a[sortedField][sortFieldSub] < b[sortedField][sortFieldSub]
          : a[sortedField] < b[sortedField]
      ) {
        return 1;
      }
      if (
        sortFieldSub
          ? a[sortedField][sortFieldSub] > b[sortedField][sortFieldSub]
          : a[sortedField] > b[sortedField]
      ) {
        return -1;
      }
      return 0;
    });
  }
  return data;
};
