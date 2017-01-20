import Ember from 'ember';
import FormControl from '../mixins/form-control';

const InputForComponent = Ember.Component.extend(FormControl);

InputForComponent.reopenClass({
  positionalParams: [ 'field' ]
});

export default InputForComponent;
