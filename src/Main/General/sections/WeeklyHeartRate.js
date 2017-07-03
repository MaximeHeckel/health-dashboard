import React from 'react';
import PropTypes from 'prop-types'; 
import {
  BarChart,
  Bar,
  YAxis,
  Tooltip,
} from 'recharts';
import CustomTooltip from '../../../components/Tooltip';
import BarShape from '../../../components/BarShape';
import css from './styles.css';

const WeeklyHeartRate = ({ dataHR = [] }) => {
  return (
    <div className={`${css.card} ${css.heartCard}`}>
      <div className={css.graphWrapper}>
        <BarChart width={350} height={120} data={dataHR}>
          <YAxis
            axisLine={false}
            tick={false}
            tickLine={false}
          />
          <defs>
            <linearGradient id="colorUv" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF4A6F" />
              <stop offset="25%" stopColor="#FF4A6F" />
              <stop offset="50%" stopColor="#FF4A6F" />
              <stop offset="100%" stopColor="#FCA9BF" />
            </linearGradient>
          </defs>
          <Bar
            unit="bpm MAX"
            dataKey="max"
            stackId="a"
            fill='url(#colorUv)'
            barSize={8}
            shape={<BarShape coeffHeight={1.3} />}
          />
          <Bar
            unit="bpm MIN"
            dataKey="min"
            stackId="a"
            fill='url(#colorUv)'
            barSize={8}
            fillOpacity={0}
          />
          <Tooltip content={<CustomTooltip />} />
        </BarChart>
      </div>
      <div className={css.graphFooter}>
        <div className={css.dataLabel}>
          Weekly heart rate range
        </div>
      </div>
    </div>
  );
};

WeeklyHeartRate.propTypes = {
  dataHR: PropTypes.array,
};

export default WeeklyHeartRate;
