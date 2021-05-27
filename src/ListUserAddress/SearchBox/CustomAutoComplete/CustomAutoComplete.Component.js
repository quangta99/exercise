import { useEffect, useState } from "react";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import "./CustomAutoComplete.css";

const CustomAutoComplete = ({
  values,
  lable,
  type,
  setDistrict,
  setWard,
  setSearch,
  search,
}) => {
  const [openOptions, setOpenOptions] = useState(false);
  const [input, setInput] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    (() => {
      setOptions(values);
      if (type === "province") setInput(search.province.province_name);
      if (type === "district") setInput(search.district.district_name);
    })();
  }, [search, type, values, setSearch]);

  const handleChangeInput = (e) => {
    setInput(e.target.value);
    const data = values.filter((item) =>
      item[type + "_name"]
        .toLowerCase()
        .includes(e.target.value.toString().toLowerCase())
    );

    setOptions(data);
  };

  const handleSelect = (option) => {
    if (type === "province") {
      setSearch((pre) => ({
        ...pre,
        province: {
          province_id: option.province_id,
          province_name: option.province_name,
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
      setInput(option.province_name);
    }
    if (type === "district") {
      setSearch((pre) => ({
        ...pre,
        district: {
          district_id: option.district_id,
          district_name: option.district_name,
        },
        ward: {
          ward_id: undefined,
          ward_name: "",
        },
      }));
      setInput(option.district_name);
    }
    if (type === "ward") {
      setSearch((pre) => ({
        ...pre,
        ward: {
          ward_id: option.ward_id,
          ward_name: option.ward_name,
        },
      }));
      setInput(option.ward_name);
    }
    setOpenOptions(false);
  };

  const handleClear = () => {
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
        ward: {
          ward_id: undefined,
          ward_name: "",
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
        ward: {
          ward_id: undefined,
          ward_name: "",
        },
      }));
      setWard([]);
    }
    if (type === "ward") {
      setSearch((pre) => ({
        ...pre,
        ward: {
          ward_id: undefined,
          ward_name: "",
        },
      }));
    }
  };

  const handleBlur = (e) => {
    setOpenOptions(false);
  };

  return (
    <div className="auto-area h-100">
      <div className="search-area align-items-center justify-content-center">
        <div>
          <input
            onClick={() => setOpenOptions(true)}
            value={input}
            onChange={handleChangeInput}
            placeholder={lable}
            onBlur={handleBlur}
            tabIndex={1}
          />
        </div>
        <div className="button-area">
          <button className="btn clear-button" onClick={handleClear}>
            X
          </button>
          <button
            onClick={() => setOpenOptions(!openOptions)}
            className="btn open-options-button"
          >
            <ArrowDropDownIcon />
          </button>
        </div>
      </div>
      {openOptions && (
        <div className="mt-2 options-area">
          {options.length ? (
            options.map((item) => (
              <div
                key={item[type + "_name"]}
                onMouseDown={() => handleSelect(item)}
                className="options"
                tabIndex={0}
              >
                <div className="option">{item[type + "_name"]}</div>
              </div>
            ))
          ) : (
            <div className="option">No Options</div>
          )}
        </div>
      )}
    </div>
  );
};
export default CustomAutoComplete;
