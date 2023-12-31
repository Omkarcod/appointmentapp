import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Modal,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import React, { useContext, useEffect, useState } from "react";

import DataContext from "../Datacontext";
// import FormDialog from "./PatientForm";
import FormDialog from "./Paitentform";

const Patients = () => {
  const { patients, setpatients } = useContext(DataContext);
  const [filterData, setFilterData] = useState(patients);
  const [search, setSearch] = useState("");
  const [currentPatient, setCurrentPatient] = useState([]);

  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  useEffect(
    () => {
      if (search === null || search === "") setFilterData(patients);
      else
        setFilterData(
          filterData.filter(
            (val) =>
              val.Name
                // .toString()
                .toLowerCase()
                .includes(search.toString().toLowerCase()) ||
              val.Gender.toString()
                .toLowerCase()
                .includes(search.toString().toLowerCase()) ||
              val.BloodGroup.toString()
                .toLowerCase()
                .includes(search.toString().toLowerCase()) ||
              val.Email.toString()
                .toLowerCase()
                .includes(search.toString().toLowerCase())
          )
        );
    },
    // eslint-disable-next-line
    [search, patients]
  );
  console.log(filterData);

  const displayPatient = (id) => {
    setCurrentPatient(patients.find((val) => val.Id === Number(id)));
    setOpen(true);
  };
 

  const handleDelete = (id)  => {
    setOpen(false);
    setpatients(
      patients.filter((ele) => {
        // console.log(ele.Id, id);
        return ele.Id !== Number(id)
; // Check for data type
      })
    );
  };


  console.log(currentPatient);
  return (
    <Box p={3} mt={0}>
      <Typography
        textAlign="start"
        variant="h6"
        fontWeight="bold"
        // display="inline-block"
        
        >
        PATIENTS LIST
      </Typography>
      <Box sx={{height:"5px",width:"60px",backgroundColor:"#7575ff",borderRadius:"10px"}}></Box>
      <Box display="flex" mt={1} mb={3} justifyContent="end">
        <Stack
          direction="row"
          pl={1}
          alignItems="center"
          border={1}
          borderRadius={1}>
          <TextField
            size="small"
            InputProps={{ disableUnderline: true }}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            variant="standard"></TextField>
          <IconButton
            type="button"
            aria-label="search"
            onClick={() => setSearch("")}>
            <CloseOutlinedIcon fontSize="small" />
          </IconButton>
          <Divider orientation="vertical"></Divider>
          <IconButton type="button" aria-label="search">
            <SearchIcon fontSize="small" />
          </IconButton>
        </Stack>
        <Button
          sx={{
            ml: 1,
            bgcolor: "#7575ff",
            fontSize: { xs: ".5rem", md: ".8rem" },
            ":hover": { bgcolor: "#7f7fed" },
          }}
          variant="contained"
          onClick={() => {
            setOpenForm(true);
            setCurrentPatient([]);
          }}>
          Add New Patient
        </Button>
      </Box>

      <TableContainer component={Paper}  >
        <Table aria-label="simple table" sx={{width:"100%"}}> 
      
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}> Id</TableCell> 
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Gender</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Blood Group</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Mobile Number</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterData &&
              filterData.map((row) => (
                <TableRow
                  key={row.Id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    ":hover": { bgcolor: "#f1f1f1" },
                  }}>
                  <TableCell>{row.Id}</TableCell>
                  <TableCell
                    onClick={() => displayPatient(row.Id)}
                    sx={{ color: "blue", cursor: "pointer" }}>
                    {row.Name}
                  </TableCell>
                  <TableCell>{row.Gender}</TableCell>
                  <TableCell>{row.BloodGroup}</TableCell>
                  <TableCell>{row.Mobile}</TableCell>
                  <TableCell>{row.Email}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <NestedModal
        currentPatient={currentPatient}
        open={open}
        setOpen={setOpen}
        setOpenForm={setOpenForm}
        handleDelete={handleDelete}
        // addPatient={addPatient}
      />
      <PatientInput
        openForm={openForm}
        setOpenForm={setOpenForm}
        currentPatient={currentPatient}
        setCurrentPatient={setCurrentPatient}
      />
    </Box>
  );
};

export default Patients;

const style = {
  position:'absolute',
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 410,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  outLine: "none",
  paddingBottom: 1,
};

function PatientInput({ openForm, setOpenForm, currentPatient }) {
  const handleClose = () => {
    setOpenForm(false);
  };

  return (
    <React.Fragment>
 
      <Modal
        open={openForm}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description">
        <FormDialog
          open={openForm}
          setOpen={setOpenForm}
          currentPatient={currentPatient}
        />
      </Modal>
    </React.Fragment>
  );
}

function NestedModal({
  open,
  setOpen,
  currentPatient,
  handleDelete,
  setOpenForm,
  // addPatient,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description">
        {currentPatient && (
          <Box sx={{ ...style }}>
            <Typography p={1} variant="h6" borderBottom={1}>
              Patient Details
            </Typography>
            <Stack direction="row">
              <Stack m={2} gap={3}>
                <Typography variant="p" fontSize="small" fontWeight="bold">
                  Patient Id
                </Typography>
                <Typography variant="p" fontSize="small" fontWeight="bold">
                  Patient Name
                </Typography>
                <Typography variant="p" fontSize="small" fontWeight="bold">
                  Gender
                </Typography>
                <Typography variant="p" fontSize="small" fontWeight="bold">
                  DOB
                </Typography>
                <Typography variant="p" fontSize="small" fontWeight="bold">
                  Blood Group
                </Typography>
                <Typography variant="p" fontSize="small" fontWeight="bold">
                  Mobile Number
                </Typography>
                <Typography variant="p" fontSize="small" fontWeight="bold">
                  Email
                </Typography>
                <Typography variant="p" fontSize="small" fontWeight="bold">
                  Symptoms
                </Typography>
              </Stack>
              <Stack m={2} gap={3}>
                <Typography variant="p" fontSize="small">
                  {currentPatient.Id}
                </Typography>
                <Typography variant="p" fontSize="small">
                  {currentPatient.Name}
                </Typography>
                <Typography variant="p" fontSize="small">
                  {currentPatient.Gender}
                </Typography>
                <Typography variant="p" fontSize="small">
                  {currentPatient.DOB &&
                    `${currentPatient.DOB.getDate()}/${currentPatient.DOB.getMonth()}/${currentPatient.DOB.getFullYear()}`}
                </Typography>
                <Typography variant="p" fontSize="small">
                  {currentPatient.BloodGroup}
                </Typography>
                <Typography variant="p" fontSize="small">
                  {currentPatient.Mobile}
                </Typography>
                <Typography variant="p" fontSize="small">
                  {currentPatient.Email}
                </Typography>

                <Typography variant="p" fontSize="small">
                  {currentPatient.Symptoms}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" gap={1} justifyContent="end" pr={2}>
              <Button
                onClick={() => handleDelete(currentPatient.Id)}
                size="small"
                variant="outlined">
                Delete
              </Button>
              <Button
                onClick={() => setOpenForm(true)}
                size="small"
                variant="contained">
                Edit
              </Button>
            </Stack>
          </Box>
        )}
      </Modal>
    </div>
  );
} 