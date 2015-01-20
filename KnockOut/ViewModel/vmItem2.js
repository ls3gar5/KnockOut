$(document).ready(function () {

    function Product(name, price, tags, discount, plink) {
        this.name = ko.observable(name),
        this.price = ko.observable(price),
        this.tags = ko.observableArray(tags);
        discount = typeof (discount) !== "undefined" ? discount : 0;
        this.discount = ko.observable(discount)

        this.formattedDiscount = ko.computed(function () {
            return (this.discount() * 100).toFixed(2) + "%";
        }, this);

        this.link = plink;

    };

    function personViewModel() {
        //HAGO LA REFERENCIA A LA MISMA VIEW MODEL
        var self = this;

        toastr.options = {
            "closeButton": false,
            "debug": false,
            "positionClass": "toast-bottom-right",
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };

        this.noEsOnservable = "'Dato duro de una variable no observable'",
        this.PruebaObservable = "PruebaObservable",
        this.link = "http://www.holistor.com.ar",
        this.firstName = ko.observable("Jose"), //valor inicial de firstname
        this.lastName = ko.observable("Mendoza"),
        this.age = ko.observable(35),

        this.fullName = ko.computed(function () {
            return this.firstName() + "  " + this.lastName() + " - " + ko.utils.unwrapObservable(this.noEsOnservable);
        }, this);

        this.fullNamePlasAge = ko.computed(function () {
            return "<strong> Nombre Completo:  </strong>" + this.firstName() + "  " + this.lastName() + " - <strong>Edad: </strong>" + this.age();
        }, this);

        this.formattedName = ko.computed(function () {
            return "<strong>" + this.firstName() + " " + this.lastName() + "</strong>";
        }, this);

        this.checkout = function () {
            toastr.info("Esto esta muy bueno", "Prueba toaster");
        },

        this.wantsSpam = ko.observable(true) // Initially checked

        this.firstName.subscribe(function (newValue) {
            alert("the person new names is:" + newValue)
        }),

        //Se inicializa el array shoppingCart con 3 elementos
        this.shoppingCart = ko.observableArray([
            new Product("Beer", 10.99, null, .20),
            new Product("Brats", 7.99),
            new Product("Buns", 1.49, [" Descriptor 1 ", " Descriptor 2 "]),
        ]),

        this.addProduct = function () {
            this.shoppingCart.push(new Product("More Beer", 10.99));
            //COLOCA EL NUEVO ITEMS AL PRINCIPIO DE LA LISTA
            //this.shoppingCart.unshift(new Product("More Beer", 10.99));
        },

        this.cambiarNombre = function () {
            var newValue = document.getElementById("newNameValue").value;
            if (newValue)
                this.firstName(newValue);
        };

        this.addPorcentaje = function (product) {
            if (product.discount != null && product.discount() < 1) {
                var nuevoDesc = product.discount() + 0.1;
                if (nuevoDesc > 1) {
                    //alert("Ingreso un nuevo valor porcentual mayor a 100")
                    toastr.error("Ingreso un nuevo valor porcentual mayor a 100", "Error");
                } else {
                    product.discount(nuevoDesc);
                    product.formattedDiscount();
                }
            }


        };

        this.lessPorcentaje = function (product) {
            if (product.discount != null && product.discount() > 0) {
                var nuevoDesc = product.discount() - 0.1;
                if (nuevoDesc < 0) {
                    //alert("Ingreso un nuevo valor porcentual mayor a 100")
                    toastr.error("Ingreso un nuevo valor porcentual menor a 0", "Error");
                } else {
                    product.discount(nuevoDesc);
                    product.formattedDiscount();
                }
            } else {
                toastr.error("Ingreso un nuevo valor porcentual menor a 0", "Error");
            }
        };

        this.removeProduct = function (product) {
            //ACA UTILIZO SELF DADO Q EN EJECUCION THIS HACE REFERENCIA A LA INSTANCIA DE PRODUCTO SELECCIONADA
            self.shoppingCart.remove(product);
            toastr.info("Cantidad de elementos restantes: " + self.shoppingCart().length,"Remover Artículo")
            //alert("Cantidad de elementos restantes: " + self.shoppingCart().length);
        },

        this.getTotal = function () {
            var total = 0;
            ko.utils.arrayForEach(self.shoppingCart(), function (product) {
                if (!isNaN(product.price())) {
                    total += product.price();
                };
            });
            return total.toFixed(2);
        }

        this.debugItems = function () {
            var message = "";
            var nativeArray = this.shoppingCart();
            for (var i = 0; i < nativeArray.length; i++) {
                message += nativeArray[i].name() + "\n";
            }
            toastr.info(message);
            //alert(message);
        };

        this.featuredProduct = ko.observable(new Product("Acme BBQ Sauce", 3.99, null, null, "http://www.holistor.com.ar"));

    };

    ko.applyBindings(new personViewModel());
    



});