Package.describe({
  name: 'meteor-gifmaker',
  version: '0.0.1',
  summary: '',
  git: 'https://github.com/MichaelDaof/gifmaker-package.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1');
  api.use('raix:ui-dropped-event');
  api.addFiles('client/save_file.js', 'client');
  api.addFiles('lib/gifshot.js', 'client');
});
