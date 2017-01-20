module.exports = {
  description: '',
  afterInstall: function(options) {
    this.addAddonPackage('ember-radio-button');
    this.addAddonPackage('ember-power-select');
  }
};
