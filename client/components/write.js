import {html} from 'snabbdom-jsx'
import assign from 'object-assign'
import dom from 'ampersand-dom'

import store from '../store.js'
import {slugify} from '../helpers.js'


export default Write

const ENTER = 13

function handleTitleKeyup(post, e) {
  let val = e.target.value
  let isURL = val.indexOf('http') > -1
  let code = (e.keyCode ? e.keyCode : e.which)
  let $link = document.getElementById('link')
  let $body = document.getElementById('body')

  if (code === ENTER && val.length > 4) {
    post.title = val
    post.link = slugify(val)
    store.dispatch({post: post})
    dom.removeClass($link, 'ghost')
    dom.removeClass($body, 'ghost')
    $body.focus()
  }
}

function Write({post}) {
  console.log('Write', post)

  return <div classNames="pure-g">
    <div classNames="pure-u-1">
      <form classNames="pure-form">
        <input 
          type="text" 
          id="title"
          name="title" 
          value={post.title} 
          on-keyup={handleTitleKeyup.bind(null, post)}
          autofocus={true} 
          placeholder="Start writing here&hellip;" />

        <input 
          type="text" 
          id="link" 
          name="link"
          classNames="minor ghost"
          value={post.link}
          />

        <textarea 
          id="body" 
          name="body"
          classNames="ghost"
          ></textarea>
      </form>
    </div>
  </div>
}
