import { LitElement, html, css } from 'lit-element'

class ClientToolbar extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -ms-flex-align: center;
          -webkit-align-items: center;
          align-items: center;
          position: relative;
          height: 64px;
          padding: 0 16px;
          pointer-events: none;
          font-size: var(--app-toolbar-font-size, 20px);
        }

        :host ::slotted(*) {
          pointer-events: auto;
        }

        :host ::slotted(paper-icon-button) {
          /* paper-icon-button/issues/33 */
          font-size: 0;
        }

        :host ::slotted([main-title]),
        :host ::slotted([condensed-title]) {
          pointer-events: none;
          -ms-flex: 1 1 0.000000001px;
          -webkit-flex: 1;
          flex: 1;
          -webkit-flex-basis: 0.000000001px;
          flex-basis: 0.000000001px;
        }

        :host ::slotted([bottom-item]) {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
        }

        :host ::slotted([top-item]) {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
        }

        :host ::slotted([spacer]) {
          margin-left: 64px;
        }
      `
    ]
  }

  render() {
    return html`<slot></slot>`
  }
}

window.customElements.define('app-toolbar', ClientToolbar);
