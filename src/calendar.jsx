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
    return dayNames.map((dayName, i) => {
      return <span className='day-name' key={i}>{dayName}</span>;
    })
  }

  populateCalendar(month, year) {
    let daysOfMonth = new Date(year, month + 1, 0).getDate(); // have to add one
    let firstDay = new Date(year, month, 1).getDay();
    let daysOfLastMonth = new Date(year, month, 0).getDate();
    let startLastMonth = daysOfLastMonth - firstDay + 1;

    let weeks = [];
    let firstWeek = [];
    let day = 1;
    weeks.push(this.parseWeek())
    for (var i = 0; i < 7; i++) {
      if(i < firstDay) {
        firstWeek[i] = startLastMonth;
        startLastMonth++;
      }
      else {
        firstWeek[i] = day;
        day++;
      }
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
    const mapWeeks = weeks.map((arr, i) => {
      return <Week days={arr} key={i} />
    });
    return mapWeeks;
  }

  render() {
    const monthName = this.parseMonth(this.state.month)
    const days = this.populateCalendar(this.state.month, this.state.year);
    return (
      <div className="calendar">
        <div className="calendar-header">
          <span>{monthName} {this.state.year}</span>
        </div>
        <table className="calendar-days">
          <tbody>
            {days}
          </tbody>
        </table>
      </div>
    )
  }
}
//
class Week extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const dayBox = this.props.days.map((day, i) => {
      return (
          <td className="box" key={i}>
            {day}
          </td>
    )
    });
    return (
      <tr>
        {dayBox}
      </tr>
    )
  }
}

export default Calendar;
