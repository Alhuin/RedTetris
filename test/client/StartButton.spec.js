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

  it('should have a default onClick prop', () => {
    const { log } = console;
    console.log = jest.fn();
    container.props.onClick();
    expect(console.log.mock.calls.length).toBe(1);
    expect(console.log).toHaveBeenCalledWith('StartButton cb()');
    console.log = log;
  });
});


describe('<StartButton /> with props', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<StartButton mode="3" cb={() => console.log('test')} />);
  const container = renderer.getRenderOutput();

  it('should match the snapshot props', () => {
    expect(container).toMatchSnapshot();
  });

  it('should have proper childs', () => {
    expect(container.props.children.length).toEqual(2);
    expect(container.props.children[0]).toEqual('Start');
    expect(container.props.children[1]).toEqual('3');
  });

  it('should have a type and a onClick prop', () => { // cb functions are not tested here
    expect(hasOwnProperty.call(container.props, 'onClick')).toBe(true);
    expect(hasOwnProperty.call(container.props, 'type')).toBe(true);
  });

  it('should have proper type', () => {
    expect(container.props.type).toBe('button');
  });

  it('should have a proper onClick prop', () => {
    const { log } = console;
    console.log = jest.fn();
    container.props.onClick();
    expect(console.log.mock.calls.length).toBe(1);
    expect(console.log).toHaveBeenCalledWith('test');
    console.log = log;
  });
});
