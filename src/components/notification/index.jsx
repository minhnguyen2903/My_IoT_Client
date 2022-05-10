import React from 'react';
import ReactNotifications from 'react-browser-notifications';

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.showNotifications = this.showNotifications.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  showNotifications() {
    if(this.n.supported()) this.n.show();
  }

  handleClick(event) {
    window.focus()
    this.n.close(event.target.tag);
  }

  componentDidMount() {
    this.showNotifications();
  }

  render() {
    return (
      <div>
        <ReactNotifications
          onRef={ref => (this.n = ref)} // Required
          title="Some Title" // Required
          body={this.props.message}
          icon="devices-logo.png"
          tag="abcdef"
          onClick={event => this.handleClick(event)}
        />
      </div>
    )
  }
}
export default Example;