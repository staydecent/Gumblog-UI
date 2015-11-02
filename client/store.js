import atom from 'atom'
import assign from 'object-assign'

const STORAGE = 'gum'

let initialState = assign({
  post: {
    title: '',
    slug: '',
    link: '',
    body: ''
  }
}, JSON.parse(localStorage.getItem(STORAGE)))

let store = atom(reducer, initialState)

store.subscribe(() => {
  console.log('subscribe', store.getState())
  localStorage.setItem(STORAGE, JSON.stringify(store.getState()))
})

export default store


// in our case, action is just a partial 'state' object to merge
function reducer(state, action) {
  return assign({}, state, action)
}
