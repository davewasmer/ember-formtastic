import Ember from 'ember';

const mixin = Ember.mixin;
const on = Ember.on;
const observer = Ember.observer;
const computed = Ember.computed;
const { reads, and, bool } = Ember.computed;
const dasherize = Ember.String.dasherize;
const capitalize = Ember.String.capitalize;

export default Ember.Mixin.create({

  tagName: '',

  /**
   * Track the control's value
   */
  setupValue: on('init', observer('field', function() {
    mixin(this, {
      value: reads(`form.changeset.${ this.get('field') }`)
    })
  })),

  /**
   * Default update action sets the new value on the form's changeset, and lets
   * the form know the field was changed so it can track validation state when
   * necessary.
   *
   * @method update
   * @param value The new value for this field
   */
  update(value) {
    this.get('form').fieldChanged(this.get('field'), this.get('validateOn'));
    this.set(`form.changeset.${ this.get('field') }`, value);
  },

  /**
   * Lets the form know that the field was "touched", which means the user has
   * interacted with the control and given some indication that they have
   * finished editing. For controls like text inputs, this is usually triggered
   * on focusout.
   *
   * @method touch
   */
  touch() {
    this.get('form').fieldTouched(this.get('field'), this.get('validateOn'));
  },

  /**
   * Touch and update the control in one go. Useful for controls like checkboxes,
   * which don't really have separate "editing" vs. "finished editing" states
   * like a text box.
   *
   * @method touchAndUpdate
   * @param value The new value for this field
   */
  touchAndUpdate(value) {
    this.touch();
    this.update(value);
  },

  /**
   * The CSS class name to apply to this field's control, defaults to the
   * dasherized field name prefixed with "field-". I.e. the firstName field
   * would result in field-first-name class.
   *
   * @type {String}
   */
  fieldClassName: computed('field', function() {
    return `field-${ dasherize(this.get('field')) }`;
  }),

  /**
   * The placeholder to use with this field's control. Defaults to the
   * humanized field name, i.e. the firstName field would result in "First name"
   *
   * @type {String}
   */
  placeholder: computed('field', 'form.placeholders', function() {
    let placeholders = this.get('form.placeholders');
    if (typeof placeholders === 'function') {
      return placeholders(this.get('field'));
    }
    if (placeholders !== false) {
      return capitalize(dasherize(this.get('field')).replace('-', ' '));
    }
    return '';
  }),

  setupError: on('init', observer('field', function() {
    this.error = bool(`form.changeset.error.${ this.get('field') }`);
  })),

  /**
   * Is this field active, i.e. should it display validation errors if any
   * occur?
   *
   * @type {Boolean}
   */
  isActive: computed('form.activeFields.[]', 'form.submitted', 'field', function() {
    let fieldIsActive = this.get('form.activeFields').includes(this.get('field'));
    let formWasSubmitted = this.get('form.submitted');
    return fieldIsActive || formWasSubmitted;
  }),

  /**
   * Should this field be rendering errors?
   *
   * @type {Boolean}
   */
  hasVisibleErrors: and('error', 'isActive'),

});
