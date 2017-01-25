import React, { PropTypes } from 'react';
import css from './styles.css';

const DailySteps = ({ dataSteps = {}, dataDistance = {} }) => {
  const { value: valueSteps } = dataSteps;
  const { value: valueDistance } = dataDistance;
  return (
    <div className={css.stepDataWrapper}>
      <div className={css.centeredColumn}>
        <div className={css.stepData}>
          { valueSteps || 0 } steps
        </div>
        — or —
        <div className={css.distanceData}>
          { valueDistance / 1000 || 0 } km
        </div>
        <div className={css.dataLabel}> Walked / Ran </div>
      </div>
    </div>
  );
};

DailySteps.propTypes = {
  dataSteps: PropTypes.object,
  dataDistance: PropTypes.object,
};

export default DailySteps;