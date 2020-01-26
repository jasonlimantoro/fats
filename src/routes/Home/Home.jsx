import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Actions
import { actions, selectors } from '@/counter';
// Components
import Counter from 'components/Counter';
// Utils
import { valueType } from 'components/UtilPropTypes';

const Home = ({ count, increment, decrement }) => {
  return <Counter counter={count} onAdd={increment} onMinus={decrement} />;
};

Home.propTypes = {
  // State
  count: valueType.isRequired,
  // Actions
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    count: selectors.selectCountJS(state),
  }),
  actions,
)(Home);
