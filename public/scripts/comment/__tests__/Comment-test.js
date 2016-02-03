jest.dontMock('../Comment');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Comment = require('../Comment');

describe('Comment component', () => {

  it('renders a comment', () => {
    const comment = TestUtils.renderIntoDocument(
      <Comment author="Test Author" key="123">Test comment...</Comment>
    );

    // Get comment text content. Needs trimming because the implementation inserts some whitespace.
    const actualCommentText = ReactDOM.findDOMNode(comment).textContent.trim();

    expect(actualCommentText).toBe('Test AuthorTest comment...');
  });

});
