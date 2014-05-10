define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/enigma_view.html', 
  'bootstrap'
], function($, _, Backbone, EnigmaViewTemplate, Bootstrap){
	var EnigmaView = Backbone.View.extend({
		el: $("#enigma"),
    session: null,

    rendered: false,
    
    initialize: function(session){
      this.session = session;
    },

    render: function(){
      var template = _.template(EnigmaViewTemplate, {data: null});
      this.$el.html(template);
    },

    hide: function(){
      this.$el.hide();
    },

    show: function(){      
      this.$el.show();
       if(!this.rendered) {
         this.render();
         this.rendered = true;
       }

      var activeId = 1;

      $.getJSON("workflow.json", function(json) {
        console.log(json);

        var workflow = json.workflow;

        for (var i = 1; i < workflow.length; i++){
          $("#enigma").append(drawTask(workflow[i], i));
        }

        activateTask("1");
      });

      function drawTask(task, id){
        var ret = '<div id="task-' + id + '" class="card-box"><h2 class="text-left"><strong>[' + id + ']</strong> ';
        ret += task.name;
        ret += '</h2><hr>';

        if (task.type == "Review"){
          ret += '<hr><span>Reviewers: ';
          for (var i = 0; i < task.reviewee.length; i++){
            ret += task.reviewee[i];
            if (i+1 < task.reviewee.length) ret+= ", ";
          }
          ret += '</span>';
        }

        ret += '</div>'

        return ret
      }

      function activateTask(id){
        $("#task-"+id).attr('class', 'card-box active-box');
        
        if (id == 1) {
          $("#task-"+id).append('<span id="buttons-'+id+'" class="pull-right text-right"> <button class="btn btn-large btn-success complete-task">Finish Task</button></span>');
        } else {
          $("#task-"+id).append('<span id="buttons-'+id+'" class="pull-right text-right"> <button class="btn btn-large btn-danger undo-task">Undo Task</button> <button class="btn btn-large btn-success complete-task">Finish Task</button></span>');
        }

        $(".complete-task").click(function(e){
          e.preventDefault();
          deactivateTask(activeId);
          activateTask(activeId+1);
          activeId += 1;
        });

        $(".undo-task").click(function(e){
          e.preventDefault();
          deactivateTask(activeId); 
          activateTask(activeId-1); 
          activeId -= 1;
        });
      }

      function deactivateTask(id){

        $("#task-"+id).removeClass('active-box');
        $("#buttons-"+id).remove();

      }

    }
	});

  return EnigmaView;
});