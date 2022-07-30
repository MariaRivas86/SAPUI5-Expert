/* eslint-disable no-undef*/
// @ts-nocheck
sap.ui.define([
    "logaligroup/invoices/localService/mockserver",
    "sap/ui/test/opaQunit",
    "./pages/HelloPanel"
],
    /**
     * @param{typeof sap.ui.test.OpaQunit} OpaQunit
    */
    function (Mockserver, opaQunit) {

        QUnit.module("Navigation");
        
        opaQunit("Should open the Hello Dialog", function(Given, When, Then){

            //inicialize
            Mockserver.init();

            //Arrangements
            Given.iStartMyUIComponent({
                componentConfig: {
                    name: "logaligroup.invoices"
                }
            });

            //Actions
            When.onTheAppPage.iSayHelloDialogButton();

            //Assert
            Then.onTheAppPage.iSeeTheHelloDialog();

            //Cleanup
            Then.iTeardownMyApp();

        });
    });