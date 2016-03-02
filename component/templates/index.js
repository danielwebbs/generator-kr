'use strict';
define(['knockout','text!./<%= title %>.html'],
  function(ko, htmlString) {
    function <%= title %>(params) {

        return {
        };
    }
  return { viewModel: <%= title %>, template: htmlString };
});
