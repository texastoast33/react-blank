/* global ReactDOM */

import './src/globals';
import app from './src/app';

//Gathering .scss files from scripts and styles folders
const baseStyles = require.context('./styles', true, /\.scss$/);
baseStyles.keys().forEach(baseStyles);

const componentStyles = require.context('./src', true, /\.scss$/);
componentStyles.keys().forEach(componentStyles);

//Application is rendered into DOM below
ReactDOM.render(app, document.getElementById('app'));
