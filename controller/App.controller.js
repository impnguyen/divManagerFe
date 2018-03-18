sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  function(Controller, JSONModel) {
    "use strict";
    return Controller.extend("mpn.divManager.controller.App", {
      /**
       * setup models in onInit Hook
       */
      onInit: function() {
        this.setupModels();
      },

      /**
       * setup odata models
       */
      setupModels: function(selectedUser) {
        this.getView().setBusy(true);
        this.setupUsers()
          .then(usersData => {
            this.getView().setModel(new JSONModel(usersData), "users");
            var tmpUser = {};

            if (selectedUser === undefined) {
              tmpUser = usersData.value[0];
            } else {
              tmpUser = selectedUser;
            }

            this.getView().setModel(new JSONModel(tmpUser), "currentUser");
            return this.setupDividends(
              this.getView().getModel("currentUser").getData().portfolioid
            );
          })
          .then(dividendsData => {
            this.getView().setModel(new JSONModel(dividendsData), "divs");
            this.setupDividendMeta();
          })
          .catch(error => {
            console.error(error);
          })
          .then(() => {
            this.getView().setBusy(false);
          });
      },

      /**
       * get dividends
       */
      setupDividends: function(portfolioid) {
        var promise = new Promise((resolve, reject) => {
          fetch(
            `http://localhost:3001/dividends?$filter= portfolioid eq ${portfolioid}`
          )
            .then(response => {
              return response.json();
            })
            .then(json => {
              resolve(json);
            })
            .catch(error => {
              reject(error);
            });
        });

        return promise;
      },

      /**
       * get users
       */
      setupUsers: function() {
        var promise = new Promise((resolve, reject) => {
          fetch("http://localhost:3001/users")
            .then(response => {
              return response.json();
            })
            .then(json => {
              resolve(json);
            })
            .catch(error => {
              reject(error);
            });
        });

        return promise;
      },

      /**
       * setup metainformation for dividends model
       * for example dividends sum
       */
      setupDividendMeta: function() {
        var divData = this.getView().getModel("divs").getData().value;
        var divMeta = {
          sum: 0
        };

        for (let i = 0; i < divData.length; i++) {
          divMeta.sum = divMeta.sum + divData[i].value;
        }

        this.getView().setModel(new JSONModel(divMeta), "divMeta");
      },

      onOpenUserSwitchPressed: function(oEvent) {
        this.byId("userSwitchDialog").open();
      },

      onSwitchUser: function(oEvent) {
        var selPath = this.getView()
          .byId("userSelect")
          .getSelectedItem()
          .getBindingContext("users")
          .getPath();
        var model = this.getView()
          .byId("userSelect")
          .getSelectedItem()
          .getBindingContext("users")
          .getModel();

        this.setupModels(model.getProperty(selPath));
        oEvent.getSource().getParent().close();
      },

      onCancelDialog: function(oEvent) {
        oEvent.getSource().getParent().close();
      }
    });
  }
);
