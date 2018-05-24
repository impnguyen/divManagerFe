sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/unified/FileUploaderParameter", "sap/m/MessageBox"],
  function(Controller, FileUploaderParameter, MessageBox) {
    "use strict";

    return Controller.extend("mpn.divManager.controller.FileUpload", {
      onInit: function() {
        // set upload url
        this.getView()
          .byId("divFileUploader")
          .setUploadUrl("http://localhost:3003/uploadDivs");

        //set multipart
        this.getView()
          .byId("divFileUploader")
          .setUseMultipart(true);
      },

      /**
       * on upload csv file with dividends
       */
      onUploadPress: function() {
        var oFileUploader = this.byId("divFileUploader");

        //add user id parameters
        oFileUploader.addParameter(
          new sap.ui.unified.FileUploaderParameter({
            name: "userid",
            value: this.getOwnerComponent()
              .getModel("currentUser")
              .getData().id
          })
        );

        // oFileUploader.upload();

        var formData = new FormData();
        formData.append("divcsv", oFileUploader.getValue());
        formData.append(
          "userid",
          this.getOwnerComponent()
            .getModel("currentUser")
            .getData().id
        );

        fetch("http://localhost:3003/uploadDivs", {
          method: "POST",
          body: formData
        })
          .then(function(response) {
            debugger;
          })
          .catch(function(error) {
            debugger;
          });
      }, 

      /**
       * show error message if missmatch type was selected
       * @param {Object} oEvent miss match event object 
       */
      handleTypeMissmatch: function(oEvent){
        MessageBox.warning(
          this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("fileTypeMissmatch")
        );
      }
    });
  }
);
