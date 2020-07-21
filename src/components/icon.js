import React from 'react';

const Icon = props => (
  <svg
    aria-labelledby={props.title && props.id && `${props.id}-title`}
    aria-hidden={props.title && props.id ? undefined : 'true'}
    viewBox={props.viewBox || ' 0 0 48 48'}
    role="image"
    focusable="false"
    {...props}
  >
    {props.title && props.id && (
      <title id={props.id + '-title'}>{props.title}</title>
    )}
    {props.iconid && <use xlinkHref={`#${props.iconid}`} />}
  </svg>
);

export default Icon;
