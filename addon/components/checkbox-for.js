import Ember from 'ember';
import FormControl from '../mixins/form-control';

const CheckboxForComponent = Ember.Component.extend(FormControl);

CheckboxForComponent.reopenClass({
  positionalParams: [ 'field' ]
});

export default CheckboxForComponent;
