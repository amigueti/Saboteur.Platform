//Accounts.ui.config({
//    passwordSignupFields: 'USERNAME_ONLY'
//});

Template.navigation.helpers({
	'usuario': function(){
		if (Meteor.userId()) {
			return Meteor.userId();
		} else {
			return "invitado";
		}
	}
});


Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'nombre',
        fieldLabel: 'Nombre',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Por favor, introduce un nombre");
            return false;
          } else {
            return true;
          }
        }
    }, {
        fieldName: 'foto',
	fieldLabel: 'Foto',
        inputType: 'hidden',
        visible: false,
	value: '/pinguino.png',
    }, {
        fieldName: 'apellido',
        fieldLabel: 'Apellido',
        inputType: 'text',
        visible: true,
    }, {
        fieldName: 'genero',
        showFieldLabel: false,      // If true, fieldLabel will be shown before radio group
        fieldLabel: 'Genero',
        inputType: 'radio',
        radioLayout: 'inline',    // It can be 'inline' or 'vertical'
        data: [{                    // Array of radio options, all properties are required
            id: 1,                  // id suffix of the radio element
            label: 'Hombre',          // label for the radio element
            value: 'm',              // value of the radio element, this will be saved.
	    checked: 'checked'
          }, {
            id: 2,
            label: 'Mujer',
            value: 'f'
        }],
        visible: true
    }, {
        fieldName: 'pais',
        fieldLabel: 'Pais',
        inputType: 'select',
        showFieldLabel: true,
        empty: 'Por favor, introduce tu nacionalidad',
        data: [{
            id: 1,
            label: 'United States',
            value: 'us'
          }, {
            id: 2,
            label: 'Spain',
            value: 'es',
        }],
        visible: true
    }]
});
