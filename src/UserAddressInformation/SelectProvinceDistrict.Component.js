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
  data,
  error,
  setValidation,
}) => {
  const classes = useStyles();
  const onSelectOption = (_, options, reason) => {
    if (reason === "remove-option" || reason === "select-option") {
      if (type === "province_edit") {
        setValidation((pre) => ({ ...pre, province: false }));
        setData((pre) => ({
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
      }

      if (type === "district_edit") {
        setValidation((pre) => ({ ...pre, district: false }));
        setData((pre) => ({
          ...pre,
          district: {
            district_id: options.district_id,
            district_name: options.district_name,
          },
        }));
      }
    }
    if (reason === "clear") {
      if (type === "province_edit") {
        setData((pre) => ({
          ...pre,
          province: {
            province_id: undefined,
            province_name: "",
          },
          district: {
            district_id: undefined,
            district_name: "",
          },
        }));
      }
      if (type === "district_edit") {
        setData((pre) => ({
          ...pre,
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
        disabled={!values.length}
        classes={{
          option: classes.option,
        }}
        value={type === "province_edit" ? data.province : data.district}
        onChange={onSelectOption}
        getOptionSelected={(option, value) =>
          type === "province_edit"
            ? option?.province_id === value?.province_id &&
              option?.province_name === value?.province_name
            : option?.district_id === value?.district_id &&
              option?.district_name === value?.district_name
        }
        getOptionLabel={(option) =>
          type === "province_edit"
            ? option?.province_name
            : option?.district_name
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={lable}
            variant="filled"
            id={lable}
            error={error}
            value={
              type === "province_edit"
                ? data.province.province_name
                : data.district.district_name
            }
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
