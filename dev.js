var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var assets = require( 'metalsmith-assets-improved' );
var published = require('./metalsmith-published.js');
var tojson = require('./metalsmith-to-json.js');
var watch = require('metalsmith-watch');

metalsmith(__dirname)
  .clean(true)
  .destination('./build/')
  .use(published())
  .use(markdown())    
  .use(tojson({
      createIndexes : true,
      magicSlug: true,
      onlyOutputIndex : false,
      indexPaths : ['attorneys','pages','settings','articles']
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
      src: 'assets/admin',
      dest: ''
    })
  )  
  .build(function(err){
  if (err) throw err;
});