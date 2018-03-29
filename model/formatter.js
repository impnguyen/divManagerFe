sap.ui.define([], function() {
  "use strict";
  return {
    /**
     * short decimals
     * @param  {String} sValue string value 
     * @return {Number} anonym a number with decimal length 2
     */
    shortDecimals: function(sValue) {
      var fValue = parseFloat(sValue);
      return fValue.toFixed(2);
    },

    /**
     * set state based on omen
     * @param  {Number} fValue a number
     * @return {Object} anonym a sap.ui.core.ValueState 
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
     * @param  {String} sValue a number as string
     * @return {Number} anonym a number with decimal length 2
     */
    shortMrd: function(sValue) {
      return (sValue / 1000000000).toFixed(2);
    }
  };
});
