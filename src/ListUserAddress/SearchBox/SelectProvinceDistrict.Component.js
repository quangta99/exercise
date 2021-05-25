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
}) => {
  const classes = useStyles();
  const onSelectOption = (_, options, reason) => {
    if (reason === "remove-option" || reason === "select-option") {
      if (type === "province") {
        setSearch((pre) => ({
          ...pre,
          province: options.province_id,
          district: "",
        }));
        setDistrict([]);
      }

      if (type === "district")
        setSearch((pre) => ({ ...pre, district: options.district_id }));
    }
    if (reason === "clear") {
      if (type === "province") {
        setSearch((prev) => ({
          ...prev,
          province: "",
          district: "",
        }));
        setDistrict([]);
      }
      if (type === "district") {
        setSearch((prev) => ({
          ...prev,
          district: "",
        }));
      }
    }
  };

  return (
    <div>
      <Autocomplete
        id={lable}
        options={values}
        disabled={!values.length}
        classes={{
          option: classes.option,
        }}
        onChange={onSelectOption}
        getOptionLabel={(option) =>
          option.province_name ? option.province_name : option.district_name
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={lable}
            variant="filled"
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
