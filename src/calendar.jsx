import React from 'react'

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {month: null, day: null, year: null}
  }

  componentDidMount() {
    let date = new Date();
    let month = date.getMonth();
    let day = date.getDay();
    let year = date.getYear();
  }

  render() {
    return <p>"Calendar"</p>
  }
}

export default Calendar
