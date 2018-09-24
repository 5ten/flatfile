var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var tojson = require('metalsmith-to-json');
var published = require('./metalsmith-published.js');
var assets = require( 'metalsmith-assets-improved' );

metalsmith(__dirname)
  .clean(true)
  .destination('./api/')
  .use(markdown())
  .use(tojson({
      magicSlug: true,
      onlyOutputIndex : false,
      createIndexes : true,      
      indexPaths : ['attorneys','pages','settings']
    })
  )  
  .use(published())
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
