module.exports.initialize = function(app) {
  app.get('/test', function(req, res) {
    res.json({test: 'hi'});
  });

  app.get('/', function(req, res) {
    res.sendFile(app.get('root') + '/build/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};