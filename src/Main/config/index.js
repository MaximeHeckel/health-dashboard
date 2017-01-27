export const query = `query HealthData (
  $date: String!,
  $date1: String!,
  $date2: String!,
  $date3: String!,
  $date4: String!,
  $date5: String!,
  $date6: String!){
    HeartRate(date: $date)
      {
        startDate,
        value,
        endDate
      }
    CyclingDistance(date: $date)
      {
        startDate,
        value,
        endDate
      }
    MinMaxHeartRate(date: $date)
      {
        min,
        max
      }
    WalkingRunningDistance(date: $date)
      {
        startDate,
        value,
        endDate
      }
    StepCount(date: $date)
      {
        startDate,
        value,
        endDate
      }
    SleepAnalysis(date: $date)
      {
        startDate,
        value,
        endDate
      }
    Weight(date: $date)
      {
        startDate,
        value,
        endDate
      }
    BodyFatPercentage(date: $date)
      {
        startDate,
        value,
        endDate
      }
    BMI(date: $date)
      {
        startDate,
        value,
        endDate
      }
    MinMaxHeartRateDate1: MinMaxHeartRate(date: $date1)
      {
        min,
        max
      }
    MinMaxHeartRateDate2: MinMaxHeartRate(date: $date2)
      {
        min,
        max
      }
    MinMaxHeartRateDate3: MinMaxHeartRate(date: $date3)
      {
        min,
        max
      }
    MinMaxHeartRateDate4: MinMaxHeartRate(date: $date4)
      {
        min,
        max
      }
    MinMaxHeartRateDate5: MinMaxHeartRate(date: $date5)
      {
        min,
        max
      }
    MinMaxHeartRateDate6: MinMaxHeartRate(date: $date6)
      {
        min,
        max
      }
    SleepAnalysisDate1: SleepAnalysis(date: $date1)
      {
        startDate,
        value,
        endDate,
      }
    SleepAnalysisDate2: SleepAnalysis(date: $date2)
      {
        endDate,
        startDate,
        value,
      }
    SleepAnalysisDate3: SleepAnalysis(date: $date3)
      {
        startDate,
        value,
        endDate,
      }
    SleepAnalysisDate4: SleepAnalysis(date: $date4)
      {
        startDate,
        value,
        endDate,
      }
    SleepAnalysisDate5: SleepAnalysis(date: $date5)
      {
        startDate,
        value,
        endDate,
      }
    SleepAnalysisDate6: SleepAnalysis(date: $date6)
      {
        startDate
        value,
        endDate,
      }
    StepCountDate1: StepCount(date: $date1)
      {
        startDate,
        value,
      }
    StepCountDate2: StepCount(date: $date2)
      {
        startDate,
        value,
      }
    StepCountDate3: StepCount(date: $date3)
      {
        startDate,
        value,
      }
    StepCountDate4: StepCount(date: $date4)
      {
        startDate,
        value,
      }
    StepCountDate5: StepCount(date: $date5)
      {
        startDate,
        value,
      }
    StepCountDate6: StepCount(date: $date6)
      {
        startDate,
        value,
      }
    CyclingDate1: CyclingDistance(date: $date1)
      {
        startDate
        value,
      }
    CyclingDate2: CyclingDistance(date: $date2)
      {
        startDate,
        value,
      }
    CyclingDate3: CyclingDistance(date: $date3)
      {
        startDate,
        value,
      }
    CyclingDate4: CyclingDistance(date: $date4)
      {
        startDate,
        value,
      }
    CyclingDate5: CyclingDistance(date: $date5)
      {
        startDate,
        value,
      }
    CyclingDate6: CyclingDistance(date: $date6)
      {
        startDate,
        value,
      }
    WeightDate1: Weight(date: $date1)
      {
        startDate
        value,
      }
    WeightDate2: Weight(date: $date2)
      {
        startDate,
        value,
      }
    WeightDate3: Weight(date: $date3)
      {
        startDate,
        value,
      }
    WeightDate4: Weight(date: $date4)
      {
        startDate,
        value,
      }
    WeightDate5: Weight(date: $date5)
      {
        startDate,
        value,
      }
    WeightDate6: Weight(date: $date6)
      {
        startDate,
        value,
      }
    BodyFatPercentage1: BodyFatPercentage(date: $date1)
      {
        startDate
        value,
      }
    BodyFatPercentage2: BodyFatPercentage(date: $date2)
      {
        startDate,
        value,
      }
    BodyFatPercentage3: BodyFatPercentage(date: $date3)
      {
        startDate,
        value,
      }
    BodyFatPercentage4: BodyFatPercentage(date: $date4)
      {
        startDate,
        value,
      }
    BodyFatPercentage5: BodyFatPercentage(date: $date5)
      {
        startDate,
        value,
      }
    BodyFatPercentage6: BodyFatPercentage(date: $date6)
      {
        startDate,
        value,
      }
    }`;
