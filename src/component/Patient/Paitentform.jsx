import { useContext, useEffect, useState } from "react";
import DataContext from "../Datacontext";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
//patients,setpatients

export default function FormDialog({ open, setOpen, currentPatient }) {
  const { patients, setpatients } = useContext(DataContext);
  const handleClose = () => {
    setOpen(false);
  };
  const holdPatient = { ...currentPatient };
  // const newID = new Date().getTime();
  const [newPatient, setNewPatient] = useState({
    Id: "",
    Name: "",
    DOB: new Date().toLocaleDateString(),
    Mobile: "",
    Email: "",
    Address: "",
    Disease: "",
    DepartmentName: "",
    BloodGroup: "",
    Gender: "",
    Symptoms: "",
  });

  useEffect(() => {
    if (currentPatient.Id) setNewPatient(currentPatient);
  }, [currentPatient]);
  console.log("patient", currentPatient);
  const addDoctor = () => {
    // setNewPatient(newPatient);
    if (!newPatient.Id)
      newPatient.Id = patients[patients.length - 1].Id + 1;

    let i = patients.indexOf(
        patients.find((val) => val.Id === holdPatient.Id)
    );

    console.log(i);
    if (i > -1) patients[i] = newPatient;
    else setpatients((prev) => [...prev, newPatient]);
    setOpen(false);
  };

  return (
    <div>
      {newPatient && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle borderBottom={"1px solid rgb(230, 230, 230)"}>
            {currentPatient.Id ? "Edit Patient" : "New Patient"}
          </DialogTitle>
          <DialogContent>
            <Stack mt={1}>
              <label
                style={{
                  color: "black",
                  fontSize: "small",
                  fontWeight: "bold",
                }}
                htmlFor="name">
                Patient Name
              </label>
              <TextField
                required
                id="name"
                value={newPatient.Name}
                onChange={(e) => {
                  setNewPatient({
                    ...newPatient,
                    Name: e.target.value,
                    // Id: patientD[patientD.length - 1].Id + 1,
                  });
                }}
                fullWidth
                size="small"
              />
            </Stack>
            <Stack>
              <FormControl sx={{ mt: 1 }}>
                <FormLabel
                  style={{
                    color: "black",
                    fontSize: "small",
                    fontWeight: "bold",
                  }}
                  id="demo-controlled-radio-buttons-group">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={newPatient.Gender}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, Gender: e.target.value })
                  }>
                  <FormControlLabel
                    value="Female"
                    // sx={{ ".MuiFormControlLabel-label": { fontSize: "small" } }}
                    control={<Radio size="small" />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="Male"
                    // sx={{ ".MuiFormControlLabel-label": { fontSize: "small" } }}
                    control={<Radio size="small" />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="Other"
                    // sx={{ ".MuiFormControlLabel-label": { fontSize: "small" } }}
                    control={<Radio size="small" />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
            <Stack direction="row">
              <Stack mt={1} sx={{ width: "49%" }}>
                <label
                  style={{
                    color: "black",
                    fontSize: "small",
                    fontWeight: "bold",
                  }}
                  htmlFor="bloodGroup">
                  Blood Group
                </label>
                <Autocomplete
                  id="bloodGroup"
                  options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
                  fullWidth
                  // sx={{ mt: 1 }}
                  size="small"
                  value={newPatient.BloodGroup}
                  onChange={(e, val) =>
                    setNewPatient({ ...newPatient, BloodGroup: val })
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
              <Stack mt={1} ml={1} sx={{ width: { xs: "48%", md: "49%" } }}>
                <label
                  style={{
                    color: "black",
                    fontSize: "small",
                    fontWeight: "bold",
                  }}
                  htmlFor="calendar">
                  DOB
                </label>
                <TextField
                  id="calendar"
                  size="small"
                  variant="outlined"
                  type="date"
                  fullWidth
                  value={newPatient.DOB}
                  onChange={(e) => {
                    setNewPatient({
                      ...newPatient,
                      DOB: new Date(e.target.value),
                    });
                  }}

                  // sx={{ mt: 1, ml: 1, width: { xs: "48%", md: "49%" } }}
                />
              </Stack>
            </Stack>
            <Stack mt={1}>
              <label
                style={{
                  color: "black",
                  fontSize: "small",
                  fontWeight: "bold",
                }}
                htmlFor="mobile">
                Mobile Number
              </label>
              <TextField
                id="mobile"
                type="tel"
                size="small"
                variant="outlined"
                value={newPatient.Mobile}
                onChange={(e) => {
                  setNewPatient({ ...newPatient, Mobile: e.target.value });
                }}

                // sx={{ mt: 1, ml: 1, width: { xs: "48%", md: "49%" } }}
              />
            </Stack>
            <Stack mt={1}>
              <label
                style={{
                  color: "black",
                  fontSize: "small",
                  fontWeight: "bold",
                }}
                htmlFor="email">
                Email
              </label>
              <TextField
                id="email"
                fullWidth
                size="small"
                value={newPatient.Email}
                onChange={(e) => {
                  setNewPatient({ ...newPatient, Email: e.target.value });
                }}
              />
            </Stack>
            <Stack mt={1}>
              <label
                style={{
                  color: "black",
                  fontSize: "small",
                  fontWeight: "bold",
                }}
                htmlFor="symptoms">
                Symptoms
              </label>
              <TextField
                id="symptoms"
                fullWidth
                size="small"
                value={newPatient.Symptoms}
                onChange={(e) => {
                  setNewPatient({ ...newPatient, Symptoms: e.target.value });
                }}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ mt: 1, mb: 1 }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              sx={{ mr: 2 }}
              variant="contained"
              onClick={() => {
                addDoctor();
              }}>
              {currentPatient.Id ? "Save" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}