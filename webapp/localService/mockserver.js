sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/ui/model/json/JSONModel",
    "sap/base/util/UriParameters",
    "sap/base/Log"

],
    /**
    * @param {typeof sap.ui.core.util.MockServer} MockServer
    * @param {typeof sap.ui.model.json.JSONModel} JSONModel
    * @param {typeof sap.base.util.UriParameters} UriParametres
    * @param {typeof sap.base.Log} log
    */
    function (MockServer, JSONModel, UriParametres, log) {
        "user strict";

        var oMockServer,
            _sAppPath = "logaligroup/invoices/",
            _sJsonFilesPath = _sAppPath + "localService/mockdata";

        var oMockServerInterface = {

            /**
            * Initializes the mock server asynchronously
            * @protected
            * @param {object} oOptionsParameter
            * @return {Promise} a promise that is resolved when the mock  server has  been started
            */
            init: function (oOptionsParameter) {
                var oOptions = oOptionsParameter || {};

                return new Promise (function (fnResolve, fnRejet) {
                    var sManifestUrl = sap.ui.require.toUrl(_sAppPath + "manifest.json"),
                        oManifestModel = new JSONModel(sManifestUrl);

                    oManifestModel.attachRequestCompleted(function () {
                        var oUriParameter = new UriParametres(window.location.href);

                        //parse manifest  for local  medatada URI
                        var sJsonFilesUrl = sap.ui.require.toUrl(_sJsonFilesPath);
                        var oMainDataSource = oManifestModel.getProperty("/sap.app/dataSources/mainService");
                        var sMetadataUrl = sap.ui.require.toUrl(_sAppPath + oMainDataSource.settings.localUri);

                        //ensure there is a trailing slash
                        var sMockServerUrl = oMainDataSource.uri && new URI(oMainDataSource.uri).absoluteTo(sap.ui.require.toUrl(_sAppPath)).toString();

                        //crate mock
                        if (!oMockServer) {
                            oMockServer = new MockServer({
                                rootUri: sMockServerUrl
                            });

                        } else {
                            oMockServer.stop();
                        }

                        //configure 
                        MockServer.config({
                            autoRespond: true,
                            autoRespondAfter: (oOptions.delay || oUriParameter.get("ServerDelay") || 500)
                        });
                    //simulate
                    oMockServer.simulate(sMetadataUrl, {

                                sMockdataBaseUrl: sJsonFilesUrl,
                                bGenerateMissingMockData: true

                            });
                            var aRequests = oMockServer.getRequests();

                            //compose
                            var fnResponse = function (iErrCode, Smessage, aRequest) {
                                aRequest.response = function (oXhr) {
                                    oXhr.respond(iErrCode, { "Content-Type": "text/plain;charset=utf-8" }, sMessage);
                                };
                            };
                            // simulate medatda eerr
                            if(oOptions.metadataError || oUriParameter.get("metadataError")) {
                            aRequest.forEach(function (aEntry) {
                                if (aEntry.path.toString().indexof("$metada") > -1) {
                                    fnResponse(500, "metada Error", aEntry);
                                }

                            });
                        };
                        //simulate request error 
                        var sErrorParam = oOptions.errorTYpe || oUriParameter.get("errorType");
                        var iErrorCode = sErrorParam === "babRequest" ? 400 : 500;

                        if (sErrorParam) {
                            aRequest.forEach(function (aEntry) {
                                fnResponse(iErrorCode, sErrorParam, aEntry);
                            });
                        };
                        //Set
                        oMockServer.setRequests(aRequests);
                        oMockServer.start();

                        log.info("Runing the app with mock data");
                        fnResolve();
                    });
                    oManifestModel.attachRequestFailed(function () {
                        var sError = "Failed to load the application manifest";

                        Log.erorr(sError);
                        fnRejet(new Error(sError));

                    });
                });

            }
        };

        return oMockServerInterface;
    });