export const validate = (data) => {
  const validate = {
    address: false,
    typeOfAddress: false,
    province: false,
    district: false,
    ward: false,
  };
  if (data.address === "") {
    validate.address = true;
  }
  if (data.typeOfAddress === "") {
    validate.typeOfAddress = true;
  }
  if (data.province.province_id === undefined) {
    validate.province = true;
  }
  if (data.district.district_id === undefined) {
    validate.district = true;
  }
  if (data.ward.ward_id === undefined) {
    validate.ward = true;
  }
  return validate;
};
