import GlobalTable from "../../components/ui/table";
import { useEffect, useState } from "react";
import { getDataFromCookie } from "@data-service";
import { services } from "@service";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Modal from '../../components/modal/services'
const index = () => {
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(false);
  const [params] = useState({
    page: 1,
    limit: 10,
    owner_id: getDataFromCookie("user_id"),
  });
  const getData = async () => {
    setLoading(true);
    try {
      const response = await services.get_services(params);
      response?.data?.services.forEach((item: any, index: number) => {
        item.index = index + 1;
      });
      setData(response?.data?.services);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [params]);
  const headers = [
    { title: "№", value: "index" },
    { title: "Xizmat nomi", value: "name" },
    { title: "Xizmat narxi", value: "price" },
    { title: "", value: "action" },
  ];
  return (
    <div>
      <div className="py-3 flex justify-between items-center">
        <div className="w-96">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "400",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Qidiruv"
              inputProps={{ "aria-label": "Search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <Modal getData={getData}/>
      </div>
      <GlobalTable headers={headers} body={data} isLoading={isloading} getData={getData}/>
    </div>
  );
};

export default index;
