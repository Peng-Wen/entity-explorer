// counters keyed on component class names
var counters = {};

var ComponentIdMixin = {
  getComponentId: function() {
    var componentClassName = this.constructor.displayName;
    if (!counters[componentClassName]) {
      counters[componentClassName] = 0;
    }

    return componentClassName + '-' + counters[componentClassName]++;
  }
};

module.exports = ComponentIdMixin;
