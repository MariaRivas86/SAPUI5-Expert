//@ts-nocheck
/* eslink-disable  no-undef */
/* Global Qunit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
    "use strict";

    sap.ui.require([ 
        "logaligroup/invoices/test/integration/NavigationJourney"
    ], function() {
        QUnit.start();
});
});
