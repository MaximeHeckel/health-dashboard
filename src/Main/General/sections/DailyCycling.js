import React, { PropTypes } from 'react';
import css from './styles.css';

const DailyCycling = ({ dataCycling = {} }) => {
  const { value: valueCycling } = dataCycling;
  return (
    <div className={css.stepDataWrapper}>
      <div className={css.centeredColumn}>
        <div className={css.cycleData}>
          { valueCycling / 1000 || 0 } km
        </div>
        <div className={css.dataLabel}> Cycled </div>
      </div>
    </div>
  );
};

DailyCycling.propTypes = {
  dataCycling: PropTypes.object,
};

export default DailyCycling;
