import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchBody } from '../actions';

class MessageBody extends Component {
  componentWillMount() {
    this.props.fetchBody(this.props.id);
  }

  render() {
    return (
      <div className="row message-body">
        <div className="col-xs-11 col-xs-offset-1">
          { this.props.body }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ body: state.messageBody });

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchBody
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageBody);
