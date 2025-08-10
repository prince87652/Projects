import { CardHeader, Typography,Box } from '@mui/material'
import React from 'react'

const DoctorInfo = ({ doctorName, reason, patientName, startDate }) => {
  return (
    <>
      <Box>
        <Typography variant="h6" fontWeight="bold">
          Prescription for: {patientName}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Prescribed by: Dr. {doctorName}
        </Typography>
        <Typography variant="subtitle1" color="darkred">
          Reason: {reason}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Start Date: {startDate}
        </Typography>
      </Box>
    </>
  );
};

export default DoctorInfo