app.directive("draggableDir", ['$interpolate','EventService',function ($interpolate,EventService) {
    return {
      restrict: 'A',
      require: ['^ngModel'],
      transclude:true,
      link: function(scope, el, attrs, controllers) {
         el.attr("draggable", "true");
         
         el.bind("dragstart", function(e) {
            e.dataTransfer.setData('id', scope.modelId);
            e.dataTransfer.setData('model', angular.toJson(scope.ngModel.$viewValue));
            e.dataTransfer.dropEffect = 'move'; 
            if (scope.onDragstart) {
               var d = {curModel:scope.ngModel,sourceId:scope.modelId};
               EventService.broadcast(scope.onDragstart,d);
            }
         });
         el.bind("dragend", function(e) {
            if (scope.onDragend){
               var d = {curModel:scope.ngModel,sourceId:scope.modelId};
               EventService.broadcast(scope.onDragend,d);
            }
         });
      }
    };
}]);
