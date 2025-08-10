import { Button, Grid } from '@mui/material'
import React from 'react'

const ButtonAct = () => {
  return (
   <>
   <Grid container spacing={3} justifyContent='center'>
    <Grid item xs={2} display='flex' gap={2}>
        <Button  variant='contained' sx={{backgroundColor:"green"}}>Marks as taken</Button>
        <Button disabled={true} variant='contained' color='primary' sx={{backgroundColor:'purple'}} >Request Renweal</Button>
    </Grid>
   </Grid>
   
   
   </>
  )
}

export default ButtonAct