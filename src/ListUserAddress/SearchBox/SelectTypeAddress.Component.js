const SelectTypeAddress = ({ setData, data }) => {
  const handleChange = (e) => {
    setData((pre) => ({ ...pre, typeOfAddress: e.target.value }));
  };
  return (
    <select
      onChange={handleChange}
      value={data.typeOfAddress}
      name="type"
      variant="outlined"
      className="w-100 h-100 select-area"
    >
      <option className="cursor-pointer" value="">
        Type
      </option>
      <option className="cursor-pointer" value="Home">
        Home
      </option>
      <option className="cursor-pointer" value="Work">
        Work
      </option>
    </select>
  );
};
export default SelectTypeAddress;
