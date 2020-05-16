/* eslint-disable no-undef */
/* eslint-disable max-len */
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'; // plug enzyme with react 16+
import ShallowRenderer from 'react-test-renderer/shallow'; // Allows to pretty render our shallow snapshots
import StartButton from '../../src/client/components/Tetris/StartButtton';

const { hasOwnProperty } = Object.prototype;

configure({ adapter: new Adapter() });

describe('<StartButton /> with no props', () => {
  // Rendering our StartButton component without rendering childs. Here StartButton doesn't have any child but it's how it works.
  const renderer = new ShallowRenderer();
  renderer.render(<StartButton mode="" />); // On passe mode car il est requis. !! TODO? ajout d'un test qui test l'erreur en cas d'abscence de mode?
  const container = renderer.getRenderOutput();

  it('should match the snapshot no props', () => {
    expect(container).toMatchSnapshot();
  });
});


describe('<StartButton /> with props', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<StartButton mode="3" type="button" cb={() => console.log('test')}/>);
  const container = renderer.getRenderOutput();

  it('should match the snapshot props', () => {
    expect(container).toMatchSnapshot();
  });

  it('should have proper childs', () => {
    expect(container.props.children.length).toEqual(2);
    expect(container.props.children[0]).toEqual('Start');
    expect(container.props.children[1]).toEqual('3');
  });
  // container.props = {
  // "children": ["Start", "3"],
  // "disabled": true,
  // "onClick": ()=>true, => hasOwnProperty doesnt work with onClick O.o'
  // "type": "button",
  // "mode": "3"
  // }
  it('should have a type and a onClick prop', () => { // cb functions are not tested here
    expect(hasOwnProperty.call(container.props, 'onClick')).toBe(true);
    expect(hasOwnProperty.call(container.props, 'type')).toBe(true);
  });

  it('should have proper props', () => {
    // We don't need for testing to send a console.log() callback.
    // We can mabe send a ()=>'testValue' callback and test the return of that function.
    // But with these lines we learn how to test a console.log output.
    const { log } = console; // save the function log ...
    console.log = jest.fn(); // ... and replace it by jest one
    container.props.onClick(); // launching our console.log
    // The first argument of the first call to the function was 'hello'
    expect(console.log).toHaveBeenCalledWith('test'); // test it
    console.log = log; // get back our log function...
    console.log(container.props); // ... to use it
    expect(container.props.type).toBe('button');
  });
});
