/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { expect } from 'chai';
import jsdom from 'mocha-jsdom';
// import { createRenderer } from 'react-addons-test-utils';
// import StyledStartButton from '../src/client/components/styles/StyledStartButton';
// import StartButton from '../src/client/components/Tetris/StartButtton

import App from '../src/client/components/Tetris/Test';

global.document = jsdom({
  url: 'http://localhost:3000/',
});

let rootContainer;

beforeEach(() => {
  rootContainer = document.createElement('div');
  document.body.appendChild(rootContainer);
});

afterEach(() => {
  document.body.removeChild(rootContainer);
  rootContainer = null;
});

describe('App Component Testing', () => {
  it('Renders Hello World Title', () => {
    act(() => {
      ReactDOM.render(<App />, rootContainer);
    });
    const h1 = rootContainer.querySelector('h1');
    expect(h1.textContent).to.equal('Hello World');
  });
});
/*
const renderer = createRenderer();
    renderer.render(React.createElement(
      <StartButton
        mode='tarace'
        disabled={false}
        cb={() => {
          startGame();
        }}
      />,
    ));
    const output = renderer.getRenderOutput();
    output.should.equalJSX(
      <StyledStartButton type='button' onClick={() => console.log('button')} disabled={false}>
        Start
        {'tarace'}
      </StyledStartButton>,
    );
    */
