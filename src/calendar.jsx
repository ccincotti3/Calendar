import React from 'react'
import './calendar.css'
class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {dateObj: null, month: null, day: null, year: null}
    this.populateCalendar = this.populateCalendar.bind(this);
  }

  componentDidMount() {
    let date = new Date();
    let month = date.getMonth();
    let day = date.getDate();
    let year = date.getFullYear();

    this.setState({dateObj:date, month: month, day: day, year: year});
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

  populateCalendar() {
    let daysOfMonth = new Date(this.state.year, this.state.month, 0).getDate();
    let firstDay = new Date(this.state.year, this.state.month, 1).getDay();

    let weeks = [];
    let firstWeek = [];
    let day = 1;

    for (var i = firstDay; i < 7; i++) {
      firstWeek[i] = day;
      day++;
    }
    weeks.push(firstWeek);

    let end = false; //reach end of days?

    while(!end) {
      let thisWeek = [];
      for (var i = 0; i < 7; i++) {
        thisWeek[i] = day;

        if(day >= daysOfMonth) {
          end = true;
          day = 0;
        }
        day++;
      }
      weeks.push(thisWeek);
    }

    return weeks;
  }

  render() {
    const monthName = this.parseMonth(this.state.month)
    const weekNames = this.parseWeek();
    console.log(this.populateCalendar());
    return (
      <div className="calendar">
        <div className="calendar-header">
          <span>{monthName} {this.state.year}</span>
        </div>
        <div className="calendar-week">
          {weekNames}
        </div>
        <div className="calendar-days">
          {this.state.day}
        </div>
      </div>
    )
  }
}
//
class Week extends React.Component {
  constructor(props) {
    super(props);
  }
  //get start day, get # of days,
}

export default Calendar;
