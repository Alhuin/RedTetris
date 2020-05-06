import styled from 'styled-components';

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
`;

export const StyledTetris = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  margin: 0 auto;
  width: 100%;
  max-width: 900px;
  
  aside {
    width: 100%;
    max-width: 240px;
    display: block;
    padding: 0 20px;
  }
`;
