// packages/ui-library/src/ui-library.js

import { init } from 'snabbdom';
import propsModule from 'snabbdom/modules/props';
import eventListenersModule from 'snabbdom/modules/eventlisteners';

const patch = init([propsModule, eventListenersModule]);

let state = { count: 0 };
let updateCallback = null;

export function createVNode(state) {
  return h('div', [
    h('h1', state.count),
    h('button', { on: { click: incrementCount } }, 'Add'),
  ]);
}

function incrementCount() {
  state.count++;
  if (updateCallback) {
    updateCallback();
  }
}

export function updateState(newState) {
  state = { ...state, ...newState };
  if (updateCallback) {
    updateCallback();
  }
}

export function setUpdateCallback(callback) {
  updateCallback = callback;
}

export function mount(rootElement) {
  const vnode = createVNode(state);
  patch(rootElement, vnode);
}

// packages/ui-library/src/index.js

import { createVNode, mount, updateState, setUpdateCallback } from './ui-library';

const appElement = document.getElementById('app');

setUpdateCallback(() => {
  const updatedVNode = createVNode();
  mount(appElement, updatedVNode);
});

mount(appElement);
