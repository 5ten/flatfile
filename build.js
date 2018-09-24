var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var tojson = require('metalsmith-to-json');
var published = require('./metalsmith-published.js');

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
  .build(function(err){
  if (err) throw err;
});
