Persons = new TAPi18n.Collection("persons");

if (Meteor.isClient) {
  TAPi18n.subscribe('persons', function(err) {
    console.log('subscr persons: ', err);
  });

  Template.hello.helpers({
    persons: function () {
      return Persons.find();
    }
  });

  Meteor.startup(function() {
    Session.setDefault('lang', 'sk');
    Tracker.autorun(function() {
      //TAPi18n.setLanguage(Session.get('lang'));
    });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    if(Persons.find().count() === 0) {
      Persons.insert({
        name: 'Tomas Hromnik',
        country: 'Slovakia',
        i18n: {
          sk: {
            country: 'Slovensko'
          }
        }
      });
    }
    //Persons.remove();
  });

  TAPi18n.publish("persons", function () {
    return Persons.i18nFind();
  });
}
