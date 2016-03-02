var generators = require('yeoman-generator');
var fileUtil = require("html-wiring");
var _ = require('underscore');

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
    // services: function(name) {
    //   this.fs.copyTpl(
    //   this.templatePath('index.js'),
    //   this.destinationPath( 'services/' + name +'Service.js'),
    //     { title: name }
    //   );
    // },
    // styles: function(name) {
    //
    // }
  },
  install : {
    updateConfigs: function(name) {
      var pathApp = "./App/app.js";
      var fileApp = fileUtil.readFileAsString(pathApp);
      var hookComponent = '// << Yeomon Components Hook >>';
      var hookComponentEnd = '// << Yeomon Components Hook End >>';
      var hookComponentObject = '// << Yeomon Components Object Hook >>';
      var hookComponentObjectEnd = '// << Yeomon Components Object Hook End >>';

      var startComponentsIndex = fileApp.indexOf(hookComponent);
      var endComponentsIndex = fileApp.indexOf(hookComponentEnd) + hookComponentEnd.length;

      var startComponentsObjectIndex = fileApp.indexOf(hookComponentObject);
      var endComponentsObjectIndex = fileApp.indexOf(hookComponentObjectEnd) + hookComponentObjectEnd.length;

      console.log(startComponentsIndex);
      console.log(endComponentsIndex);

      var pathRequire = "./App/require-setup.js";
      var fileRequire = fileUtil.readFileAsString(pathRequire);
      var hookViewModels = '// << Yeoman ViewModels Hook >>';
      var hookViewModelsEnd = '// << Yeoman ViewModels Hook End >>';
      var hookServices = '// << Yeoman Services Hook >>';
      var hookServicesEnd = '// << Yeoman Services Hook End >>';

      var startViewModelsIndex = fileRequire.indexOf(hookViewModels) + hookViewModels.length;
      var endViewModelsIndex = fileRequire.indexOf(hookViewModelsEnd);

      var viewModelSection = fileRequire.substring(startViewModelsIndex, endViewModelsIndex);
      var viewModelLines = viewModelSection.split('\n');

      var viewModelEntries = [];
      _.each(viewModelLines, function(line) {
        var colonIndex = line.indexOf(":");
        var item = line.substring(0,colonIndex).trim();
        // console.log(item);
        if (item.length === 0) {
          return;
        }
        viewModelEntries.push(item);
      });

      // console.log('vm start: ' + startViewModelsIndex);
      // console.log('vm end: ' + endViewModelsIndex);

      var viewModelComponentInsertion = '// << Yeomon Components Hook >>';
      var viewModelComponentObjectInsertion = '// << Yeomon Components Object Hook >>';
      _.each(viewModelEntries, function(entry) {
        viewModelComponentInsertion += '\n\t\'' + entry + '\',';
      });

      _.each(viewModelEntries, function(entry) {
        viewModelComponentObjectInsertion += '\n\t' + entry + ',';
      });

      viewModelComponentInsertion = viewModelComponentInsertion.substring(0, viewModelComponentInsertion.length - 1);
      viewModelComponentInsertion += "\n\t// << Yeomon Components Hook End >>";

      viewModelComponentObjectInsertion = viewModelComponentObjectInsertion.substring(0, viewModelComponentObjectInsertion.length - 1);
      viewModelComponentObjectInsertion += "\n\t// << Yeomon Components Object Hook End >>";

      var oldViewModelComponentSection = fileApp.substring(startComponentsIndex, endComponentsIndex);
      var oldViewModelComponentObjectSection = fileApp.substring(startComponentsObjectIndex, endComponentsObjectIndex);

      // console.log(oldViewModelComponentSection);
      // console.log('---');
      console.log(viewModelComponentInsertion);
      //
      // console.log(oldViewModelComponentObjectSection);
      console.log('---');
      console.log(viewModelComponentObjectInsertion);
      var updatedWithComponents = fileApp.replace(oldViewModelComponentSection, viewModelComponentInsertion);
      var updatedWithComponentObjects = updatedWithComponents.replace(oldViewModelComponentObjectSection, viewModelComponentObjectInsertion);

      this.write(pathApp, updatedWithComponentObjects);



      // this.write(pathApp, fileApp.replace(oldViewModelComponentObjectSection, viewModelComponentObjectInsertion));


      var startServicesIndex = fileRequire.indexOf(hookServices) + hookServices.length;
      var endServicesIndex = fileRequire.indexOf(hookServicesEnd);

      var servicesSection = fileRequire.substring(startServicesIndex, endServicesIndex);
      var servicesLines = servicesSection.split('\n');

      var serviceEntries = [];
      _.each(servicesLines, function(line) {
        var colonIndex = line.indexOf(":");
        var item = line.substring(0,colonIndex).trim();
        // console.log(item);
        serviceEntries.push(item);
      });


      // console.log('services start: ' + startServicesIndex);
      // console.log('services end: ' + endServicesIndex);


      /* make modifications to the file string here */
      // this.write(path, fileApp.replace(hook, hook + insertionContent));
    }
  },
  end: {
    finalMessage: function (name) {

    }
  }
});
