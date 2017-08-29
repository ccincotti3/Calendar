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
    let year = date.getFullYear();

    this.setState({month: month, day: day, year, year});
  }

  parseMonth(num) {
    let monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[num];
  }

  render() {
    const monthName = this.parseMonth(this.state.month)
    return <p>{monthName} {this.state.day} {this.state.year}</p>
  }
}

export default Calendar
