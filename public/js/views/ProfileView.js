define([
  'jquery',
  'underscore',
  'backbone',
  'utility',
  'text!templates/profile_view.html'
], function($, _, Backbone, Util, ProfileViewTemplate){

  var ProfileView = Backbone.View.extend({
    el: $("#profile"),
    session: null,

    rendered: false,
    
    initialize: function(session){
      this.session = session;
    },

    render: function(){
      var template = _.template(ProfileViewTemplate, {data: null});
      this.$el.html(template);
      $("#user-email").html(this.session.email);
    },

    hide: function(){
      this.$el.hide();
    },

    show: function(){
      this.$el.show();
      Util.logAction(this.session.email, "Viewed Profile Page", "null");
      if(!this.rendered) {
        this.render();
        this.rendered = true;
      }
    }
  });

  return ProfileView;
  
});
