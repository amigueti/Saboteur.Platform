Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', {name: 'home'});
Router.route('/juegos', {name: 'juegos'});