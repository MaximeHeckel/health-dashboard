import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import gql from 'graphql-tag';
import { query } from '../config';
import css from './styles.css';

import DailyHeartRate from './sections/DailyHeartRate';
import DailySteps from './sections/DailySteps';
import DailyWeight from './sections/DailyWeight';
import DailyCycling from './sections/DailyCycling';
import DailySleep from './sections/DailySleep';

import WeeklySteps from './sections/WeeklySteps';
import WeeklyWeight from './sections/WeeklyWeight';
import WeeklyHeartRate from './sections/WeeklyHeartRate';
import WeeklySleep from './sections/WeeklySleep';

const healthQuery =
  gql`${query}`;

@withRouter
@graphql(healthQuery, {
  options: props => ({
    variables: {
      date: props.match.params.date === 'today' ?
        moment().format('YYYYMMDD') : props.match.params.date,
      date1: props.match.params.date === 'today'
        ? moment().add(-1, 'days').format('YYYYMMDD') :
        moment(props.match.params.date).add(-1, 'days').format('YYYYMMDD'),
      date2: props.match.params.date === 'today'
        ? moment().add(-2, 'days').format('YYYYMMDD') :
        moment(props.match.params.date).add(-2, 'days').format('YYYYMMDD'),
      date3: props.match.params.date === 'today'
        ? moment().add(-3, 'days').format('YYYYMMDD') :
        moment(props.match.params.date).add(-3, 'days').format('YYYYMMDD'),
      date4: props.match.params.date === 'today'
        ? moment().add(-4, 'days').format('YYYYMMDD') :
        moment(props.match.params.date).add(-4, 'days').format('YYYYMMDD'),
      date5: props.match.params.date === 'today'
        ? moment().add(-5, 'days').format('YYYYMMDD') :
        moment(props.match.params.date).add(-5, 'days').format('YYYYMMDD'),
      date6: props.match.params.date === 'today'
        ? moment().add(-6, 'days').format('YYYYMMDD') :
        moment(props.match.params.date).add(-6, 'days').format('YYYYMMDD'),
    },
  }),
})
class General extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    params: PropTypes.object,
    data: PropTypes.shape({
      isLoading: PropTypes.bool,
      CyclingDistance: PropTypes.object,
      HeartRate: PropTypes.array,
      MinMaxHeartRate: PropTypes.object,
    }),
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }

  componentWillMount() {
    const { match } = this.props;
    const { params } = match;
    if (params.date !== 'today' && !moment(params.date).isValid()) {
      this.props.history
        .push('/entry/today');
    }
  }

  goToPreviousDay() {
    const previousDate = this.props.match.params.date === 'today' ?
            moment().add(-1, 'days').format('YYYYMMDD') :
            moment(this.props.match.params.date).add(-1, 'days').format('YYYYMMDD');
    this.props.history
      .push(`/entry/${previousDate}`);
  }

  goToNextDay() {
    const nextDate = this.props.match.params.date === 'today' ?
            moment().add(1, 'days').format('YYYYMMDD') :
            moment(this.props.match.params.date).add(1, 'days').format('YYYYMMDD');
    this.props.history
      .push(`/entry/${nextDate}`);
  }

  render() {
    const { data = {}, match } = this.props;
    const { params } = match;
    const today = moment().format('LL');
    const {
      HeartRate = [],
      MinMaxHeartRate = {},
      StepCount = {},
      WalkingRunningDistance = {},
      Weight = {},
      BMI = {},
      BodyFatPercentage = {},
      CyclingDistance = {},
      SleepAnalysis = {},
      StepCountDate6 = {},
      StepCountDate5 = {},
      StepCountDate4 = {},
      StepCountDate3 = {},
      StepCountDate2 = {},
      StepCountDate1 = {},
      MinMaxHeartRateDate6 = {},
      MinMaxHeartRateDate5 = {},
      MinMaxHeartRateDate4 = {},
      MinMaxHeartRateDate3 = {},
      MinMaxHeartRateDate2 = {},
      MinMaxHeartRateDate1 = {},
      SleepAnalysisDate6 = {},
      SleepAnalysisDate5 = {},
      SleepAnalysisDate4 = {},
      SleepAnalysisDate3 = {},
      SleepAnalysisDate2 = {},
      SleepAnalysisDate1 = {},
      CyclingDate6 = {},
      CyclingDate5 = {},
      CyclingDate4 = {},
      CyclingDate3 = {},
      CyclingDate2 = {},
      CyclingDate1 = {},
      WeightDate6 = {},
      WeightDate5 = {},
      WeightDate4 = {},
      WeightDate3 = {},
      WeightDate2 = {},
      WeightDate1 = {},
      BodyFatPercentage6 = {},
      BodyFatPercentage5 = {},
      BodyFatPercentage4 = {},
      BodyFatPercentage3 = {},
      BodyFatPercentage2 = {},
      BodyFatPercentage1 = {},
    } = data;

    const stepWeeklyData = [
      StepCountDate6,
      StepCountDate5,
      StepCountDate4,
      StepCountDate3,
      StepCountDate2,
      StepCountDate1,
      StepCount,
    ];

    const cyclingWeeklyData = [
      CyclingDate6,
      CyclingDate5,
      CyclingDate4,
      CyclingDate3,
      CyclingDate2,
      CyclingDate1,
      CyclingDistance,
    ];

    const weightWeeklyData = [
      WeightDate6,
      WeightDate5,
      WeightDate4,
      WeightDate3,
      WeightDate2,
      WeightDate1,
      Weight,
    ];

    const bodyfatWeeklyData = [
      BodyFatPercentage6,
      BodyFatPercentage5,
      BodyFatPercentage4,
      BodyFatPercentage3,
      BodyFatPercentage2,
      BodyFatPercentage1,
      BodyFatPercentage,
    ];

    const heartRateWeeklyData = [
      MinMaxHeartRateDate6,
      MinMaxHeartRateDate5,
      MinMaxHeartRateDate4,
      MinMaxHeartRateDate3,
      MinMaxHeartRateDate2,
      MinMaxHeartRateDate1,
      MinMaxHeartRate,
    ];

    const sleepWeeklyData = [
      SleepAnalysisDate6,
      SleepAnalysisDate5,
      SleepAnalysisDate4,
      SleepAnalysisDate3,
      SleepAnalysisDate2,
      SleepAnalysisDate1,
      SleepAnalysis,
    ];

    return (
      <div id="main-layout">
        <div className={css.mainHeader}>
          <div className={css.wrapper}>
            <div className={css.titleSection}>
              <div className={css.mainTitle}>
                Health Dashboard
              </div>
              <div className={css.subTitleBlock}>
                Maxime Heckel —
                <span className={css.emphasize}>
                  <i className="fa fa-map-marker"
                    aria-hidden="true"
                  >
                  </i>
                  San Francisco, CA
                </span>
              </div>
            </div>
            <div className={css.section}>
              <div className={css.sectionTop} >
                <div className={css.sectionTitle}>
                  {params.date === 'today' ?
                    'Today\'s data' : 'Detailed data'
                  }
                </div>
                <div className={css.emphasize}>
                  {params.date === 'today' ?
                    today : moment(params.date).format('LL')
                  }
                  <span className={css.buttonWrapper}>
                    <div
                      className={css.buttons}
                      onClick={() => this.goToPreviousDay()}
                    >
                      Previous
                    </div>
                    <div
                      className={css.buttons}
                      onClick={() => this.goToNextDay()}
                    >
                      Next
                    </div>
                  </span>
                </div>
              </div>
              <div className={css.dataRow}>
                <div className={css.dataItem}>
                  <DailyHeartRate
                    data={HeartRate}
                    min={MinMaxHeartRate.min}
                    max={MinMaxHeartRate.max}
                    today={params.date === 'today'}
                  />
                </div>
                <div className={css.dataItem}>
                  <DailyWeight
                    dataWeight={Weight}
                    dataBmi={BMI}
                    dataBF={BodyFatPercentage}
                  />
                </div>
                <div className={css.dataItem}>
                  <DailySteps
                    dataSteps={StepCount}
                    dataDistance={WalkingRunningDistance}
                  />
                </div>
                <div className={css.dataItem}>
                  <DailyCycling
                    dataCycling={CyclingDistance}
                  />
                  <DailySleep
                    dataSleep={SleepAnalysis}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={css.wrapper}>
            <div className={css.section}>
              <div className={css.sectionTop} >
                <div className={css.sectionTitle}>
                  Weekly data
                </div>
                <div className={css.emphasize}>
                  {params.date === 'today' ?
                    `${moment().add(-6, 'days').format('LL')}
                    – ${today}`
                    :
                    `${moment(params.date).add(-6, 'days').format('LL')}
                    – ${moment(params.date).format('LL')}`
                  }
                </div>
              </div>
              <div className={`${css.dataRow} ${css.graphRow}`}>
                <div className={css.dataItem}>
                  <WeeklySteps
                    dataSteps={stepWeeklyData}
                    dataCycling={cyclingWeeklyData}
                  />
                </div>
                <div className={css.dataItem}>
                  <WeeklyWeight
                    dataWeight={weightWeeklyData}
                    dataBF={bodyfatWeeklyData}
                  />
                </div>
              </div>
              <div className={`${css.dataRow} ${css.graphRow}`}>
                <div className={css.dataItem}>
                  <WeeklyHeartRate
                    dataHR={heartRateWeeklyData}
                  />
                </div>
                <div className={css.dataItem}>
                  <WeeklySleep
                    dataSleep={sleepWeeklyData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(General);
