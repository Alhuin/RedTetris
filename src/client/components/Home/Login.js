import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// Redux
import { joinRoomSocket, setReady, setError } from '../../redux/actions';
import { selectSocket, selectError } from '../../redux/selectors';
import { JOIN_ROOM_ERROR, JOIN_ROOM_SUCCESS, SET_ERROR } from '../../redux/actions/types';

// Components
import CustomAlert from './Alert';
import JoinButton from './JoinButton';
import { StyledLogin, StyledLoginWrapper } from '../styles/StyledLogin';
import { StyledLogo } from '../styles/StyledLogo';

const Login = ({ ready }) => {
  const socket = useSelector(selectSocket);
  const error = useSelector(selectError);

  const [roomNameInput, setRoomNameInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on(JOIN_ROOM_SUCCESS, (data) => {
      // redux not yet updated so we get data from the callback
      console.log('join room success users = ', data.users);
      dispatch({
        type: 'INIT_USER',
        payload: {
          username: data.username,
          roomName: data.roomName,
          users: data.users,
        },
      });
    });

    socket.on(JOIN_ROOM_ERROR, (errorMsg) => {
      dispatch({ type: SET_ERROR, payload: { error: errorMsg } });
    });
  }, []);

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
        cb={() => dispatch(joinRoomSocket(
          socket,
          { roomName: roomNameInput, username: usernameInput },
        ))}
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
