import { Grid, IconButton, TextField, Tooltip } from '@mui/material'
import { BadgeMinus, DeleteIcon,CloudCheck } from 'lucide-react';
import React from 'react'

const AddMedicine = ({
  index,
  medicine,
  handleMedicineChange,
  handleRemoveMedicine,
  handleAddMedicine,
  handleSaveMedicine,
}) => {
  return (
    <>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            name="name"
            label="Medicine Name.."
            value={medicine.name}
            onChange={(e) => handleMedicineChange(index, e)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            name="dosage"
            label="Dosage.."
            value={medicine.dosage}
            onChange={(e) => handleMedicineChange(index, e)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            name="frequency"
            label="Frequency.."
            value={medicine.frequency}
            onChange={(e) => handleMedicineChange(index, e)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            name="duration"
            label="Duration.."
            value={medicine.duration}
            onChange={(e) => handleMedicineChange(index, e)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Grid container spacing={1}>
            <Grid item>
              <Tooltip title="Save Medicine">
                <IconButton
                  color="success"
                  size="large"
                  onClick={() => handleSaveMedicine(index)}
                >
                  <CloudCheck />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Remove Medicine">
                <IconButton
                  color="error"
                  size="large"
                  onClick={() => handleRemoveMedicine(index)}
                >
                  <BadgeMinus />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AddMedicine