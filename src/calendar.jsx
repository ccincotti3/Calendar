import React from 'react'
import './calendar.css'
class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {dateObj: null, month: null, day: null, year: null, modal: false}
    this.populateCalendar = this.populateCalendar.bind(this);
    this.changeDir = this.changeDir.bind(this);
    this.goModal = this.goModal.bind(this);
  }

  componentDidMount() {
    let date = new Date();
    let month = date.getMonth();
    let day = date.getDate();
    let year = date.getFullYear();

    this.setState({dateObj:date, month: month, day: day, year: year});
  }

  goModal() {
    this.setState({modal: !this.state.modal})
    console.log('click')
  }

  buildModal() {
    return (
      <div className="modal">
        <div className="modal-content">
           <span onClick={this.goModal} className="close">&times;</span>
          <h1>Hi</h1>
        </div>
      </div>
    )
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
      return <td className='day-name' key={i}>{dayName}</td>;
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
      return <Week modalFn={this.goModal} days={arr} key={i} />
    });
    return mapWeeks;
  }

  changeDir(dir) {
    if(dir === 'left') {
      if(this.state.month === 0) {
        this.setState({year: this.state.year - 1});
        this.setState({month: 11});
      } else {
        this.setState({month: (this.state.month - 1)});
      }
    } else {
      if(this.state.month === 11) {
        this.setState({year: this.state.year + 1});
        this.setState({month: 0});
      } else {
        this.setState({month: (this.state.month + 1)});
      }
    }
    return;
  }

  render() {
    const modal = this.state.modal ? this.buildModal() : ""

    const monthName = this.parseMonth(this.state.month)
    const days = this.populateCalendar(this.state.month, this.state.year);
    return (
      <div className="calendar">
        {modal}
        <div className="calendar-header">
          <span>
            <button onClick={() => this.changeDir('left')}>Left</button>
            {monthName} {this.state.year}
            <button onClick={() => this.changeDir('right')}>Right</button>
          </span>
        </div>
        <table className="calendar-days">
          <tr>{this.parseWeek()}</tr>
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
          <td className="box" onClick={this.props.modalFn} key={i}>
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
