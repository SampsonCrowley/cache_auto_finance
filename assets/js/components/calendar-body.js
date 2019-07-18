import { LitElement, html, css } from 'lit-element';
import { CalendarStyles, SharedStyles } from 'styles';
import DateSerializer from 'helpers/date-serializer'
import dateFns from 'date-fns'

export class CalendarBody extends LitElement {
  static get properties() {
    return {
      startDate: { attribute: false },
      endDate: { attribute: false },
      currentMonth: { attribute: false },
      selectedDate: { attribute: false },
      dayFormat: { attribute: false },
      _rows: { attribute: false }
    };
  }

  static get styles() {
    return [
      SharedStyles,
      CalendarStyles
    ];
  }

  render() {
    return html`
      <ul class="day-grid">
        ${this.rows}
      </ul>
    `
  }

  get rows() {
    return this._rows || []
  }

  updated(changed) {
    if(!changed.has('_rows')) this._buildRows()
  }

  _onDateClick = (ev) => this.dispatchEvent(
    new CustomEvent(
      'date-clicked',
      {
        detail: { date: new Date(+ev.currentTarget.dataset.date) },
        bubbles: true,
        cancelable: false,
      }
    )
  )

  _buildRows = () => {
    const rows = [];

    let day = this.startDate
    while (day <= this.endDate) {
      const className = !dateFns.isSameMonth(day, this.currentMonth)
        ? 'other-month'
        : (this.selectedDate && dateFns.isSameDay(day, this.selectedDate))
          ? 'selected-date'
          : 'current-month'

      rows.push(
        html`
          <li class="${className} clickable" @click="${this._onDateClick}" data-date="${+day}">
            ${dateFns.format(day, this.dayFormat || 'D')}
          </li>
        `
      );
      day = dateFns.addDays(day, 1)
    }

    this._rows = rows;

    return this._rows
  }

}

window.customElements.define('calendar-body', CalendarBody);
