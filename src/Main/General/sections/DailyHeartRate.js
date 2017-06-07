import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import moment from 'moment';
import forEach from 'lodash/forEach';
import cloneDeep from 'lodash/cloneDeep';
import reverse from 'lodash/reverse';
import css from './styles.css';
import {
  LineChart,
  Line,
  YAxis,
} from 'recharts';

class DailyHeartRate extends Component {
  static propTypes = {
    data: PropTypes.array,
    min: PropTypes.number,
    max: PropTypes.number,
    today: PropTypes.bool,
  }

  normalizeData(entries) {
    const paddedData = new Array(150).fill({ value: NaN });
    const normalizedData = [];

    forEach(entries, (entry, i) => {
      if (normalizedData.length === 0 || i === entries.length) {
        normalizedData.push(entry);
      } else {
        const datea =
          moment(entry.startDate);
        const dateb =
          moment(normalizedData[normalizedData.length - 1].startDate);
        if ((datea - dateb) / 1000 > 120) {
          normalizedData.push(entry);
        }
      }
    });
    paddedData.splice
      .apply(paddedData, [0, normalizedData.length].concat(normalizedData));
    return paddedData;
  }

  render() {
    const {
      data,
      today,
      min,
      max,
    } = this.props;
    const copiedData = cloneDeep(data);
    const hrData = this.normalizeData(reverse(copiedData));
    return (
      <div className={`${css.card} ${css.heartCard}`}>
        <div className={css.graphWrapper}>
          <div>
            <LineChart
              width={350}
              height={120}
              data={hrData}
              margin={{ left: 0 }}
            >
              <Line
                type="monotone"
                dataKey="value"
                stroke="#FFF"
                strokeWidth="3"
                dot={false}
                unit="bpm"
              />
              <YAxis
                unit="bpm"
                type="number"
                domain={[30, 200]}
                axisLine={false}
                tick={false}
                tickLine={false}
              />
            </LineChart>
          </div>
        </div>
        <div className={css.hrDataRow}>
          { today ?
          (
            <div className={css.hrDataItem}>
              {
                `${data.length > 0 ? data[data.length - 1].value : 0}
                bpm `
              }
              <div className={css.dataLabel}>Heart Rate</div>
            </div>
            ) : null
          }
          <div className={css.hrDataItem}>
            {min || 0} bpm
            <div className={css.dataLabel}>Min. Heart Rate</div>
          </div>
          <div className={css.hrDataItem}>
            {max || 0} bpm
            <div className={css.dataLabel}>Max. Heart Rate</div>
          </div>
        </div>
      </div>
    );
  }
}

export default DailyHeartRate;
