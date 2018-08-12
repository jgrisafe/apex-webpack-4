console.log('starting function')

exports.handle = function(e, ctx, cb) {
  console.log('processing event: %j', e)
  cb(null, { test: process.env.ENV_TEST })
}
