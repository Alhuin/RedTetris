import styled from 'styled-components';

const StyledLobby = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin: 0 0 20px 0;
  padding: 20px;
  border: 4px solid #333;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  color: ${(props) => (props.gameOver ? 'red' : '#999')};
  background: black;
  font-family: Pixel;
  font-size: 0.8rem
`;

export default StyledLobby;
