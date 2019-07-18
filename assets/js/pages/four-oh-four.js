import { html } from 'lit-element';
import BasePage from 'pages/base'

// These are the shared styles needed by this element.
import { SharedStyles } from 'styles/shared-styles';

class FourOhFourPage extends BasePage {
  static get styles() {
    return [
      SharedStyles
    ];
  }

  render() {
    return html`
      <section>
        <h2>Oops! You hit a 404</h2>
        <p>
          The page you're looking for doesn't seem to exist. Head back
          <a href="/">home</a> and try again?
        </p>
      </section>
    `
  }
}

window.customElements.define('page-four-oh-four', FourOhFourPage);
