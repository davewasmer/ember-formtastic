import Ember from 'ember';
import FormControl from '../mixins/form-control';

const SelectForComponent = Ember.Component.extend(FormControl);

SelectForComponent.reopenClass({
  positionalParams: [ 'field', 'options' ]
});

export default SelectForComponent;
