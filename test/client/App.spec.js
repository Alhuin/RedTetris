// import React from 'react';
// import Home, { doIncrement, doDecrement, Counter } from '../../src/client/components/App';
//
// describe('Local State Operations', () => {
//   it('increments the counter', () => {
//     const counter = 0;
//     const newCounter = doIncrement(counter);
//     expect(newCounter).to.equal(1);
//   });
//
//   it('decrements the counter', () => {
//     const counter = 0;
//     const newCounter = doDecrement(counter);
//     expect(newCounter).to.equal(-1);
//   });
// });
//
// describe('App Component', () => {
//   it('renders the Counter wrapper', () => {
//     const wrapper = shallow(<Home />);
//     expect(wrapper.find(Counter)).to.have.length(1);
//   });
//
//   it('renders the buttons', () => {
//     const wrapper = shallow(<Home />);
//     expect(wrapper.find('button')).to.have.length(2);
//   });
//
//   it('buttons modify the Counter prop from state', () => {
//     const wrapper = shallow(<Home />);
//     const buttons = wrapper.find('button');
//     const minusButton = buttons.at(0);
//     const plusButton = buttons.at(1);
//
//     let counterWrapper = wrapper.find(Counter);
//     expect(counterWrapper.props().counter).to.equal(0);
//
//     plusButton.simulate('click');
//     plusButton.simulate('click');
//     counterWrapper = wrapper.find(Counter);
//     expect(counterWrapper.props().counter).to.equal(2);
//
//     minusButton.simulate('click');
//     counterWrapper = wrapper.find(Counter);
//     expect(counterWrapper.props().counter).to.equal(1);
//   });
// });
