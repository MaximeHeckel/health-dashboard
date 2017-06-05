import React from 'react';
import PropTypes from 'prop-types'; 
import forEach from 'lodash/forEach';
import Health2LinesGraph from '../../../components/Health2LinesGraph';
import css from './styles.css';

const WeeklySteps = ({ dataSteps = [], dataCycling = [] }) => {
  const weeklyData = [];
  forEach(dataSteps, (entry, i) => {
    weeklyData.push({ valueWalking: dataSteps[i].value, valueCycling: dataCycling[i].value / 1000 });
  });

  return (
    <div>
      <div className={css.graphWrapper}>
        <Health2LinesGraph
          data={weeklyData}
          value1="valueWalking"
          value2="valueCycling"
          color1="#24B9F0"
          color2="#30E2DD"
          unit1="steps walked/ran"
          unit2="km cycled"
          width={400}
          height={120}
        />
      </div>
      <div className={css.graphFooter}>
        <div className={css.dataLabel}>
          Weekly walking and cycling distance
          <span><hr /></span>
        </div>
      </div>
    </div>
  );
};

WeeklySteps.propTypes = {
  dataSteps: PropTypes.array,
  dataCycling: PropTypes.array,
};

export default WeeklySteps;
