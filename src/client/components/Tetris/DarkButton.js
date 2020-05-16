import React from 'react';
import PropTypes from 'prop-types';
import StyledDarkButton from '../styles/StyledDarkButton';

const DarkButton = ({ cb }) => (
  <StyledDarkButton
    type="button"
    onClick={cb}
  >
    Darkmode
  </StyledDarkButton>
);

DarkButton.propTypes = {
  cb: PropTypes.func,
};

DarkButton.defaultProps = {
  cb: () => console.log('DarkButton cb()'),
};
export default DarkButton;
