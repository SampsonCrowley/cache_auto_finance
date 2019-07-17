/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from 'lit-element';
import BasePage from 'pages/base'

// These are the elements needed by this element.
import 'components/counter-element';
import ConnectionSpeed from 'helpers/connection-speed';

// These are the shared styles needed by this element.
import { SharedStyles } from 'styles/shared-styles';

class CounterPage extends BasePage {
  static get properties() {
    return {
      // This is the data from the store.
      _clicks: { type: Number },
      _value: { type: Number },
      _lastUpdate: { attribute: false }
    };
  }

  static get styles() {
    return [
      SharedStyles
    ];
  }

  render() {
    return html`
      <section>
        <h2>Stateful Counter</h2>
        <div class="circle">${this._clicks}</div>
      </section>
      <section>
        <p>
          <counter-element
            value="${this._value}"
            clicks="${this._clicks}"
            @counter-incremented="${this._increment}"
            @counter-decremented="${this._decrement}"
          >
          </counter-element>
        </p>
        <p>
          ${JSON.stringify(ConnectionSpeed.currentState)}
        </p>
        <p>
          ${this._lastUpdate}
        </p>
      </section>
    `;
  }

  constructor() {
    super();
    this._clicks = 0;
    this._value = 0;
    this._lastUpdate = null
  }

  connectedCallback() {
    console.log('connected')
    ConnectionSpeed.register(this._onConnectionUpdated)
    super.connectedCallback()
  }

  disconnectedCallback() {
    console.log('disconnected')
    ConnectionSpeed.unregister(this._onConnectionUpdated)
    super.disconnectedCallback()
  }

  _increment() {
    this._clicks++;
    this._value++;
  }

  _decrement() {
    this._clicks++;
    this._value--;
  }

  _onConnectionUpdated = (st) => {
    console.log(st)
    this._lastUpdate = new Date
    this.requestUpdate()
  }
}

window.customElements.define('page-counter', CounterPage);
