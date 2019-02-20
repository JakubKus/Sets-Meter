import ReactGA from 'react-ga';

const AnalyticsEvent = component => (
  ReactGA.event({
    category: component.name,
    action: component.value,
  })
);

export default AnalyticsEvent;
