sap.ui.define(["sap/ui/core/mvc/Controller",
'sap/ui/model/Filter',
], function(Controller, Filter) {
  "use strict";

  return Controller.extend("mpn.divManager.controller.Dividends", {

      /**
       * on live search
       */
      onSearchDividends: function(oEvent){
        let aFilters;
        let sQuery = oEvent.getSource().getValue();
        
        if (sQuery && sQuery.length > 0) {
          let filter1 = new Filter("security", sap.ui.model.FilterOperator.Contains, sQuery);
          let filter2 = new Filter("valutaDate", sap.ui.model.FilterOperator.Contains, sQuery);
          let filter3 = new Filter("wkn", sap.ui.model.FilterOperator.Contains, sQuery);

          aFilters = new Filter([filter1, filter2, filter3], false); 
        }
  
        // update list binding
        let divTable = this.byId("idProductsTable");
        let binding = divTable.getBinding("items");
        binding.filter(aFilters, "Application");
        debugger;//TODO: Hier geht es weiter: summe von gefilterten dividenden zusammenrechnen und in den footer setzen
      }, 

      /**
       * calculate div sum for filtered table
       */
      calculateDivSumByFilteredTable: function(){

      },

      /**
       * refresh table
       */
      onRefreshDividends: function(oEvent){
        sap.ui.getCore().byId('__xmlview0').getController().setupModels(
          this.getOwnerComponent().getModel('currentUser').getData()
        );
      }

  });
});
