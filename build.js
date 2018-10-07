var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var assets = require( 'metalsmith-assets-improved' );
var published = require('./metalsmith-published.js');
var tojson = require('./metalsmith-to-json.js');

metalsmith(__dirname)
  .clean(true)
  .destination('./build/')
  .use(published())
  .use(markdown())
  .use(tojson({
      magicSlug: true,
      onlyOutputIndex : false,
      createIndexes : true,      
      indexPaths : ['kitchensink', 'pages']
    })
  )  
  .use(
    assets({
      src: 'assets',
      dest: ''
    })
  )  
  .build(function(err){
  if (err) throw err;
});
