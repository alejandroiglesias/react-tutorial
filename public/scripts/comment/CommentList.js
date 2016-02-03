'use strict';

import Comment from './Comment';
import React from 'react';

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

//export default CommentList;
module.exports = CommentList; // Why doesn't work with "export"??
