import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import {
  mount,
  render,
  shallow,
  configure,
} from 'enzyme';

configure({ adapter: new Adapter() });
global.expect = expect;
global.mount = mount;
global.render = render;
global.shallow = shallow;
