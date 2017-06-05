import React from 'react';
import PropTypes from 'prop-types'; 
import moment from 'moment';
import css from './styles.css';

const CustomTooltip = ({ payload }) => {
  return (
    <div className={css.wrapper}>
      <div>
        {payload[0] ? moment(payload[0].payload.startDate).format('LL') || null : null}
        <div className={css.tooltipData}>
          <div>
            {payload[0] ? payload[0].value : ''} {payload[0] ? payload[0].unit : ''}
          </div>
          <div>
            {`${payload[1] ? payload[1].value : ''}
            ${payload[1] ? payload[1].unit : ''}`}
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
