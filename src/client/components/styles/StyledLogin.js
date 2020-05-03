import styled from 'styled-components';

export const StyledLoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const StyledLogin = styled.div`
  width: 50vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 40px;
  max-width: 900px;
  
  input {
    text-align: center;
    color: grey;
    outline: none;
    background-color: transparent;
    border: 4px solid #333;
    min-height: 30px;
    border-radius: 20px;
    font-family: Pixel;
    font-size: 0.8rem
  }
  
  input:hover::placeholder {
    color: white;
  }
  
  input:focus::placeholder {
    color: transparent;
  }
`;
