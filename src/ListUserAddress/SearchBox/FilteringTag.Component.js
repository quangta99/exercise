import { Chip } from "@material-ui/core";

const FilteringTag = ({ search, setSearch, handleSubmit, setDataHandle }) => {
  const handleDeleteTypeOfAddress = async () => {
    setSearch((pre) => ({ ...pre, typeOfAddress: "" }));
    await setDataHandle((pre) => ({ ...pre, fetchAgain: true }));
    handleSubmit();
  };
  const handleDeleteProvince = async () => {
    await setDataHandle((pre) => ({ ...pre, fetchAgain: true }));
    setSearch((prev) => ({
      ...prev,
      province: {
        province_id: undefined,
        province_name: "",
      },
      district: {
        district_id: undefined,
        district_name: "",
      },
    }));
    handleSubmit();
  };
  const handleDeleteDistrict = async () => {
    setSearch((prev) => ({
      ...prev,
      district: {
        district_id: undefined,
        district_name: "",
      },
    }));
    await setDataHandle((pre) => ({ ...pre, fetchAgain: true }));
    handleSubmit();
  };
  return (
    <div className="flex mt-2">
      <h6>Filtering: </h6>
      {search.typeOfAddress && (
        <Chip
          className="m-1"
          label={search.typeOfAddress}
          onDelete={handleDeleteTypeOfAddress}
        />
      )}
      {search.province.province_id && (
        <Chip
          className="m-1"
          label={search.province.province_name}
          onDelete={handleDeleteProvince}
        />
      )}
      {search.district.district_id && (
        <Chip
          className="m-1"
          label={search.district.district_name}
          onDelete={handleDeleteDistrict}
        />
      )}
    </div>
  );
};
export default FilteringTag;
