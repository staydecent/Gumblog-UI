import {html} from 'snabbdom-jsx'
import kefir from 'kefir'
import dom from 'ampersand-dom'

import store from '../store.js'
import {slugify, getTitleFromURL} from '../helpers.js'
import {fadeIn} from '../styles.js'


const ENTER = 13

function onInsert(vnode) {
  let input = kefir.fromEvents(vnode.elm, 'keyup')
    .debounce(250)
    .filter(e => (e.keyCode ? e.keyCode : e.which) === ENTER)
    .map(e => e.target.value.trim())
    .filter(v => v.length > 4)
    .skipDuplicates()
  
  input.onValue(v => {
    if (v.indexOf('http') > -1) {
      getTitleFromURL(v, t => {
        store.dispatch({ post: {title: t, slug: slugify(t), link: v} }) 
      })
    } else {
      store.dispatch({ post: {title: v, slug: slugify(v)} })
    }
  })
}

export default Title

function Title({title, autofocus}) {
  return <input 
          type="text" 
          id="title"
          name="title" 
          value={title} 
          hook-insert={onInsert}
          autofocus={autofocus} 
          style={fadeIn}
          placeholder="Start writing here&hellip;" />
}
