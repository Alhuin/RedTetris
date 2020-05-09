import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// Redux
import { joinRoomSocket, setReady, setError } from '../../redux/actions';
import { selectError } from '../../redux/selectors';

// Components
import CustomAlert from './Alert';
import JoinButton from './JoinButton';
import { StyledLogin, StyledLoginWrapper } from '../styles/StyledLogin';
import { StyledLogo } from '../styles/StyledLogo';

const Login = ({ ready }) => {
  const error = useSelector(selectError);

  const [roomNameInput, setRoomNameInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const dispatch = useDispatch();

  return (
    <StyledLoginWrapper>
      <StyledLogo />
      <StyledLogin>
        <input
          type="text"
          placeholder="Login"
          onChange={(e) => {
            setUsernameInput(e.target.value);
            if (ready) {
              setReady(false);
            }
          }}
        />
        <input
          type="text"
          placeholder="Room name"
          onChange={(e) => {
            setRoomNameInput(e.target.value);
            if (ready) {
              setReady(false);
            }
          }}
        />
      </StyledLogin>
      <JoinButton
        cb={() => dispatch(joinRoomSocket({ roomName: roomNameInput, username: usernameInput }))}
      />
      { error !== ''
       && <CustomAlert severity="warning" message={error} close={() => dispatch(setError(''))} />}
    </StyledLoginWrapper>
  );
};

Login.propTypes = {
  ready: PropTypes.bool,
};

Login.defaultProps = {
  ready: false,
};

export default Login;
