import React from 'react';
import PropTypes from 'prop-types'; 
import css from './styles.css';

const DailyCycling = ({ dataCycling = {} }) => {
  const { value: valueCycling } = dataCycling;
  return (
    <div className={`${css.card} ${css.cyclingCard}`}>
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
