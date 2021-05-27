import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

const SelectProvinceDistrict = ({
  setSearch,
  values,
  lable,
  type,
  setDistrict,
  search,
}) => {
  const classes = useStyles();
  const onSelectOption = (_, options, reason) => {
    if (reason === "remove-option" || reason === "select-option") {
      if (type === "province") {
        setSearch((pre) => ({
          ...pre,
          province: {
            province_id: options.province_id,
            province_name: options.province_name,
          },
          district: {
            district_id: undefined,
            district_name: "",
          },
        }));
        setDistrict([]);
      }

      if (type === "district") {
        setSearch((pre) => ({
          ...pre,
          district: {
            district_id: options.district_id,
            district_name: options.district_name,
          },
        }));
      }
    }
    if (reason === "clear") {
      if (type === "province") {
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
        setDistrict([]);
      }
      if (type === "district") {
        setSearch((prev) => ({
          ...prev,
          district: {
            district_id: undefined,
            district_name: "",
          },
        }));
      }
    }
  };

  return (
    <div>
      <Autocomplete
        id={lable}
        options={values}
        value={type === "province" ? search.province : search.district}
        disabled={values.length < 1}
        classes={{
          option: classes.option,
        }}
        onChange={onSelectOption}
        getOptionLabel={(option) =>
          type === "province" ? option?.province_name : option?.district_name
        }
        getOptionSelected={(option, value) =>
          type === "province"
            ? option?.province_id === value?.province_id &&
              option?.province_name === value?.province_name
            : option?.district_id === value?.district_id &&
              option?.district_name === value?.district_name
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={lable}
            variant="outlined"
            id={lable}
            inputProps={{
              ...params.inputProps,
            }}
          />
        )}
      />
    </div>
  );
};
export default SelectProvinceDistrict;
