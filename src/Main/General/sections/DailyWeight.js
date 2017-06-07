import React from 'react';
import PropTypes from 'prop-types'; 
import css from './styles.css';

const DailyWeight = ({ dataWeight = {}, dataBmi = {}, dataBF = {} }) => {
  const { value: valueWeight } = dataWeight;
  const { value: valueBmi } = dataBmi;
  const { value: valueBF } = dataBF;
  return (
    <div className={`${css.card} ${css.weightCard}`}>
      <div className={css.centeredColumn}>
        <div className={css.weightData}>
          { valueWeight / 1000 || 0 } kg
        </div>
        <div className={css.dataLabel}> Mass </div>
        <div className={css.weightData}>
          { valueBmi || 0 }
        </div>
        <div className={css.dataLabel}> BMI </div>
        <div className={css.bfData}>
          { valueBF || 0 } %
        </div>
        <div className={css.dataLabel}> Bodyfat </div>
      </div>
    </div>
  );
};

DailyWeight.propTypes = {
  dataWeight: PropTypes.object,
  dataBmi: PropTypes.object,
  dataBF: PropTypes.object,
};

export default DailyWeight;
