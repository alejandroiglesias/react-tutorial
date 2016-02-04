'use strict';

import marked from 'marked';
import React from 'react';
import {FormattedRelative} from 'react-intl';

var Comment = React.createClass({
  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author} <small>• <FormattedRelative value={this.props.date} /></small>
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

//export default Comment;
module.exports = Comment; // Why doesn't work with "export"??
