var metalsmith = require('metalsmith');
var watch = require('metalsmith-watch');
var markdown = require('metalsmith-markdown');
var tojson = require('metalsmith-to-json');
var published = require('./metalsmith-published.js');

metalsmith(__dirname)
  .clean(true)
  .destination('./api/')
  .use(markdown())    
  .use(tojson({
      createIndexes : true,
      magicSlug: true,
      onlyOutputIndex : false,
      indexPaths : ['attorneys','pages','settings','admin']
    })
  )  
  .use(
      watch({
        paths: {
          "${source}/**/*": "**/*" // every source changed will trigger a rebuild of all files
        }
      })
    )  
  .use(published())
  .build(function(err){
  if (err) throw err;
});

metalsmith(__dirname)
  .source('./')
  .destination('./api/')
  .build(function(err){
  if (err) throw err;
});
