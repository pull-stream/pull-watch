# pull-watch

fs.watch with pull streams using [`chokidar`](https://github.com/paulmillr/chokidar)

```shell
npm install --save pull-watch
```

## example

```js
var pull = require('pull-stream')
var watch = require('pull-watch')

var watcher = watch('./')

pull(
  watcher.listen(),
  pull.drain(function (event) {
    console.log('event', event)
  }, function (err) {
    watcher.end()
  })
)
```

## usage

### `watch = require('pull-watch')`

### `notify = watch(paths,[ options,] onReady)`

where `paths` is a files, dirs to be watched recursively, or glob patterns.

optional options are for [`chokidar`](https://github.com/paulmillr/chokidar#api).

watch returns a [`pull-notify`](https://github.com/pull-stream/pull-notify) stream with properties:

- `listen()`: function to create a pull source stream of the file watcher events
- `abort(err)`: function to end the file watcher and signal an error to all respective streams
- `end()`: function to end the file watcher and signal completion to all respective streams

`onReady(notify)` is called on "ready" event.

## license

The Apache License

Copyright &copy; 2016 Michael Williams

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
