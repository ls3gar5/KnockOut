$(document).ready(function () {

    function PersonViewModel() {
        var self = this;

        self.firstName = ko.observable("Leo");
        self.lastName = ko.observable("Segars");

        self.fullName = ko.computed(function () {
            return self.firstName() + " - " + self.lastName() ;
        });

        self.checkOut = function () {
            toastr.info("Hola");
        };

    };

    ko.applyBindings(new PersonViewModel());

});