import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./index.css";

import {deleteData} from '../../Services'
import { SortField } from "./Sort";

const TableData = ({ dataHandle, setDataHandle }) => {
  const [type, setType] = useState(true);
  const handleSort = (sortField) => {
    setDataHandle((pre) => ({
      ...pre,
      data: SortField(dataHandle.data, sortField, type),
    }));
    setType(!type);
  };

  const handleDelete = (id) => {
    deleteData(id)
    setDataHandle((pre) => ({
      ...pre,
      fetchAgain: true,
    }));
  };

  return (
    <div className="mt-4">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "black" }}>
              <TableCell
                className="table-cell"
                onClick={() => handleSort("address")}
              >
                <p className="table-header-title">Address</p>
              </TableCell>
              <TableCell
                className="table-cell"
                onClick={() => handleSort("typeOfAddress")}
              >
                <p className="table-header-title">Type of Address</p>
              </TableCell>
              <TableCell
                className="table-cell"
                onClick={() => handleSort("province_name")}
              >
                <p className="table-header-title">Province</p>
              </TableCell>
              <TableCell className="table-cell">
                <p className="table-header-title">District</p>
              </TableCell>
              <TableCell className="table-cell"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataHandle.data ? (
              dataHandle.data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{row.address}</TableCell>
                  <TableCell align="left">{row.typeOfAddress}</TableCell>
                  <TableCell align="left">
                    {row.province.province_name}
                  </TableCell>
                  <TableCell align="left">
                    {row.district.district_name}
                  </TableCell>
                  <TableCell align="left">
                    <div className="flex align-items-center">
                      <Link style={{textDecoration: 'none'}} to={`/${row.id}`}>
                        <Button variant="text" color="primary" className="p-2">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="text"
                        color="secondary"
                        className="p-2"
                        onClick={() => handleDelete(row.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <div className="no-data">No Data</div>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default TableData;
