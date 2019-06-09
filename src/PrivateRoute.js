import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function({component: Component, logined, ...rest}) {
  return(
    <Route {...rest} render={(props) => {
      return logined? <Component {...props} /> : <Redirect to={{pathname: '/login', state: { from: props.location }}} />
    }}/>
  )
}