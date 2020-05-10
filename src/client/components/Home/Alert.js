import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import StyledAlertWrapper from '../styles/StyledAlert';

const CustomAlert = ({ severity, message, close }) => {
  const [open, setOpen] = useState(true);

  return (open
    && (
      <StyledAlertWrapper>
        <Alert
          severity={severity}
          action={
            (
              <button
                type="button"
                style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                onClick={() => {
                  setOpen(false);
                  close();
                }}
              >
                X
              </button>
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
