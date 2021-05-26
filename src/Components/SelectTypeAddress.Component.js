import { FormControl, Select, MenuItem, InputLabel } from "@material-ui/core";

const SelectTypeAddress = ({ setData, data }) => {
  const handleChange = (e) => {
    setData((pre) => ({ ...pre, typeOfAddress: e.target.value }));
  };
  return (
    <FormControl style={{ width: "100%" }} variant="filled">
      <InputLabel htmlFor="filled-age-native-simple">Type of Address</InputLabel>
      <Select
        onChange={handleChange}
        value={data.typeOfAddress}
        name="type"
        variant="filled"
      >
        <MenuItem className="cursor-pointer" value="home">Home</MenuItem>
        <MenuItem className="cursor-pointer" value="work">Work</MenuItem>
      </Select>
    </FormControl>
  );
};
export default SelectTypeAddress;
