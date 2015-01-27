$(document).ready(function () {

    function Product(name, price) {
        this.name = ko.observable(name);
        this.price = ko.observable(price);
    }


    function PersonViewModel() {

        var self = this;
        //etiquetas
        self.titulo = ko.observable("Mensaje");;

        //OBSERVABLES
        self.firstName = ko.observable("Leo");
        self.lastName = ko.observable("Segars");
        

        //COMPUTED OBSERVABLES
        self.fullName = ko.computed(function () {
            return self.firstName() + " - " + self.lastName();
        });

        self.shoppingCart = ko.observableArray([
            new Product("Beer", 10.99),
            new Product("Brats", 7.99),
            new Product("Buns", 1.49)
        ]);

        self.cantidadRegistros = ko.computed(function () {
            return self.shoppingCart().length;
        });

        //METODOS - FUNCIONES
        self.checkOut = function () {
            self.titulo("Mensaje Enviado!!")
            toastr.info(self.fullName(), "Buenas y santas")
        };

        self.addProduct = function () {
            self.shoppingCart.push(new Product("More Beer", 10.99));
        };

        self.removeProduct = function (product) {
            self.shoppingCart.remove(product);
        };

        self.getDate = ko.computed(function () {
           return moment().format('DD/MM/YYYY HH:mm:ss:SSS');
        });

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