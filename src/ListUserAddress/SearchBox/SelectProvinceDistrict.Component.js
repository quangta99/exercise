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
  setData,
  values,
  lable,
  type,
  setDistrict,
  search,
}) => {
  const classes = useStyles();
  const onSelectOption = (_, options, reason) => {
    console.log(reason);
    if (reason === "remove-option" || reason === "select-option") {
      if (type === "province") {
        setData((pre) => ({
          ...pre,
          province: options.province_id,
          district: undefined,
        }));
        setDistrict([]);
      }

      if (type === "district") {
        setData((pre) => ({ ...pre, district: options.district_id }));
      }
    }
    if (reason === "clear") {
      if (type === "province") {
        setData((prev) => ({
          ...prev,
          province: undefined,
          district: undefined,
        }));
        setDistrict([]);
      }
      if (type === "district") {
        setData((prev) => ({
          ...prev,
          district: undefined,
        }));
      }
    }
  };

  return (
    <div>
      <Autocomplete
        id={lable}
        options={values}
        // value={type === "province" ? search.province : search.district}
        disabled={values.length < 1}
        classes={{
          option: classes.option,
        }}
        onChange={onSelectOption}
        getOptionLabel={(option) =>
          option.province_name ? option.province_name : option.district_name
        }
        // getOptionSelected={(option, value) =>
        //   type === "province"
        //     ? option.province_id === value
        //     : option.district_id === value
        // }
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
