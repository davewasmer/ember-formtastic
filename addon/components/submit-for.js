import Ember from 'ember';

const { alias } = Ember.computed;

const SubmitFor = Ember.Component.extend({

  tagName: 'button',
  classNames: [ 'submit' ],
  attributeBindings: [ 'type', 'disabled' ],
  type: 'submit',
  disabled: alias('form.isSubmitting')

});

SubmitFor.reopenClass({
  positionalParams: [ 'label' ]
});

export default SubmitFor;
