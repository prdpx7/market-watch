import React from 'react';
import PropTypes from 'prop-types';

import './App.css';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked,
    }
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this.setState({ checked: this.props.checked });
  }

  onChange() {
    this.setState({ checked: !this.state.checked })
  }
  render() {
    return (
      <div className="switch-container">
        <label>
          <input ref="switch" checked={this.state.checked} className="switch" type="checkbox" onChange={this.onChange} />
          <div>

            <div></div>
          </div>
        </label>
      </div>
    );
  }
}

Toggle.PropTypes = {
  onChange: PropTypes.func
}
export default Toggle;