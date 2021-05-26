export const filter = (search, data) => {
  data = data.filter((item) =>
    item.address.includes(search.address.toLowerCase())
  );
  if (search.typeOfAddress) {
    data = data.filter(
      (item) => item.typeOfAddress.toString() === search.typeOfAddress
    );
  }
  if (search.province !== undefined) {
    data = data.filter(
      (item) => item.province.province_id === search.province
    );
  }
  if (search.district !== undefined) {
    data = data.filter(
      (item) => item.district.district_id === search.district
    );
  }
  return data;
};
