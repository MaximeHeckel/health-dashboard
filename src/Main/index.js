import General from './General';

export default {
  path: '/entry',
  component: require('./Main').default,
  indexRoute: { onEnter: (nextState, replace) => replace('/entry/today') },
  childRoutes: [
    General,
  ],
};
