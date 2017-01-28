import Ember from 'ember';

const computed = Ember.computed;
const mixin = Ember.mixin;
const { or, empty, and, reads } = Ember.computed;
const on = Ember.on;
const observer = Ember.observer;
const dasherize = Ember.String.dasherize;

const ErrorFor = Ember.Component.extend({

  // Options
  //

  /**
   * The field name on the form's changeset that this component should display
   * the errors for.
   *
   * @type {String}
   */
  field: null,

  /**
   * A regex to compare against the error name/description. Only
   * matching errors will trigger this error component to show. If not specified,
   * this component will match the first error for the given field. If no field
   * is given, it will match form-wide errors.
   *
   * @type {String|RegExp}
   */
  errorPattern: computed({
    get() {
      return this.get('_pattern');
    },
    set(key, value) {
      if (Ember.typeOf(value) === 'string') {
        value = new RegExp(value, 'i');
      }
      this.set('_pattern', value);
      return value;
    }
  }),

  // Internal State
  //

  tagName: '',

  /**
   * The CSS class name to apply to this field's control, defaults to the
   * dasherized field name prefixed with "field-". I.e. the firstName field
   * would result in field-first-name class.
   *
   * @type {String}
   */
  fieldClassName: computed('field', function() {
    return dasherize(this.get('field'));
  }),

  /**
   * Is this error component supposed to capture the form-wide error?
   *
   * @type {Boolean}
   */
  isFormError: empty('errorPattern'),

  /**
   * Is this field active, i.e. should it display validation errors if any
   * occur?
   *
   * @type {Boolean}
   */
  isActive: computed('form', 'form.activeFields.[]', 'form.wasSubmitted', 'field', function() {
    let fieldIsForm = this.get('field') === this.get('form');
    let fieldIsActive = this.get('form.activeFields').includes(this.get('field'));
    let formWasSubmitted = this.get('form.wasSubmitted');
    return fieldIsForm || fieldIsActive || formWasSubmitted;
  }),

  /**
   * Does the field have an error that matches our pattern?
   *
   * @type {Boolean}
   */
  fieldHasMatchingError: computed('error', 'errorPattern', function() {
    return this.get('errorPattern').test(this.get('error'));
  }),

  /**
   * Should this field show errors?
   *
   * @type {Boolean}
   */
  hasVisibleErrors: and('error', 'isActive', 'fieldHasMatchingError'),

  /**
   * Create the bound property to this error component's field's errors.
   *
   * @type {Array|Object}
   */
  setupError: on('init', observer('field', function() {
    let field = this.get('field');
    let errorPath = typeof field === 'string' ? `form.changeset.error.${ field }.validation` : 'form.formError';
    mixin(this, {
      errors: reads(errorPath)
    });
  })),

  /**
   * Only check the first error on this field, so we don't end up displaying
   * multiple overlapping errors (i.e. invalid email format and email can't be
   * blank would fail at the same time, but "can't be blank" is more appropriate)
   *
   * @type {Object}
   */
  error: or('errors.firstObject', 'errors')

});

ErrorFor.reopenClass({
  positionalParams: [ 'field', 'errorPattern' ]
});

export default ErrorFor;
