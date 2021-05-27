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
      if (type === "province") {
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
          ward: {
            ward_id: undefined,
            ward_name: "",
          },
        }));
      }

      if (type === "district") {
        setValidation((pre) => ({ ...pre, district: false }));
        setData((pre) => ({
          ...pre,
          district: {
            district_id: options.district_id,
            district_name: options.district_name,
          },
          ward: {
            ward_id: undefined,
            ward_name: "",
          },
        }));
      }
      if (type === "ward") {
        setValidation((pre) => ({ ...pre, ward: false }));
        setData((pre) => ({
          ...pre,
          ward: {
            ward_id: options.ward_id,
            ward_name: options.ward_name,
          },
        }));
      }
    }
    if (reason === "clear") {
      if (type === "province") {
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
          ward: {
            ward_id: undefined,
            ward_name: "",
          },
        }));
      }
      if (type === "district") {
        setData((pre) => ({
          ...pre,
          district: {
            district_id: undefined,
            district_name: "",
          },
          ward: {
            ward_id: undefined,
            ward_name: "",
          },
        }));
      }
      if (type === "ward") {
        setData((pre) => ({
          ...pre,
          ward: {
            ward_id: undefined,
            ward_name: "",
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
        value={data[type]}
        onChange={onSelectOption}
        getOptionSelected={(option, value) =>
          option[type + "_id"] === value[type + "_id"] &&
          option[type + "_name"] === value[type + "_name"]
        }
        getOptionLabel={(option) => option[type + "_name"]}
        renderInput={(params) => (
          <TextField
            {...params}
            label={lable}
            variant="outlined"
            id={lable}
            error={error}
            value={data[type][type + "_name"]}
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
