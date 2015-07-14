app.directive("modelNode", ['$window','$compile','EventService',function ($window,$compile,EventService) {
   return {
      restrict: 'A',
      require:['ngModel'],
      scope: {
         onChange: '=?',
         onRender: '&',
         modelId: '@'
      },
      link: function(scope,el,attrs,controllers) {
         scope.ngModel = controllers[0];
         scope.ngModel.$viewChangeListeners.push(function(){ 
            if(scope.onChange){EventService.broadcast(scope.onChange,scope.mgModel.$viewValue)}
         });
         scope.ngModel.$render = function(){
            var html = '';
            html = scope.onRender();
            el.html(html);
            $compile(el.contents())(scope);//compile any angular from el html to scope
         };
      }
   };
}]);
