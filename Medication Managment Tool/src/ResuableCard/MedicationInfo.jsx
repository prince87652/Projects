import { Box, Typography } from "@mui/material";
import React from "react";

const MedicationInfo = ({medicineName,dosage,schedule}) => {
  return (
    <>
      <Box mt={2}>
        <Typography variant="h5" fontWeight='bold'> {medicineName}</Typography>
        <Typography>{ dosage}</Typography>
        <Typography> {schedule}</Typography>
      </Box>
    </>
  );
};

export default MedicationInfo;
