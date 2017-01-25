import React, { PropTypes } from 'react';
import moment from 'moment';
import css from './styles.css';

const CustomTooltip = ({ payload }) => {
  return (
    <div className={css.wrapper}>
      <div>
        {moment(payload[0].payload.startDate).format('LL') || null}
        <div className={css.tooltipData}>
          <div>
            {payload[0].value} {payload[0].unit}
          </div>
          <div>
            {payload[1] ? payload[1].value : null}
            {payload[1] ? payload[1].unit : null}
          </div>
        </div>
      </div>
    </div>
  );
};

CustomTooltip.propTypes = {
  payload: PropTypes.array,
};

export default CustomTooltip;
