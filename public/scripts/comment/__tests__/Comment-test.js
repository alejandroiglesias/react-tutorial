jest.dontMock('../Comment');

import {IntlProvider} from 'react-intl';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Comment = require('../Comment');

describe('Comment component', () => {
  it('renders a comment', () => {
    const comment = TestUtils.renderIntoDocument(
      <IntlProvider locale="en">
        <Comment author="Author" key="123">Text</Comment>
      </IntlProvider>
    );
console.log(comment.state);
    // Get comment text content. Needs trimming because the implementation inserts some whitespace.
    const actualCommentText = ReactDOM.findDOMNode(React.Children.only(comment)).textContent.trim();

    expect(actualCommentText).toBe('AuthorText');
  });
});
