import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// include mutation observer shim (used by react-hook-form)
require('mutationobserver-shim');


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
