# ember-formtastic

```hbs
{{#form-for (changeset user userValidations) as |f|}}

  {{f.error catchall=true}}

  {{#f.error 'firstName' 'presence'}}You forgot your name:{{/f.error}}
  {{f.text 'firstName'}}

  {{#f.error 'email' 'format'}}That doesn't quite look like an email{{/f.error}}
  {{#f.error 'email' 'presence'}}You forgot your email:{{/f.error}}
  {{#f.error 'email' 'unique'}}
    Email already in use - did you mean to {{#link-to 'login'}}login{{/link-to}}?
  {{/f.error}}
  {{f.email 'email'}}

  {{#f.error 'password' 'presence'}}You forgot your password:{{/f.error}}
  {{f.password 'password'}}

  {{f.submit}}

{{/form-for}}
