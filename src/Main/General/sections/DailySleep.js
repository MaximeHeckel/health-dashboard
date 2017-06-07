import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import moment from 'moment';
import forEach from 'lodash/forEach';
import css from './styles.css';

class DailySleep extends Component {
  static propTypes = {
    dataSleep: PropTypes.array,
  }

  normalizeData(entries) {
    let normalizedOutput = 0;

    forEach(entries, (entry) => {
      if (entry.value === 'INBED') {
        normalizedOutput += moment(entry.endDate) - moment(entry.startDate);
      }
    });

    return normalizedOutput;
  }

  render() {
    const {
      dataSleep,
    } = this.props;
    const sleepTime = this.normalizeData(dataSleep);

    return (
      <div className={`${css.card} ${css.sleepCard}`}>
        <div className={css.centeredColumn}>
          <div className={css.sleepData}>
             {(sleepTime / 3600 / 1000).toFixed(2)} h
          </div>
          <div className={css.dataLabel}> Slept </div>
        </div>
      </div>
    );
  }
}

export default DailySleep;
