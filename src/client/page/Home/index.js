import Home from './Home';
import { connect } from 'react-redux';
import { UserAction } from 'Action';

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
)(Home);
