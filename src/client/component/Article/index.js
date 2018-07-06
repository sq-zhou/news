import Article from './Article'

import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Article);
