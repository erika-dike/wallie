import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import StreamItemHeaderTimeDisplay from './StreamItemHeaderTimeDisplay';


describe('StreamItemHeaderTimeDisplay component test suite', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      date_created: '2017-05-10T11:41:08.735591Z',
    };
  });

  describe('Base test', () => {
    beforeEach(() => {
      wrapper = shallow(<StreamItemHeaderTimeDisplay {...props} />);
    });

    it('renders without crashing', () => {
      expect(wrapper).toBeDefined();
    });

    it('has 1 prop', () => {
      expect(Object.keys(wrapper.instance().props)).toHaveLength(1);
    });

    it('renders correct snapshot', () => {
      const tree = renderer.create(<StreamItemHeaderTimeDisplay />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
