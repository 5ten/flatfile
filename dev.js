var metalsmith = require('metalsmith');
var watch = require('metalsmith-watch');
var markdown = require('metalsmith-markdown');
var tojson = require('metalsmith-to-json');
var assets = require( 'metalsmith-assets-improved' );
var published = require('./metalsmith-published.js');

metalsmith(__dirname)
  .clean(true)
  .destination('./api/')
  .use(published())
  .use(markdown())    
  .use(tojson({
      createIndexes : true,
      magicSlug: true,
      onlyOutputIndex : false,
      indexPaths : ['attorneys','pages','settings']
    })
  )  
  .use(
      watch({
        paths: {
          "${source}/**/*": "**/*" // every source changed will trigger a rebuild of all files
        }
      })
    )  
  .use(
    assets({
      src: 'admin',
      dest: 'admin',
      replace: 'old'
    })
  )  
  .build(function(err){
  if (err) throw err;
});