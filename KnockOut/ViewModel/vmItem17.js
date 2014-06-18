$(document).ready(function () {

    function personViewModel() {
        var self = this;

        this.firstName = ko.observable("Jhon");
        this.lastName = ko.observable("Smith");

        this.saveUserData = function (model, event) {
            //current model and the DOM event
            toastr.info(model.firstName() + " " + model.lastName(), "Prueba toaster");
            if (event.ctrlKey) {
                toastr.info("He was holding the Control Key for som,e reason", "Key Press");
            }
            
        };

        this.displayName = function (model, event) {
            toastr.info(model.firstName() + " " + model.lastName(), "Info");
        };

        this.setName = function (model, event) {
            model.firstName("Leo");
            toastr.info(model.firstName() + " " + model.lastName(), "Info");
        };
    };

    ko.applyBindings(new personViewModel());
});