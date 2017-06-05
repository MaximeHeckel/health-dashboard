import React from 'react';
import PropTypes from 'prop-types'; 
import {
  LineChart,
  Line,
  Tooltip,
  YAxis,
} from 'recharts';
import CustomTooltip from '../../components/Tooltip';

const Health2LinesGraph = ({
  data,
  domain1,
  domain2,
  value1,
  value2,
  color1,
  color2,
  unit1,
  unit2,
  height,
  width,
}) => {
  return (
    <LineChart width={width} height={height} data={data}>
      <YAxis
        yAxisId="left"
        type="number"
        domain={domain1}
        axisLine={false}
        tick={false}
        tickLine={false}
      />
      <YAxis
        yAxisId="right"
        type="number"
        domain={domain2}
        axisLine={false}
        tick={false}
        tickLine={false}
        orientation="right"
      />
      <Line
        yAxisId="left"
        type="monotone"
        dataKey={value1}
        stroke={color1}
        fill={color1}
        unit={unit1}
        strokeWidth="3"
      />
      <Line
        yAxisId="right"
        type="monotone"
        dataKey={value2}
        stroke={color2}
        fill={color2}
        unit={unit2}
        strokeWidth="3"
      />
      <Tooltip content={<CustomTooltip />} />
    </LineChart>
  );
};

Health2LinesGraph.propTypes = {
  data: PropTypes.array,
  value1: PropTypes.string,
  value2: PropTypes.string,
  color1: PropTypes.string,
  color2: PropTypes.string,
  unit1: PropTypes.string,
  unit2: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  xDataKey: PropTypes.string,
  domain1: PropTypes.array,
  domain2: PropTypes.array,
};

export default Health2LinesGraph;
