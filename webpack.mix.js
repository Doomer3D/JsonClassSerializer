const { mix } = require('laravel-mix');

mix
    .setPublicPath('.')
    .js('src/index.js', 'dist/js')
    .js('test-src/index.js', 'test/test.js');
