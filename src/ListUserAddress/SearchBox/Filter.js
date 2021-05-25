export const filter = (search, data) => {
  data = data.filter((item) =>
    item.address.includes(search.address.toLowerCase())
  );
  if (search.typeOfAddress) {
    data = data.filter(
      (item) => item.typeOfAddress.toString() === search.typeOfAddress
    );
  }
  if (search.province !== 0) {
    data = data.filter(
      (item) => item.province.province_id.toString() === search.province
    );
  }
  if (search.district !== 0) {
    data = data.filter(
      (item) => item.district.district_id.toString() === search.district
    );
  }

  return data;
};
