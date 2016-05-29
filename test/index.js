var test = require('tape')
var fs = require('fs')
var Path = require('path')
var pull = require('pull-stream')

var watch = require('../')

test('pull-watch', function (t) {
  t.ok(watch, 'module is require-able')
  t.end()
})

test('write should notify update', function (t) {
  var directory = Path.join(__dirname, 'fixtures')
  var file = Path.join(directory, 'file.txt')
  var source = fs.readFileSync(file, 'utf8')

  watch(directory, function (source) {
    pull(
      source.listen(),
      pull.drain(function (event) {
        var expected = {
          type: 'change',
          path: file
        }
        t.deepEqual(event, expected)
        end()
      })
    )

    fs.writeFileSync(file, randomString())

    function end () {
      source.end()
      t.end()
    }
  })
})

function randomString () {
  return Math.random().toString().slice(2)
}
