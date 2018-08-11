console.log('starting function')
console.log('webpack test')
exports.handle = function(e, ctx, cb) {
  console.log('processing event: %j', e)
  cb(null, { hello: 'world' })
}
