import { useEffect, useState } from "react";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import "./CustomAutoComplete.css";

const CustomAutoComplete = ({ values, lable, type, setDistrict, setSearch, }) => {
  const [openOptions, setOpenOptions] = useState(false);
  const [input, setInput] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    (() => {
      setOptions(values);
    })();
  }, [values]);

  const handleChangeInput = (e) => {
    setInput(e.target.value);
  };

  const handleSelect = (option) => {
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
    setInput(option.province_name);
    setOpenOptions(false);
  };

  const handleClear = () => {
    setInput("");
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
  };

  return (
    <div className="auto-area">
      <div className="search-area align-items-center justify-content-center">
        <input
          onClick={() => setOpenOptions(true)}
          value={input}
          onChange={handleChangeInput}
          placeholder={lable}
        />
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
        <div
          onBlur={() => setOpenOptions(false)}
          className="w-100 mt-2 options-area"
        >
          {options.length ? (
            options.map((item) => (
              <div
                key={item.province_name}
                onClick={() => handleSelect(item)}
                className="options"
              >
                <div className="option">{item.province_name}</div>
              </div>
            ))
          ) : (
            <div>No Options</div>
          )}
        </div>
      )}
    </div>
  );
};
export default CustomAutoComplete;
