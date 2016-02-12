jest.dontMock('../CommentBox');

import $ from 'jquery';
import {IntlProvider} from 'react-intl';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const CommentBox = require('../CommentBox');

describe('CommentBox component', () => {
  it('sets a default initial state', () => {
    const commentBox = React.Children.only(getCommentBox().props.children);

    expect(commentBox.state).toEqual({data: []});
  });

  it('loads comments from server on mount', () => {
    $.ajax.mockImplementation((obj) => {
      obj.success.call(null, [1]);
      return this;
    });

    const commentBox = React.Children.only(getCommentBox().props.children);

    expect($.ajax).toBeCalledWith({
      url: '/api/comments',
      dataType: 'json',
      cache: false,
      success: jasmine.any(Function),
      error: jasmine.any(Function)
    });
    expect(commentBox.state).toEqual({data: [1]});
  });

  it('loads comments from server on an interval', () => {
    $.ajax.mockClear();

    getCommentBox();

    expect($.ajax.mock.calls.length).toBe(1);

    jest.runOnlyPendingTimers();

    expect($.ajax.mock.calls.length).toBe(2);
  });

  it('handles comment submit', () => {
    const commentBox = React.Children.only(getCommentBox().props.children);

    Date.now = jest.genMockFunction().mockReturnValue(123);

    $.ajax.mockImplementation((obj) => {
      obj.success.call(null, [{a: 1}, {a: 2, id: 123}]);
      return this;
    });

    commentBox.handleCommentSubmit({a: 2});

    expect($.ajax).toBeCalledWith({
      url: '/api/comments',
      type: 'POST',
      dataType: 'json',
      data: {a: 2, id: 123},
      success: jasmine.any(Function),
      error: jasmine.any(Function)
    });
    expect(commentBox.state).toEqual({data: [{a: 1}, {a: 2, id: 123}]});
  });

  it('discards comment on submit error', () => {
    $.ajax.mockImplementation((obj) => {
      obj.success.call(null, [{a: 1}]);
      return this;
    });

    const commentBox = React.Children.only(getCommentBox().props.children);

    $.ajax.mockImplementation((obj) => {
      obj.error.call(null, null, 'status', 'err');
      return this;
    });

    commentBox.handleCommentSubmit({a: 2});

    expect(commentBox.state).toEqual({data: [{a: 1}]});
  });
});

function getCommentBox() {
  return TestUtils.renderIntoDocument(
    <IntlProvider locale="en">
      <CommentBox url="/api/comments" pollInterval={2000} />
    </IntlProvider>
  );
}
