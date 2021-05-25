import { useStoreState } from "easy-peasy";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const TableData = () => {
  const data = useStoreState((state) => state.dataUser.data);

  return (
    <div className="mt-4">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "black" }}>
              <TableCell style={{ color: "white" }}>Address</TableCell>
              <TableCell style={{ color: "white" }}>Type of Address</TableCell>
              <TableCell style={{ color: "white" }}>Province</TableCell>
              <TableCell style={{ color: "white" }}>District</TableCell>
              <TableCell style={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length &&
              data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{row.address}</TableCell>
                  <TableCell align="left">{row.typeOfAddress}</TableCell>
                  <TableCell align="left">
                    {row.province.province_name}
                  </TableCell>
                  <TableCell align="left">
                    {row.district.district_name}
                  </TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default TableData;
