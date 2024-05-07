import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { Skeleton } from "@mui/material";
import { TableProps } from "@global-interface";
import del from "../../assets/delete-icon.svg";
import edit from "../../assets/edit-icon.svg";
import { services } from "@service";
// import { useState } from "react";

const GlobalTable = ({ headers, body, isLoading }: TableProps) => {
  // const [isBody, setBody] = useState(body);
  const deleteItem = async (id: number) => {
    try {
      await services.delete_services(id);
      // setBody(body.filter((item) => item.id!== id));
    } catch (error) {
      console.error(error);
    }
  };
  const editItem = (id: number) => {
    console.log(id);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableHead>
              <TableRow>
                {headers?.map((header, index) => (
                  <TableCell key={index}>
                    <TableSortLabel>{header.title}</TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading
                ? Array.from(new Array(5)).map((_, index) => (
                    <TableRow key={index}>
                      {headers?.map((_, i) => (
                        <TableCell key={i}>
                          <Skeleton />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : body?.map((item, index) => (
                    <TableRow key={index}>
                      {headers?.map((header, i) => (
                        <TableCell
                          key={i}
                          className={item[header.value]?.class}
                        >
                          {header.value === "action" ? (
                            <div className="flex gap-3 cursor-pointer items-center">
                              <img
                                src={del}
                                alt="delate"
                                onClick={() => deleteItem(item.id)}
                              />
                              <img
                                src={edit}
                                alt="edit"
                                onClick={() => editItem(item.id)}
                              />
                            </div>
                          ) : item[header.value].title ? (
                            item[header.value].title
                          ) : (
                            item[header.value]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default GlobalTable;
