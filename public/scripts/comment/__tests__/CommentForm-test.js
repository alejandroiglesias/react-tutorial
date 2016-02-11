jest.dontMock('../CommentForm');

import {IntlProvider} from 'react-intl';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const CommentForm = require('../CommentForm');

describe('CommentForm component', () => {
  it('sets a default initial state', () => {
    const commentForm = TestUtils.renderIntoDocument(
      <IntlProvider locale="en">
        <CommentForm />
      </IntlProvider>
    );

    expect(commentForm.state).toEqual({author: '', text: ''});
  });

  it('handles state change', () => {
    const commentForm = TestUtils.renderIntoDocument(
      <IntlProvider locale="en">
        <CommentForm />
      </IntlProvider>
    );
    const inputs = TestUtils.scryRenderedDOMComponentsWithTag(commentForm, 'input');

    TestUtils.Simulate.change(inputs[0], {target: {value: 'author'}});

    expect(commentForm.state).toEqual({author: 'author', text: ''});

    TestUtils.Simulate.change(inputs[1], {target: {value: 'text'}});

    expect(commentForm.state).toEqual({author: 'author', text: 'text'});
  });

  it('handles form submit', () => {
    const submitMockFn = jest.genMockFunction();
    const commentForm = TestUtils.renderIntoDocument(
      <IntlProvider locale="en">
        <CommentForm onCommentSubmit={submitMockFn} />
      </IntlProvider>
    );
    const formInstance = TestUtils.findRenderedDOMComponentWithTag(commentForm, 'form');

    TestUtils.Simulate.submit(formInstance);

    expect(submitMockFn).not.toBeCalled();
    expect(commentForm.state).toEqual({author: '', text: ''});

    commentForm.setState({author: ' author ', text: ' text '});

    TestUtils.Simulate.submit(formInstance);

    expect(submitMockFn).toBeCalledWith({author: 'author', text: 'text'});
    expect(commentForm.state).toEqual({author: '', text: ''});
  });
});
