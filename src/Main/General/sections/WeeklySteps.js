import React, { PropTypes } from 'react';
import clone from 'lodash/clone';
import forEach from 'lodash/forEach';
import Health2LinesGraph from '../../../components/Health2LinesGraph';
import css from './styles.css';

const WeeklySteps = ({ dataSteps = [], dataCycling = [] }) => {
  const data = clone(dataSteps);
  const weeklyData =
  forEach(data, (entry, i) => {
    data[i].valueCycling = dataCycling[i].value / 1000;
  });

  return (
    <div>
      <div className={css.graphWrapper}>
        <Health2LinesGraph
          data={weeklyData}
          value1="value"
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
