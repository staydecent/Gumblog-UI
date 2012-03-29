# Gumblog UI

An experimental UI for writing blog posts.

### Check out [the demo](http://test.staydecent.webfactional.com/Gumblog/)

## Features / Goals

- Focused UI for writing
- Easily jot down ideas without populating all fields
- UI Reveals itself only when needed
- Easily write commentary with *link posts*

## Some notes

- I've only tested it on Chrome.
- Try pressing 'tab' or 'enter' ;)
- Try pasting a URL
- 'DRAFT' and 'PUBLIC' do nothing
- type clearPost() in console to clear localStorage data
- `fetch_url.php` must be able to execute to enable *link posts*

**Link posts** are commentary on some link. Pasting a URL in the Title field
will call `fetch_url.php` and grab the title from that external URL.

Feedback, forks and issues encouraged ;)

MIT Licensed