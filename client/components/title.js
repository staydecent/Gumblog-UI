import {html} from 'snabbdom-jsx'
import kefir from 'kefir'
import dom from 'ampersand-dom'

import store from '../store.js'
import {slugify} from '../helpers.js'


const ENTER = 13

function onInsert(vnode) {
  let input = kefir.fromEvents(vnode.elm, 'keyup')
    .debounce(250)
    .filter(e => (e.keyCode ? e.keyCode : e.which) === ENTER)
    .map(e => e.target.value.trim())
    .filter(v => v.length > 4)
    .skipDuplicates()
  
  input.onValue(v => {
    store.dispatch({ post: {title: v, slug: slugify(v)} })
  })
}

function handleTitleKeyup(post, e) {
  let val = e.target.value
  let isURL = val.indexOf('http') > -1
  let code = (e.keyCode ? e.keyCode : e.which)
  let $slug = document.getElementById('slug')
  let $body = document.getElementById('body')

  if (code === ENTER && val.length > 4) {
    post.title = val
    post.slug = slugify(val)
    store.dispatch({post: post})
    dom.removeClass($slug, 'ghost')
    dom.removeClass($body, 'ghost')
    $body.focus()
  }
}

export default Title

function Title({title, autofocus}) {
  return <input 
          type="text" 
          id="title"
          name="title" 
          value={title} 
          hook-insert={onInsert}
          autofocus={autofocus } 
          placeholder="Start writing here&hellip;" />
}
