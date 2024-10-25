import { Snackbar,
    Alert } from '@mui/material'
import React from 'react'

const Popup = ({open,handleClose,severity,message}) => {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
  )
}

export default Popup
