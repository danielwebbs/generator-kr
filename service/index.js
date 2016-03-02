var generators = require('yeoman-generator');

module.exports = generators.NamedBase.extend({
  paths: function () {
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
  writing : {
    services: function(name) {
      this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath( 'services/' + name +'Service.js'),
        { title: name }
      );
    },
    styles: function(name) {

    }
  },
  install : {
    updateConfigs: function(name) {
      var path = "./App/require-setup.js",
      file = this.readFileAsString(path);
      var hook = '// << Yeoman Services Hook >>';
      var insertionContent = '\n\t\t\t' + name + 'Service: ' + "'./Services/" + name + "Service',";

      /* make modifications to the file string here */
      this.write(path, file.replace(hook, hook + insertionContent));
    }
  },
  end: {
    finalMessage: function (name) {
      console.log(name +' services has just been created.');
    }
  }
});
