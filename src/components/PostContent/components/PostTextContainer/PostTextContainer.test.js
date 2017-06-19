import React from 'react';
import renderer from 'react-test-renderer';

import PostTextContainer from './PostTextContainer';


it('renders correctly', () => {
  const tree = renderer.create(
    <PostTextContainer text="There are always biger fishes to fry" />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
