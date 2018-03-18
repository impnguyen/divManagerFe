sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  function(Controller, JSONModel) {
    "use strict";
    return Controller.extend("mpn.divManager.controller.App", {
      onInit: function() {
        this.setupDividends();
        this.setupUsers();
      },

      onAfterRendering: function() {},

      setupDividends: function() {
        //get dividends
        fetch(
          "http://localhost:3001/dividends?$filter= portfolioid eq '468041986'"
        )
          .then(response => {
            return response.json();
          })
          .then(json => {
            this.getView().setModel(new JSONModel(json), "divs");
            this.setupDividendMeta();
          });
      },

      setupUsers: function() {
        //get users
        fetch("http://localhost:3001/users")
          .then(response => {
            return response.json();
          })
          .then(json => {
            this.getView().setModel(new JSONModel(json), "users");
          });
      },

      setupDividendMeta: function() {
        var divData = this.getView().getModel("divs").getData().value;
        var divMeta = {
          sum: 0
        };

        for (let i = 0; i < divData.length; i++) {
          divMeta.sum = divMeta.sum + divData[i].value;
        }
        console.log(divMeta.sum);

        this.getView().setModel(new JSONModel(divMeta), "divMeta");
      },

      onOpenUserSwitchPressed: function(oEvent) {
        this.byId("userSwitchDialog").open();
      },

      onSwitchUser: function(oEvent) {
        oEvent.getSource().getParent().close();
      },

      onCancelDialog: function(oEvent) {
        oEvent.getSource().getParent().close();
      }
    });
  }
);
