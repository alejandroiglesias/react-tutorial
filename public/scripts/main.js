import CommentBox from './comment/CommentBox';
import React from 'react'; // Fails if not include this. Why??
import ReactDOM from 'react-dom';
import {addLocaleData, IntlProvider} from 'react-intl';
import es from 'react-intl/lib/locale-data/es';

addLocaleData(es);

const messages = {
  en: {
    'comments': 'Comments',
    'yourName': 'Your name',
    'saySomething': 'Say something...',
    'post': 'Post'
  },
  es: {
    'comments': 'Comentarios',
    'yourName': 'Tu nombre',
    'saySomething': 'Dí algo...',
    'post': 'Publicar'
  }
};

ReactDOM.render(
  <IntlProvider locale="es" messages={messages.es}>
    <CommentBox url="/api/comments" pollInterval={2000} />
  </IntlProvider>,
  document.getElementById('content')
);
