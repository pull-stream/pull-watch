var watch = require('chokidar').watch
var xtend = require('xtend')
var Notify = require('pull-notify')

var ignores = [
  'node_modules/**', 'bower_components/**',
  '.git', '.hg', '.svn', '.DS_Store',
  '*.swp', 'thumbs.db', 'desktop.ini'
]

module.exports = fileWatch
module.exports.ignores = ignores

function fileWatch (glob, options, onReady) {
  if (arguments.length === 2) {
    onReady = options
    options = {}
  }

  options = xtend({
    usePolling: options && options.poll,
    ignored: ignores,
    ignoreInitial: true
  }, options)

  var notify = Notify()
  var watcher = watch(glob, options)

  var stream = {
    listen: notify.listen,
    add,
    abort,
    end
  }

  watcher
  .on('all', function watch (event, path) {
    notify({ type: event, path })
  })
  .on('error', notify.abort)
  .once('ready', function () {
    if (onReady) { onReady(stream) }
  })


  function add (path) {
    watcher.add(path)
  }

  function abort (err) {
    watcher.close()
    notify.abort(err)
  }

  function end () {
    abort(true)
  }

  return stream
}
