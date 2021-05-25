import { FormControl, Select } from "@material-ui/core";

const SelectTypeAddress = ({ setSearch, search }) => {
  const handleChange = (e) => {
    setSearch((pre) => ({ ...pre, typeOfAddress: e.target.value }));
  };
  return (
    <FormControl style={{ width: "100%" }} variant="filled">
      <Select
        onChange={handleChange}
        value={search.typeOfAddress}
        name="type"
        variant="filled"
        placeholder="Select Type"
      >
        <option value="">Select Type</option>
        <option value="home">Home</option>
        <option value="work">Work</option>
      </Select>
    </FormControl>
  );
};
export default SelectTypeAddress;
