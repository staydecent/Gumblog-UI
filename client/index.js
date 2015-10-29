import h from 'snabbdom/h'
import snabbdom from 'snabbdom'

import store from './store.js'
import Write from './components/write.js'

const patch = snabbdom.init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/style'),
  require('snabbdom/modules/eventlisteners')
])

let vnode

window.addEventListener('DOMContentLoaded', () => {
  let node = document.getElementById('app')
  vnode = patch(node, Write(store.getState()))
})

store.subscribe(() => { vnode = patch(vnode, Write(store.getState())) })
