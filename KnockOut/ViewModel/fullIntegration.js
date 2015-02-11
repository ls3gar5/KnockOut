$(document).ready(function () {

    function Product(name, price, tags) {
        this.name = ko.observable(name);
        this.price = ko.observable(price);
        this.tag = ko.observableArray(tags);
    }

    function GetDate() {
        return moment().format('DD/MM/YYYY HH:mm:ss:SSS');
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
            new Product("Beer", 10.99, ["Baked goods", "Hot dogs"]),
            new Product("Brats", 7.99, null),
            new Product("Buns", 1.49, null)
        ]);

        self.cantidadRegistros = ko.computed(function () {
            return self.shoppingCart().length;
        });

        self.totalImporte = ko.computed(function () {
            var total = 0;
            //ko.utils.arrayForEach(self.shoppingCart(), function (art) {
            //    total += art.price();
            //});
            _.each(self.shoppingCart(), function (art) {
                var value = parseFloat(art.price());
                if (!isNaN(value)) {
                    total += value;
                }
            });
            return "<strong>" + total.toFixed(2) + "</strong>";
        });
        //METODOS - FUNCIONES
        self.checkOut = function () {
            $.blockUI({
                title: null,
                message: null,
                fadeIn: 1000,
                
            });
            toastr.info(self.fullName(), "Buenas y santas");
        };

        self.addProduct = function (product, event) {

            if (event.ctrlKey) {
                toastr.error("Tiene la teckla CTRL presionada.", "Error");
                return;
            }

            if (product && !_.isUndefined(product.nombre)) {
                self.shoppingCart.push(new Product(product.nombre(), product.precio(), ["Leo awesome!!!!"]));
            } else {
                self.shoppingCart.push(new Product("More Beeer!!!", 10.99, ["Leo'sss!!!"]));
            }
        };

        self.removeProduct = function (product) {
            self.shoppingCart.remove(product);
        };

        self.getDate = ko.observable(GetDate());

        var dto = {
            nombre: "Leo",
            ape: "segars"
        };

        self.dto = ko.observable(dto);

        self.dtoBeer = {
            esHabilitado: ko.observable(true),
            nombre: ko.observable(),
            precio: ko.observable(),
        }

    };

    toastr.options = {
        "closeButton": false,
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