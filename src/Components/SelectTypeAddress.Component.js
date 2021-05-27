import { FormControl, Select, MenuItem, InputLabel } from "@material-ui/core";

const SelectTypeAddress = ({ setData, data, error, setValidation }) => {
  const handleChange = (e) => {
    setData((pre) => ({ ...pre, typeOfAddress: e.target.value }));
    setValidation && setValidation((pre) => ({ ...pre, typeOfAddress: false }));
  };
  return (
    <FormControl style={{ width: "100%" }} variant="filled">
      <InputLabel error={error} htmlFor="filled-age-native-simple">Type</InputLabel>
      <Select
        onChange={handleChange}
        value={data.typeOfAddress}
        name="type"
        variant="outlined"
        error={error}
      >
        <MenuItem className="cursor-pointer" value="home">
          Home
        </MenuItem>
        <MenuItem className="cursor-pointer" value="work">
          Work
        </MenuItem>
      </Select>
    </FormControl>
  );
};
export default SelectTypeAddress;
