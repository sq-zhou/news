import AuthNav from './AuthNav';

import { connect } from 'react-redux';
import { user as UserAction } from 'Action';

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(UserAction.login(user)),
    logout: () => dispatch(UserAction.logout()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthNav);
