import Ember from 'ember';
import FormControl from '../mixins/form-control';

const TextareaForComponent = Ember.Component.extend(FormControl);

TextareaForComponent.reopenClass({
  positionalParams: [ 'field' ]
});

export default TextareaForComponent;
