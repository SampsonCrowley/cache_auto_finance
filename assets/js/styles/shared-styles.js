import { css, unsafeCSS } from 'lit-element';
import { ButtonStyles } from 'styles/button-styles'
import shared from '!!css-loader!stylus-loader!css/shared'
let sharedStylus = ''
try {
  sharedStylus = String(shared[0][1] || '')
} catch(err) {
  console.log(err)
}

export const SharedStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
  }

  section {
    background: var(--app-section-odd-color);
  }

  section > * {
    max-width: 600px;
    margin-right: auto;
    margin-left: auto;
  }

  section:nth-of-type(even) {
    background: var(--app-section-even-color);
  }

  h2 {
    font-size: 24px;
    text-align: center;
    color: var(--app-dark-text-color);
  }

  @media (min-width: 460px) {
    h2 {
      font-size: 36px;
    }
  }

  .circle {
    display: block;
    width: 64px;
    height: 64px;
    margin: 0 auto;
    text-align: center;
    border-radius: 50%;
    background: var(--app-primary-color);
    color: var(--app-light-text-color);
    font-size: 30px;
    line-height: 64px;
  }

  ${ unsafeCSS(sharedStylus) }
  ${ ButtonStyles }
`;
