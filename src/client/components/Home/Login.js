import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// Redux
import { setUsername, setRoomName, setError } from '../../redux/actions';
import {
  selectSocket, selectRoomName, selectUsername, selectError,
} from '../../redux/selectors';

import { checkParams, checkRoomAvailable } from './helpers';

// Components
import CustomAlert from './Alert';
import JoinButton from './JoinButton';
import { StyledLogin, StyledLoginWrapper } from '../styles/StyledLogin';
import { StyledLogo } from '../styles/StyledLogo';

const Login = ({ ready, setReady }) => {
  const socket = useSelector(selectSocket);
  const roomName = useSelector(selectRoomName);
  const username = useSelector(selectUsername);
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
        cb={() => {
          if (checkParams(roomNameInput, usernameInput, setError, dispatch)) {
            setUsername(usernameInput, dispatch);
            setRoomName(roomNameInput, dispatch);
            checkRoomAvailable(socket, roomNameInput, usernameInput, setError, setReady, dispatch);
          }
        }}
      />
      { error !== ''
       && <CustomAlert severity="warning" message={error} close={() => setError('', dispatch)} />}
    </StyledLoginWrapper>
  );
};

Login.propTypes = {
  ready: PropTypes.bool,
  setReady: PropTypes.func.isRequired,
};

Login.defaultProps = {
  ready: false,
};

export default Login;
