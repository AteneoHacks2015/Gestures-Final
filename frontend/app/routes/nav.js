import Ember from 'ember';

export default Ember.Controller.extend({
  isAuthenticated: false,
  actions: {
    createSession: function(){
      var self = this;
      var login = this.get('username');
      var password = this.get('password');

      if(!Ember.isEmpty(login) && !Ember.isEmpty(password)){
        $.post(
            '/api/users/login',
            {"user_session": {"login":login, "password":password}},
            function(data){
              var user = self.store.createRecord('user', {
                user: login,
              });

              user.save();

              self.set('isAuthenticated', true);
              $('#login').modal('hide');
              self.transitionToRoute("/add");
          });
      }
    },

    destroySession: function(){
      var self = this;

      if(typeof $.cookie("user_credentials") !== undefined){
       $.ajax({
        url: '/api/users/logout',
        type: 'DELETE',
        success: function(data){
          self.store.find('user').then(function(post){
            post.destroyRecord();
          });
          self.set('isAuthenticated', false);
          self.transitionToRoute('/');
        }
       }); 
      }
    },

    signUp: function(){
      var self = this;
      var login = this.get('username');
      var password = this.get('password');

      if(!Ember.isEmpty(login) && !Ember.isEmpty(password)){
        $.post(
            '/api/users/',
            {"user": {"login":login, "password":password}},
            function(data){
              self.set('isAuthenticated', true);
              $('#signUp').modal('hide');
              self.transitionToRoute("/add");
          });
      }
    }
  }
});
