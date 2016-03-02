var generators = require('yeoman-generator');

module.exports = generators.NamedBase.extend({
  paths: function() {
    this.destinationRoot();
    // returns '~/projects'

    this.destinationPath('index.js');
    // returns '~/projects/index.js'

    this.sourceRoot();
    // returns './templates'

    this.templatePath('index.js');
    // returns './templates/index.js'
  },
  configuring: {
    setupFolders: function() {

    }
  },
  writing: {
    components: function(name) {
      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('App/' + name + '/' + name + '.html'), {
          title: name
        }
      );

      this.fs.copyTpl(
        this.templatePath('index.js'),
        this.destinationPath('App/' + name + '/' + name + '.js'), {
          title: name
        }
      );

      this.fs.copyTpl(
        this.templatePath('index.test.js'),
        this.destinationPath('App/' + name + '/' + name + '.test.js'), {
          title: name
        }
      );
    },
    services: function(name) {

    },
    styles: function(name) {

    }
  },
  install: {
    updateConfigs: function(name) {
      var path = "./App/require-setup.js",
      file = this.readFileAsString(path);
      var hook = '// << Yeoman ViewModels Hook >>';
      var insertionContent = '\n\t\t\t' + name + ': ' + "'./app/" + name + "/" + name +  "',";

      /* make modifications to the file string here */
      this.write(path, file.replace(hook, hook + insertionContent));
    },
    updateRoutes: function(name) {
      var path = "./App/router.js",
      file = this.readFileAsString(path);
      var hook = '// << Yeoman Router Hook >>';
      var insertionContent = '\n\t\t\t\t' + "{ url: '/"+ name +"',     params: { page: '"+ name +"' } },";

      /* make modifications to the file string here */
      this.write(path, file.replace(hook, hook + insertionContent));
    },
    updateRegisters: function(name) {

      var path = "./App/app.js",
      file = this.readFileAsString(path);
      var hook = '// << Yeoman Register Hook >>';
      var insertionContent = '\n\t\t\t' + "  ko.components.register('"+ name +"', {  require: '"+name+"' });";

      /* make modifications to the file string here */
      this.write(path, file.replace(hook, hook + insertionContent));
    }
  },
  end: {
    finalMessage: function(name) {
      console.log(name + ' component has just been created.');
    }
  }
});
