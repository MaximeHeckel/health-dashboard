import React from 'react';
import PropTypes from 'prop-types'; 
import moment from 'moment';
import {
  BarChart,
  Bar,
  YAxis,
  Tooltip,
} from 'recharts';
import forEach from 'lodash/forEach';
import CustomTooltip from '../../../components/Tooltip';
import BarShape from '../../../components/BarShape';
import css from './styles.css';

function normalizeData(entries) {
  let entryDate = null;
  if (entries.length > 0) {
    entryDate = entries[entries.length - 1].startDate;
  }
  let normalizedOutput = 0;

  forEach(entries, (entry) => {
    if (entry.value === 'INBED') {
      normalizedOutput += moment(entry.endDate) - moment(entry.startDate);
    }
  });

  normalizedOutput = (normalizedOutput / 3600 / 1000).toFixed(2);
  return {
    value: parseInt(normalizedOutput, 10),
    startDate: entryDate,
  };
}

const WeeklySleep = ({ dataSleep = [] }) => {
  const weeklySleep = [];
  forEach(dataSleep, (entries) => {
    weeklySleep.push(normalizeData(entries));
  });

  return (
    <div>
      <div className={css.graphWrapper}>
        <BarChart width={350} height={120} data={weeklySleep}>
          <YAxis
            axisLine={false}
            tick={false}
            tickLine={false}
          />
          <Bar
            unit="hours slept"
            dataKey="value"
            fill="#AEBDFC"
            barSize={8}
            shape={<BarShape coeffHeight={1} />}
          />
          <Tooltip content={<CustomTooltip />} />
        </BarChart>
      </div>
      <div className={css.graphFooter}>
        <div className={css.dataLabel}>
          Weekly sleep hours
          <span><hr /></span>
        </div>
      </div>
    </div>
  );
};

WeeklySleep.propTypes = {
  dataSleep: PropTypes.array,
};

export default WeeklySleep;
