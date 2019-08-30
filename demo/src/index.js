import React from 'react';
import { render } from 'react-dom';
import Laika from '../../src/Laika';

render(
  <div>
    <h2>Laika React Component Demo</h2>
    <Laika
      url=""
      feature=""
      env=""
      onTrue={<div style={{ width: 50, height: 50, backgroundColor: 'red' }} />}
      onFalse={<div style={{ width: 50, height: 50, backgroundColor: 'blue' }} />}
    />
  </div>, 
  document.getElementById('app')
);