app.directive("droppableSlotDir", ['$parse','$window','$compile','EventService',function ($parse,$window,$compile,EventService) {
   return {
      restrict: 'A',
      require: ['ngModel'],
      link: function(scope, el, attrs, controllers) {
         scope.modelId = attrs.modelId;
         scope.ngModel = controllers[0];
         scope.onDrop = scope.$eval(attrs.onDrop) || attrs.onDrop;
         el.bind("dragover", function(e) {
            e.preventDefault(); // Necessary to allow drop.
            var targetData = e.dataTransfer.getData("model") || '{}';
            var target = angular.fromJson(targetData);
            var sourceId = e.dataTransfer.getData("id");
            var d = {curModel:scope.ngModel,sourceId:sourceId,target:target};
            if (scope.onDragover && typeof scope.onDragover == 'function'){scope.onDragover({data:d})}
            else if(scope.onDragover) {EventService.broadcast(scope.onDragover,d)}
         });
         el.bind("drop", function(e) {
            e.preventDefault();
            var targetData = e.dataTransfer.getData("model") || '{}';
            var target = angular.fromJson(targetData);
            var sourceId = e.dataTransfer.getData("id");
            var d = {modelId:scope.ngModel,sourceId:sourceId,target:target};

            if (typeof scope.onDrop == 'function'){scope.onDrop(d)}
            else if(typeof scope.onDrop == 'string') {EventService.broadcast(scope.onDrop,d)}
         });
      }
   };
}]);
