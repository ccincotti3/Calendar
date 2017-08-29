import React from 'react'
import './calendar.css'
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

    this.setState({month: month, day: day, year: year});
  }

  parseMonth(num) {
    let monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[num];
  }

  parseWeek() {
    let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    return <span>{dayNames.join(" ")}</span>
  }

  render() {
    const monthName = this.parseMonth(this.state.month)
    const weekNames = this.parseWeek();
    return (
      <div className="calendar">
        <div className="calendar-header">
          <span>{monthName} {this.state.year}</span>
        </div>
        <div className="calendar-week">
          {weekNames}
        </div>
        <div className="calendar-days">

        </div>
      </div>
    )
  }
}

export default Calendar
