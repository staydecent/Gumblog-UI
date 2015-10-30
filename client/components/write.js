import {html} from 'snabbdom-jsx'
import dom from 'ampersand-dom'

import store from '../store.js'
import Title from './title.js'


export default Write

function Write({post}) {
  const autofocus = (_, vnode) => {
    if (post.title) vnode.elm.focus()
  }

  return <div classNames="pure-g">
    <div classNames="pure-u-1">
      <form classNames="pure-form">
        <Title title={post.title} autofocus={!post.slug} /> 

        <input 
          type="text" 
          id="slug" 
          name="slug"
          classNames="minor"
          class-ghost={post.slug === ''}
          value={post.slug}
          disabled={true}
          />

        <textarea 
          id="body" 
          name="body"
          class-ghost={!post.title}
          autofocus={post.title}
          hook-postpatch={autofocus}
          ></textarea>
      </form>
    </div>
  </div>
}
