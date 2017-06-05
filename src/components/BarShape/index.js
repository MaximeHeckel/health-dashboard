import React from 'react';
import PropTypes from 'prop-types'; 

const BarShape = (props) => {
  const { fill, x, y, width, height, coeffHeight } = props;
  return (
    <rect
      id="barShape-1"
      x={x} y={y}
      width={width}
      height={height * coeffHeight}
      rx="5"
      fill={fill}
    ></rect>
  );
};

BarShape.propTypes = {
  fill: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  coeffHeight: PropTypes.number.isRequired,
};


export default BarShape;
