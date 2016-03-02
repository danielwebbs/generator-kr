var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  run: function() {
    console.log('Usage:\n');
    console.log('To add a view, use kr:component');
    console.log('To add a service, use kr:service');
    console.log('To update app.js view integration, use kr:updateAppViews app');
  }
});
