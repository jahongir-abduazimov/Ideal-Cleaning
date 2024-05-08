import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Notification from '../../../utils/notification'
// import { Field, Formik } from "formik";
// import { Form } from "react-router-dom";
import { TextField } from "@mui/material";
import { getDataFromCookie } from "@data-service";
import { services } from "@service";
import { ToastContainer } from "react-toastify";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({getData}:any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const postData = async (e: any) => {
    e.preventDefault();
    const payload: any = {
      name: e.target[0].value,
      price: +e.target[2].value,
      owner_id: getDataFromCookie("user_id"),
    };
    try {
      const response = await services.post_services(payload);
      console.log(response);
      if (response.status === 201) {
        handleClose();
        getData()
        Notification({
          title: "Xizmat muvaffaqiyatli qo'shildi",
          type: "success",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
    <div>
      <ToastContainer />
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Xizmat qo'shish
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Xizmat qo'shish
          </Typography>
          <form onSubmit={(e) => postData(e)}>
            <label className="block w-full p-[10px]">
              <TextField
                className="w-full"
                label="Xizmat nomini kiriting"
                id="Outlined"
                variant="outlined"
              />
            </label>
            <label className="block w-full p-[10px]">
              <TextField
                autoComplete="off"
                className="w-full"
                label="Xizmat narxini kiriting"
                id="Outlined"
                variant="outlined"
                type="number"
              />
            </label>
            <Button
              type="submit"
              variant="contained"
              fullWidth
            >
              Qo'shish
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
