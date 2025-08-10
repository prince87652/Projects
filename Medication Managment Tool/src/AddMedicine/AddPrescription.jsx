import {
  Container,
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  Paper,
  Tooltip,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import AddMedicine from "./AddMedicine";
import { CloudCheck } from "lucide-react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Authentication/Firebase";
import { getAuth } from "firebase/auth";

const AddPrescription = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    doctorName: "",
    reason: "",
    startDate: "",
    medicines: [{ name: "", dosage: "", frequency: "", duration: "" }],
  });

  const [error, setError] = useState("");
  const [saveMedicine, setSaveMedicine] = useState([]);
  const [successMessage, setSuccessMessage] = useState([]);
  const [openSnackBar, setSnackBar] = useState(false);
  const [alerts, setAlerts] = useState("Success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMedicineChange = (index, e) => {
    const { name, value } = e.target;

    const newMedicine = [...formData.medicines];
    newMedicine[index] = {
      ...newMedicine[index],
      [name]: value,
    };
    setFormData((prev) => ({
      ...prev,
      medicines: newMedicine,
    }));
  };

  const handleSaveMedicine = (index) => {
    const medicineSave = formData.medicines[index];
    if (
      medicineSave.name.trim() !== "" &&
      medicineSave.dosage.trim() !== "" &&
      medicineSave.frequency.trim() !== "" &&
      medicineSave.duration.trim() !== ""
    ) {
      setSaveMedicine((prev) => [...prev, medicineSave]);
      const newMedicine = [...formData.medicines];
      newMedicine[index] = {
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
      };

      setFormData((prev) => ({
        ...prev,
        medicines: newMedicine,
      }));
    }
  };

  const handleRemoveMedicine = (index) => {
    setSaveMedicine((prev) => prev.filter((med, ind) => ind !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      console.log("No user");
      return;
    }
    const finalPrescription = {
      patientName: formData.patientName,
      doctorName: formData.doctorName,
      reason: formData.reason,
      startDate: formData.startDate,
      medicines: saveMedicine,
      createdAt: new Date(),
      userId: user.uid,
    };

    try {
      const PrescriptionData = collection(db, "prescriptions");

      await addDoc(PrescriptionData, finalPrescription);

      setSuccessMessage("Prescription saved successfully! 🎉");
      setAlerts("success");
      setSnackBar(true);

      setFormData({
        patientName: "",
        doctorName: "",
        reason: "",
        startDate: "",
        medicines: [{ name: "", dosage: "", frequency: "", duration: "" }],
      });
    } catch (error) {
      setError(error.message);
      console.log("error", error.message);
      setSuccessMessage("Error saving prescription. Please try again.");
      setAlerts("error");
      setSnackBar(true);
    }

    console.log("details", formData);
  };

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 10, mb: 5 }}>
        <Paper elevation={4} sx={{ p: 3 }}>
          <Typography variant="h5" fontWeight="bold">
            Add Prescription
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Grid item xs={12} sm={4} mt={2}>
                <TextField
                  mt={1}
                  label="Enter Patient Name"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  sx={{ width: "300px" }}
                />
              </Grid>
            </Box>
            <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="doctorName"
                  label="🩺Doctor Name..."
                  sx={{ mt: 2 }}
                  value={formData.doctorName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  value={formData.reason}
                  onChange={handleChange}
                  fullWidth
                  name="reason"
                  label="Reason for Prescription"
                  sx={{ mt: 2 }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  value={formData.startDate}
                  onChange={handleChange}
                  type="date"
                  label="Start-Date"
                  name="startDate"
                  InputLabelProps={{ shrink: true }}
                  sx={{ mt: 2 }}
                />
              </Grid>
            </Grid>

            <Grid sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h6" fontWeight="bold">
                Add Medicine
              </Typography>
              {formData.medicines.map((medicine, index) => (
                <AddMedicine
                  key={index}
                  index={index}
                  medicine={medicine}
                  handleMedicineChange={handleMedicineChange}
                  handleRemoveMedicine={handleRemoveMedicine}
                  handleSaveMedicine={handleSaveMedicine}
                />
              ))}
              <Box sx={{ mt: 4 }}>
                {saveMedicine.length > 0 && (
                  <Typography variant="subtitle1" fontWeight="bold">
                    Medicines for{" "}
                    <Typography color="secondary">
                      {formData.patientName}:
                    </Typography>
                    <Typography color="red" fontWeight="bold">
                      {formData.reason}
                    </Typography>
                  </Typography>
                )}
                {saveMedicine.map((med, index) => (
                  <Box
                    key={index}
                    sx={{ ml: 2, borderBottom: "1px solid #ccc", py: 1 }}
                  >
                    <Typography>{med.name}</Typography>
                    <Typography variant="body2">
                      Dosage: {med.dosage} | Frequency: {med.frequency} |
                      Duration: {med.duration}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "green", mt: 1, width: "190px" }}
              >
                Save Prescription
              </Button>
            </Grid>
          </Box>
        </Paper>
      </Container>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={() => setSnackBar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackBar(false)}
          severity="alertSeverity"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddPrescription;
