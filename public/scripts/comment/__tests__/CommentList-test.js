jest.dontMock('../CommentList');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const CommentList = require('../CommentList');

describe('CommentList component', () => {

  // Just two (almost) empty objects are enough since we're mocking the Comment component. Still, React requires an id
  // on the objects.
  const comments = [{id: 1}, {id: 2}];

  it('renders a list of comments', () => {
    const commentList = TestUtils.renderIntoDocument(
      <CommentList data={comments} />
    );
    const numberOfCommentsInCommentList = ReactDOM.findDOMNode(commentList).children.length;

    expect(numberOfCommentsInCommentList).toBe(2);
  });

});
