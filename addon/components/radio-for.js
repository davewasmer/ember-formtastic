import Ember from 'ember';
import FormControl from '../mixins/form-control';

const RadioForComponent = Ember.Component.extend(FormControl);

RadioForComponent.reopenClass({
  positionalParams: [ 'field', 'option' ]
});

export default RadioForComponent;
