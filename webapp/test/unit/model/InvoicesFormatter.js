/* eslint-disable no-undef*/
// @ts-nocheck
sap.ui.define([
    
   "logaligroup/invoices/model/InvoicesFormatter",
   "sap/ui/model/resource/ResourceModel"
],
    /**
     * @param {sap.ui.model.resource.ResourceModel} ResourceModel
     */
    function ( InvoicesFormatter, ResourceModel) {

        QUnit.module( "Qnvoices Status", {
            beforeEach: function () {
            this._oResourceModel = new ResourceModel ({
                bundleUrl: sap.ui.require.toUrl("logaligroup/invoices") + "/i18n/i18n.properties"
            });
        },

        afterEach: function () {
            this._oResourceModel.destroy();
        }
    });
         QUnit.test("Should return the Invoices Status", function(assert){
             let oModel = this.stub();
             oModel.withArgs("i18n").returns(this._oResourceModel);

             let oViewStub = {
                 getModel: oModel
        
            };

            let oControllerStub = {
                getView : this.stub().returns(oViewStub)
            };
            
            let fnIsolatedFormatter = InvoicesFormatter.invoiceStatus.bind(oControllerStub);

            //Assert

            assert.strictEqual(fnIsolatedFormatter("A"), "New", "the invoice A is ok ");
            assert.strictEqual(fnIsolatedFormatter("B"), "En Process", "the invoice B is ok ");
            assert.strictEqual(fnIsolatedFormatter("C"), "Done", "the invoice C is ok ");
        });

    });