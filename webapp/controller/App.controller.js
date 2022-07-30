// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
//    "sap/m/MessageToast",
//    "logaligroup/invoices/model/Models",
//    "sap/ui/model/resource/ResourceModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.m.MessageToast} MessageToast
     * @param {sap.ui.model.resource.ResourceModel} ResourceModel
     */
    function (Controller) {
        "use strict";

        return Controller.extend("logaligroup.invoices.controller.App", {
           onInit: function () {
                this.getView().addStyleClass(this.getOwnerComponent().getContentDensityCalss());
            },

            onOpenDialogHeader() {
                
                this.getOwnerComponent().openHelloDialog();
            }
/*            onShowHello: function () {
                // read text form  i18n model
                var oBundle = this.getView().getModel("i18n").getResourceBundle();
                // read property  from data model
                var sRecipient = this.getView().getModel().getProperty("/recipient/name");
                var sMsg = oBundle.getText("helloMsg", [sRecipient]);
                MessageToast.show(sMsg);
            }
*/            
        });

    });