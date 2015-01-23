﻿$(document).ready(function () {

    function Product(name, price) {
        this.name = ko.observable(name);
        this.price = ko.observable(price);
    }


    function PersonViewModel() {

        var self = this;
        //etiquetas
        self.titulo = ko.observable("Mensaje");;

        //Observables
        self.firstName = ko.observable("Leo");
        self.lastName = ko.observable("Segars");

        //Computed Observables
        self.fullName = ko.computed(function () {
            return self.firstName() + " - " + self.lastName();
        });

        self.shoppingCart = ko.observableArray([
            new Product("Beer", 10.99),
            new Product("Brats", 7.99),
            new Product("Buns", 1.49)
        ]);

        //METODOS - FUNCIONES
        self.checkOut = function () {
            self.titulo("Mensaje Enviado!!")
            toastr.info(self.fullName(), "Buenas y santas")
        };

        self.addProduct = function () {
            self.shoppingCart.push(new Product("More Beer", 10.99));
        };

    };

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    ko.applyBindings(new PersonViewModel());

});