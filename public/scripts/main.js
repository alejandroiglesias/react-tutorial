import CommentBox from './comment/CommentBox';
import React from 'react'; // Fails if not include this. Why??
import ReactDOM from 'react-dom';


ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);
