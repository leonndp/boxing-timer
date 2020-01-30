import '../styles/styles.css';

import React from 'react'
import ReactDOM from 'react-dom'
import BoxingTimer from './components/BoxingTimer'

ReactDOM.render(<BoxingTimer />, document.querySelector('.boxing-timer'))

if (module.hot) {
    module.hot.accept();
}


