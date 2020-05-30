sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/resource/ResourceModel"
], function (Controller, MessageToast, Fragment, ResourceModel) {
    "use strict";
    return Controller.extend("org.ubb.books.controller.BookList", {
        onInit : function () {
            var i18nModel = new ResourceModel({
                bundleName: "org.ubb.books.i18n.i18n"
            });
            this.getView().setModel(i18nModel, "i18n");
        },
        onCheckout(oEvent) {
            var bindingContext = this.byId("idBooksTable").getSelectedContexts()[0];
            var path = bindingContext.getPath();
            var oModel = oEvent.getSource().getModel();
            var object = bindingContext.getModel().getProperty(path);
                var isbn = object.ISBN;
                var checkout = {
                    ISBN: isbn
                };
                if(object.AvailableNumber === 0 ) {
                MessageToast.show('This book is not available now!');
                } else {
                    this.getView().getModel().create("/Checkouts", checkout, {
                        success: function () {
                            MessageToast.show('Book was checked out!');
                        },
                        error: function () {
                            MessageToast.show('Error checking this book out!');
                        }
                    })
                }
        }
    });
});