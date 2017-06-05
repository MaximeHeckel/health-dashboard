import React from 'react';
import PropTypes from 'prop-types'; 
import forEach from 'lodash/forEach';
import Health2LinesGraph from '../../../components/Health2LinesGraph';
import css from './styles.css';

const WeeklyWeight = ({ dataWeight = [], dataBF = [] }) => {
  const weeklyData = [];
  forEach(dataWeight, (entry, i) => {
    weeklyData.push({ valueWeight: dataWeight[i].value / 1000, valueBF: dataBF[i].value });
  });

  return (
    <div>
      <div className={css.graphWrapper}>
        <Health2LinesGraph
          data={weeklyData}
          value1="valueWeight"
          value2="valueBF"
          color1="#FF9D13"
          color2="#FDC62E"
          unit1="kg"
          unit2="% of bodyfat"
          domain1={[55, 85]}
          domain2={[0, 30]}
          width={400}
          height={120}
        />
      </div>
      <div className={css.graphFooter}>
        <div className={css.dataLabel}>
          Weekly weight and bodyfat percentage
          <span><hr /></span>
        </div>
      </div>
    </div>
  );
};

WeeklyWeight.propTypes = {
  dataWeight: PropTypes.array,
  dataBF: PropTypes.array,
};

export default WeeklyWeight;
