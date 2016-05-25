
var phonecatApp = angular.module('node_app',['ngStorage','ngMaterial'])

phonecatApp.controller('node_Controller', function ($scope) {

        $scope.saved = localStorage.getItem('node');
        $scope.todos = (localStorage.getItem('node')!==null) ? JSON.parse($scope.saved) : [];
        localStorage.setItem('node', JSON.stringify($scope.todos));
        angular.forEach($scope.todos, function(todo){
          todo.editting = false;
          todo.edit_text_bt = true;
        });
        $scope.check_color_ = function(todo){
          if(todo.done ==  true){
            todo.bg_cl='#FFFA6A';

          }
          else{
            todo.bg_cl='#FFFF00';
          }
        }
        $scope.rd_change = function (todo) {
          $scope.check_color_(todo);
          $scope.f_save(todo);
        }

        $scope.time_ = function () {
          var timeCreate = new Date();
          var seconds = timeCreate.getSeconds();
          var minutes = timeCreate.getMinutes();
          var hours = timeCreate.getHours();
          var day = timeCreate.getDay();
          var month = timeCreate.getMonth();
          var year = timeCreate.getFullYear();
          var timeCreate_ =  hours +':'+minutes +':'+seconds +'--'+ day+'/'+month+'/'+year ;
          return timeCreate_;
        }
        $scope.addTodo = function() {
          if($scope.todoText){
            $scope.todos.push({
            text: $scope.todoText,
              done: false,
              time:$scope.time_(),
              time_change: '',
              edit_text_bt: true
            });
            $scope.todoText = ''; //clear the input after adding
            localStorage.setItem('node', JSON.stringify($scope.todos));
            }
        };

        $scope.remaining = function() {
          var count = 0;
          angular.forEach($scope.todos, function(todo){
            count+= todo.done ? 1 : 0;
          });
          return count;
        };
        $scope.f_save = function(todo){
          var oldTodos = $scope.todos;
          $scope.todos = [];
          angular.forEach(oldTodos, function(todo){
            $scope.todos.push(todo);

          });
          localStorage.setItem('node', JSON.stringify($scope.todos));
        }
        $scope.archive = function(index) {
          if(index == $scope.todos.length -1){
            $scope.todos.length -=1;
          }
          else{
            for(var i = index; i < $scope.todos.length-1;i++){
              $scope.todos[i].text = $scope.todos[i+1].text;
              $scope.todos[i].time_change = $scope.todos[i+1].time_change;
              $scope.todos[i].time = $scope.todos[i+1].time;
              $scope.todos[i].time_change__ = $scope.todos[i+1].time_change__ ;
              }
              $scope.todos.length -=1;
          }
          var oldTodos = $scope.todos;
          $scope.todos = [];
          angular.forEach(oldTodos, function(todo){
            $scope.todos.push(todo);
          });
          localStorage.setItem('node', JSON.stringify($scope.todos));
          todo.editting = false;
          $scope.notica__ = 'Detete 1 Node';
        };
        $scope.change = function(todo){
            todo.edit_text_bt = false;
            todo.edit_text = todo.text;
            todo.text = '';
            todo.editting = true;
        }
        $scope.save = function(todo){
            var edit_text = todo.edit_text;
            if(edit_text != null){
                todo.time_change = $scope.time_();
                todo.text = edit_text;
                $scope.f_save(todo);
                todo.editting = false;
            }
            else{
                todo.text = edit_text;
                todo.editting = false;
            }
            todo.edit_text_bt = true;
            todo.time_change__ = true;
        }
});