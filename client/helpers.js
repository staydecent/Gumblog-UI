import request from 'superagent'
import check from 'check-arg-types'


export {
  slugify,
  getTitleFromURL
}

function slugify(text) {
  text = text.replace(/[^-a-zA-Z0-9,&\s]+/ig, '')
  text = text.replace(/-/gi, "_")
  text = text.replace(/\s/gi, "-")
  return '/'+text.toLowerCase()
}

function getTitleFromURL(url, cb) {
  check(arguments, ['string', 'function'])
  request
    .post('/fetch')
    .send(JSON.stringify({url: url}))
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) return cb(null)
      try {
        var result = /<title>(.*?)<\/title>/m.exec(res.body.source)
        if (result && result.length) return cb(result[1])
      } catch (e) {}
      return cb(null)
    })
}
