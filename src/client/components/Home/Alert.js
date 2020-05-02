import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { StyledAlertWrapper } from '../styles/StyledAlert';

const CustomAlert = ({ severity, message, close }) => {
  const [open, setOpen] = useState(true);

  return (open
    && (
      <StyledAlertWrapper>
        <Alert
          severity={severity}
          action={
            (
              <CloseIcon
                onClick={() => {
                  setOpen(false);
                  close();
                }}
              />
            )
          }
        >
          {message}
        </Alert>
      </StyledAlertWrapper>
    )
  );
};

CustomAlert.propTypes = {
  severity: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default CustomAlert;
