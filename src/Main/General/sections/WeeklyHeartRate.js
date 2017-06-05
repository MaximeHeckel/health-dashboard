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
    <div>
      <div className={css.graphWrapper}>
        <BarChart width={350} height={120} data={dataHR}>
          <YAxis
            axisLine={false}
            tick={false}
            tickLine={false}
          />
          <Bar
            unit="bpm MAX"
            dataKey="max"
            stackId="a"
            fill="#F52A64"
            barSize={8}
            shape={<BarShape coeffHeight={1.3} />}
          />
          <Bar
            unit="bpm MIN"
            dataKey="min"
            stackId="a"
            fill="#F52A64"
            barSize={8}
            fillOpacity={0}
          />
          <Tooltip content={<CustomTooltip />} />
        </BarChart>
      </div>
      <div className={css.graphFooter}>
        <div className={css.dataLabel}>
          Weekly heart rate range
          <span><hr /></span>
        </div>
      </div>
    </div>
  );
};

WeeklyHeartRate.propTypes = {
  dataHR: PropTypes.array,
};

export default WeeklyHeartRate;
