/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html, css } from 'lit-element'
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js'
import MediaQuery from 'helpers/media-query'
import ConnectionSpeed from 'helpers/connection-speed'
import Router from 'helpers/router'
import Metadata from 'helpers/metadata'


// These are the elements needed by this element.
// import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import './toolbar';
import './drawer'
import { menuIcon } from 'components/icons';
import 'components/snack-bar';
import { LayoutStyles, SharedStyles } from 'styles'

class ClientLayout extends LitElement {
  static get properties() {
    return {
      appTitle: { type: String },
      _page: { type: String },
      _drawerOpened: { type: Boolean },
      _snackbarOpened: { type: Boolean },
      _offline: { type: Boolean }
    };
  }

  static get styles() {
    return [
      SharedStyles,
      LayoutStyles
    ];
  }

  render() {
    // Anything that's related to rendering should be done in here.
    return html`
      <!-- Header -->
      <app-header reveals effects="waterfall">
        <app-toolbar class="toolbar-top">
          <button class="menu-btn" title="Menu" @click="${this._menuButtonClicked}">${menuIcon}</button>
          <div main-title>${this.appTitle}</div>
        </app-toolbar>

        <!-- This gets hidden on a small screen-->
        <nav class="toolbar-list">
          <a ?selected="${this._page === 'home'}" href="/home">Home</a>
          <a ?selected="${this._page === 'calendar'}" href="/calendar">Calendar</a>
          <a ?selected="${this._page === 'counter'}" href="/counter">Counter</a>
        </nav>
      </app-header>

      <!-- Drawer content -->
      <app-drawer
          .opened="${this._drawerOpened}"
          @opened-changed="${this._drawerOpenedChanged}">
        <nav class="drawer-list">
          <a ?selected="${this._page === 'home'}" href="/home">Home</a>
          <a ?selected="${this._page === 'calendar'}" href="/calendar">Calendar</a>
          <a ?selected="${this._page === 'counter'}" href="/counter">Counter</a>
        </nav>
      </app-drawer>

      <!-- Main content -->
      <main role="main" class="main-content">
        <page-home class="page" ?active="${this._page === 'home'}"></page-home>
        <page-calendar class="page" ?active="${this._page === 'calendar'}"></page-calendar>
        <page-counter class="page" ?active="${this._page === 'counter'}"></page-counter>
        <page-four-oh-four class="page" ?active="${this._page === '404'}"></page-four-oh-four>
      </main>

      <footer>
        <p>Down Under Sports</p>
      </footer>

      <snack-bar ?active="${this._snackbarOpened}">
        You are now ${this._offline ? 'offline' : 'online'}.
      </snack-bar>
    `;
  }

  constructor() {
    super();
    this._drawerOpened = false;
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
  }

  connectedCallback() {
    super.connectedCallback()

    ConnectionSpeed.registerStatus(this._offlineChanged)
    MediaQuery.register('(min-width: 768px)', this._layoutChanged)
    Router.register(this._locationChanged)
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    ConnectionSpeed.unregisterStatus(this._offlineChanged)
    MediaQuery.unregister('(min-width: 768px)', this._layoutChanged)
    Router.unregister(this._locationChanged)
  }

  updated(changedProps) {
    if (changedProps.has('_page')) {
      const pageTitle = this.appTitle + ' - ' + this._page;
      Metadata.update({
        title: pageTitle,
        description: pageTitle
        // This object also takes an image property, that points to an img src.
      });
    }
  }

  _onDateChange = (ev) => console.log(ev.detail)

  _layoutChanged = ({ matches }) => {
    // The drawer doesn't make sense in a wide layout, so if it's opened, close it.
    if(matches) this._updateDrawerState(false);
  }

  _offlineChanged = (offline) => {
    if(offline !== this._offline) {
      const previousOffline = this._offline;
      this._offline = offline;

      // Don't show the snackbar on the first load of the page.
      if(previousOffline === undefined) return;

      clearTimeout(this._snackbarTimer);
      this._snackbarOpened = true;
      this._snackbarTimer = setTimeout(() => { this._snackbarOpened = false }, 3000);
    }
  }

  _locationChanged = ({ location }) => {
    const path = window.decodeURIComponent(location.pathname);
    const page = path === '/' ? 'home' : path.slice(1);
    this._loadPage(page);
    // Any other info you might want to extract from the path (like page type),
    // you can do here.

    // Close the drawer - in case the *path* change came from a link in the drawer.
    this._updateDrawerState(false);
  }

  _updateDrawerState(opened) {
    if (opened !== this._drawerOpened) {
      this._drawerOpened = opened;
    }
  }

  _loadPage(page) {
    switch(page) {
      case 'home':
        import('pages/home').then((module) => {
          // Put code in here to run every time when
          // navigating to home after home is loaded.
        });
        break;
      case 'calendar':
        import('pages/calendar');
        break;
      case 'counter':
        import('pages/counter');
        break;
      default:
        page = '404';
        import('pages/four-oh-four');
    }

    this._page = page;
  }

  _menuButtonClicked() {
    this._updateDrawerState(true);
  }

  _drawerOpenedChanged(e) {
    this._updateDrawerState(e.target.opened);
  }
}

window.customElements.define('layout-client', ClientLayout);
