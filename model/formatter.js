sap.ui.define([], function() {
  "use strict";
  return {
    /**
       * short decimals
       */
    shortDecimals: function(sValue) {
      var fValue = parseFloat(sValue);
      return fValue.toFixed(2);
    },

    /**
     * set state based on omen
     */
    setState: function(fValue) {
      if (fValue < 0) {
        return sap.ui.core.ValueState.Error;
      } else {
        return sap.ui.core.ValueState.Success;
      }
    },

    /**
     * short mrd
     */
    shortMrd: function(sValue) {
      return (sValue / 1000000000).toFixed(2);
    }
  };
});
