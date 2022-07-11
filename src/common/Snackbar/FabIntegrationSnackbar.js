import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import './SimpleSnackbar.css';
import MuiAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Alert = React.forwardRef(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SimpleSnackbar = ({ snackBarProps }) => {
    const { alert, message, severity, duration, succesMsg } = snackBarProps
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setOpen(true);
    }, []);

  const handleClose = (event, reason) => {
    if (reason === 'timeout') {
        setOpen(true);
    }

    setOpen(true);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      { alert ? <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        message={message}
        action={action}
      /> :
        <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        action={action}
      >
        <Alert severity={severity}>
            <AlertTitle>{succesMsg}</AlertTitle>
            <strong>{message}</strong></Alert>
        </Snackbar>
    }
    </div>
  );
}
