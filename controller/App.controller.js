sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "mpn/divManager/model/formatter"
  ],
  function(Controller, JSONModel, formatter) {
    "use strict";
    return Controller.extend("mpn.divManager.controller.App", {

      formatter: formatter, 
      
      /**
       * setup models in onInit Hook
       */
      onInit: function() {
        //setup users
        this.setupUsers()
          .then((oData, oResponse) => {
            //setup ui: set model to view and open dialog
            this.setupUi(oData);
          })
          .catch(error => {});
      },

      /**
       * setup odata models
       * @param  {Object} selectedUser selected user as input object
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
       *  get dividends
       * @param  {String} portfolioid portfolio id from user object
       * @return {Promise} promise object of dividends request
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
       * @return {Promise} a promise object for users request
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
        divMeta.sum = divMeta.sum.toFixed(2);

        this.getView().setModel(new JSONModel(divMeta), "divMeta");
      },

      onOpenUserSwitchPressed: function(oEvent) {
        this.byId("userSwitchDialog").open();
      },

      /**
       * reload model and refresh binding
       * @param  {Object} oEvent on switch user button press event
       */
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

        this.getView().setModel(
          new JSONModel(model.getProperty(selPath)),
          "currentUser"
        );

        //setup dividends model
        this.setupDividends(model.getProperty(selPath).portfolioid)
          .then(oDividendsData => {
            this.getView().setModel(new JSONModel(oDividendsData), "divs");
            this.setupDividendMeta();
          })
          .catch(() => {});
        oEvent.getSource().getParent().close();
      },

      /**
       * @param  {Object} oEvent on cancel dialog press event
       */
      onCancelDialog: function(oEvent) {
        oEvent.getSource().getParent().close();
      },

      /**
       * open user dialog
       * @param  {Object} oUsersData selected user data object
       */
      setupUi: function(oUsersData) {
        this.getView().setModel(new JSONModel(oUsersData), "users");
        this.byId("initUserSelection").open();
      },

      /**
       * on select initial user and setup model
       * @param  {Object} oEvent on select initial user object event
       */
      onSelectInitUser: function(oEvent) {
        var selPath = this.getView()
          .byId("initUserSelect")
          .getSelectedItem()
          .getBindingContext("users")
          .getPath();
        var model = this.getView()
          .byId("initUserSelect")
          .getSelectedItem()
          .getBindingContext("users")
          .getModel();
        var oSelUser = model.getProperty(selPath);

        this.getView().setModel(new JSONModel(oSelUser), "currentUser");

        //setup dividends model
        this.setupDividends(oSelUser.portfolioid)
          .then(oDividendsData => {
            this.getView().setModel(new JSONModel(oDividendsData), "divs");
            this.setupDividendMeta();
          })
          .catch(() => {});
        oEvent.getSource().getParent().close();
      },

      /**
       * on press title:
       * fetch details
       * open details dialog
       * @param  {Object} oEvent on press security/stocks title event
       */
      onPressSecurityTitle: function(oEvent) {
        this.byId("idProductsTable").setBusy(true);

        const sWkn = oEvent.getSource().getProperty("text");
        const myRequest = new Request(
          "http://localhost:3003/getDetails?wkn=" + sWkn,
          {
            method: "get"
          }
        );

        fetch(myRequest)
          .then(response => {
            return response.json();
          })
          .then(oData => {
            console.log(oData);
            this.getView().setModel(new JSONModel(oData), "details");
            this.byId("stockDetailDialog").open();
          })
          .catch(e => {
            console.error(e);
          })
          .then(() => {
            this.byId("idProductsTable").setBusy();
          });
      },
      
      /**
       * close details
       * @param  {Object} oEvent on cancel stocks details dialog event
       */
      onCancelStockDetails: function(oEvent) {
        oEvent.getSource().getParent().close();
      }
    });
  }
);
