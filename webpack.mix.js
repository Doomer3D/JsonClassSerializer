const { mix } = require('laravel-mix');

mix
    .setPublicPath('dist')
    .js('src/index.js', 'dist/js');
