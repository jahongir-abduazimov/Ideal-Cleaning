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
// import Notification from "../../utils/notification";
// import { ToastContainer } from "react-toastify";

const GlobalTable = ({ headers, body, isLoading, getData }: TableProps) => {
  const deleteItem = async (id: number) => {
    try {
      const response = await services.delete_services(id);
      if (response.status === 200) {
        getData();
        // Notification({
        //   title: "xizmat muvaffaqiyatli o'chirildi",
        //   type: "success",
        // });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const editItem = (id: number) => {
    console.log(id);
  };
  return (
    <>
      {/* <ToastContainer /> */}
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
                              <div className="flex gap-4 items-center">
                                <img
                                  className="border border-gray-300 py-2 px-[9px] rounded-md active:bg-gray-300 duration-150 bg-gray-200 cursor-pointer"
                                  src={del}
                                  alt="delate"
                                  onClick={() => deleteItem(item.id)}
                                />
                                <img
                                  className="border border-gray-300 p-[9px] rounded-md active:bg-gray-300 duration-150 bg-gray-200 cursor-pointer"
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
    </>
  );
};

export default GlobalTable;
