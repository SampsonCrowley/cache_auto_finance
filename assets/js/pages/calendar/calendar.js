import { html } from 'lit-element';
import BasePage from 'pages/base'

// These are the elements needed by this element.
import 'components/counter-element';
import 'components/calendar';
import dateFns from 'date-fns'

// These are the shared styles needed by this element.
import { SharedStyles } from 'styles/shared-styles';
import { CalendarPageStyles } from './styles';
import DateSerializer from 'helpers/date-serializer'

class CalendarPage extends BasePage {
  static get properties() {
    return {
      // This is the data from the store.
      _calendarOpen: { type: Boolean },
      _selectedDate: {
        converter: DateSerializer,
      },
    };
  }

  static get styles() {
    return [
      SharedStyles,
      CalendarPageStyles
    ];
  }

  render() {
    return html`
      <section>
        <h2>CSS Grid Based Calendar</h2>
        <button class="button" @click="${this._onClick}">Toggle Calendar</button>
        ${
          this._calendarOpen
          ? html`
              <button class="button" @click="${this._randomDate}">Random Date</button>
              <calendar-grid
                header-style="font-size: 2em;"
                @date-change="${this._onDateChange}"
                selected-date="${this._selectedDate || null}"
              ></calendar-grid>
            `
          : ''
        }
      </section>
    `;
  }

  constructor() {
    super();
    this._calendarOpen = true
  }

  posOrNeg() {
    return Math.random() < 0.5 ? -1 : 1;
  }

  randNumber() {
    return (Math.floor(Math.random() * 365) + 1) * this.posOrNeg();
  }

  _onClick = () => this._calendarOpen = !this._calendarOpen
  _randomDate = () => this._selectedDate = dateFns.format(dateFns.addDays(new Date, this.randNumber()), 'YYYY-MM-DD')
  _onDateChange = (ev) => {
    console.log(ev.detail)
    this._selectedDate = ev.detail.value || null
  }
}

window.customElements.define('page-calendar', CalendarPage);
