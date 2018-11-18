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
        let oFileUploader = this.byId("divFileUploader");
        let formData = new FormData();
        let that = this;

        formData.append("divcsv", oFileUploader.FUEl.files[0]);
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
            if (response.status !== 200){
              MessageBox.error(
                that.getOwnerComponent().getModel("i18n").getResourceBundle().getText("fileUploadServerError")
              );
            } else {
              MessageBox.success(
                that.getOwnerComponent().getModel("i18n").getResourceBundle().getText("fileUploadSuccessful")
              );

              //reset fileuploader
              oFileUploader.setValue();
            }
          })
          .catch(function(error) {
            MessageBox.error(
              that.getOwnerComponent().getModel("i18n").getResourceBundle().getText("fileUploadServerError")
            );
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
