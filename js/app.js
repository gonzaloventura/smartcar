const autos = []

const marcas = [{
        text: 'Volkswagen',
        value: 'Volkswagen'
    },
    {
        text: 'Peugeot',
        value: 'Peugeot',
    },
    {
        text: 'Ford',
        value: 'Ford'
    },
    {
        text: 'Toyota',
        value: 'Toyota'
    },
    {
        text: 'Honda',
        value: 'Honda'
    },
    {
        text: 'Chevrolet',
        value: 'Chevrolet'
    },
    {
        text: 'Renault',
        value: 'Renault'
    },
    {
        text: 'Dodge',
        value: 'Dodge'
    },
    {
        text: 'Volvo',
        value: 'Volvo'
    },
    {
        text: 'Nissan',
        value: 'Nissan'
    },
    {
        text: 'Jeep',
        value: 'Jeep'
    },
    {
        text: 'Porsche',
        value: 'Porsche'
    }
];

ordenarArray(marcas);


function init() {
    menu();
    dashboard();
}

function menu() {
    const header = document.getElementById("header");
    const nav = document.createElement("nav");
    nav.classList.add("navbar", "navbar-expand-lg", "navbar-dark", "navigation", "bg-modern", "pt-3", "pb-3");
    nav.innerHTML = `
    <div class="container">
      <a class="navbar-brand" onclick="dashboard()" href="#">SMARTCAR</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="ulMenu">
        </ul>
      </div>
    </div>
    `;
    header.appendChild(nav);
    showOptions();
}

function showOptions() {
    const arrayOpciones = ["Nuevo ingreso", "Ver Autos", "Autos Reparados", "Autos sin reparar", "Salir"];

    const ulMenu = document.getElementById("ulMenu");
    let n = 0;

    arrayOpciones.forEach((element) => {
        const li = document.createElement("li");
        li.classList.add("nav-item");
        element === "Salir" ? li.innerHTML = `<a class="nav-link link-danger" id="item-${n}" aria-current="page" href="#">${element}</a>` : li.innerHTML = `<a class="nav-link" id="item-${n}" aria-current="page" href="#">${element}</a>`;
        ulMenu.appendChild(li);

        li.addEventListener("click", () => {
            if (element === "Nuevo ingreso") {
                nuevosIngresos();
            } else if (element === "Ver Autos") {
                verAutos(autos);
            } else if (element === "Autos Reparados") {
                console.log(element);
            } else if (element === "Autos sin reparar") {
                console.log(element);
            } else if (element === "Salir") {
                dashboard();
            }

            n++;
        });
    });
}

function dashboard() {
    const main = document.getElementById("main");
    main.innerHTML = "";
    main.classList.add("container");

    const div = document.createElement("div");


    main.appendChild(div);


    main.appendChild(cardAutosTaller());
}

function nuevosIngresos() {
    const main = document.getElementById("main");
    main.innerHTML = "";
    main.classList.add("container");

    const div = document.createElement("div");
    div.classList.add("border", "border-dark", "shadow-sm", "p-3", "rounded");
    div.innerHTML = `
        <div class="row">
            <div class="col-md-6 p-2">
                <div class="form-group">
                    <input type="text" class="form-control" id="nombre" placeholder="Cliente">
                </div>
            </div>
            <div class="col-md-6 p-2">
                <div class="form-group">
                    <select class="form-select" id="marca">
                    </select>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 p-2">
                <div class="form-group">
                    <input type="text" class="form-control" id="modelo" placeholder="Modelo">
                </div>
            </div>
            <div class="col-md-6 p-2">
                <div class="form-group">
                    <input type="text" class="form-control" id="dominio" placeholder="Dominio">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 p-2">
                <div class="form-group">
                    <input type="text" class="form-control" id="odometro" placeholder="Kilometraje">   
                </div>
            </div>  
        </div>
        <div class="row">
            <div class="col-md-6 p-2">
                <button class="btn btn-dark m-1" id="btnAgregar">Agregar</button>
            </div>
        </div>
    `;
    main.appendChild(div);

    selectMarcas();

    agregarAuto();


}

function selectMarcas() {
    let optionList = document.getElementById('marca').options;
    marcas.forEach((element) =>
        optionList.add(
            new Option(element.text, element.value, element.selected)
        )
    );
}

function agregarAuto() {
    const btnAgregar = document.getElementById("btnAgregar");
    btnAgregar.addEventListener("click", () => {
        const nombre = document.getElementById("nombre").value;
        const marca = document.getElementById("marca").value;
        const modelo = document.getElementById("modelo").value;
        const dominio = document.getElementById("dominio").value;
        const odometro = document.getElementById("odometro").value;

        const auto = new Autos(nombre, marca, modelo, dominio, odometro);
        autos.push(auto);

        mostrarAlerta("success", `Se cargó correctamente.`);
    });
}

function mostrarAlerta(status, mensaje) {
    const main = document.getElementById("main");
    if (status == "success") {
        sweetAlertSuccess(mensaje);
    } else {
        sweetAlertError(mensaje);
    }
}

function sweetAlertSuccess(mensaje) {
    Swal.fire({
        title: '¡Listo!',
        text: mensaje,
        icon: 'success',
        confirmButtonText: 'Ok'
    });
}

function sweetAlertError(mensaje) {
    Swal.fire({
        title: '¡Error!',
        text: mensaje,
        icon: 'error',
        confirmButtonText: 'Ok'
    });
}

function cardAutosTaller() {
    const card = document.createElement("div");
    card.classList.add("card", "shadow-sm");
    card.setAttribute("style", "width: 20rem;");
    card.innerHTML = `
    <div class="card-body text-center text-light bg-success rounded">
        <h2 class="card-title">${autos.length}</h2>
        <h5 class="card-title">Autos en taller</h5>
    </div>
    `
    return card;
}

function ordenarArray(array) {
    function comparar(a, b) {
        if (a.value < b.value) {
            return -1;
        }
        if (a.value > b.value) {
            return 1;
        }
        return 0;
    }

    return array.sort(comparar);
}

function verAutos(autos) {
    const main = document.getElementById("main");
    main.innerHTML = "";
    main.classList.add("container");

    for (let auto of autos) {
        const { cliente, marca, modelo, dominio, odometro, reparado } = auto;

        const card = document.createElement("div");
        card.classList.add("card", "shadow-sm", "mb-3");
        reparado ? card.classList.add("border-success") : card.classList.add("border-danger")
        card.innerHTML = `
            <div class="card-body">
                <div class="row">
                    <div class="col-2" style="align-self:center;">
                        <img src="assets/img/marcas/${marca}.png" width="120px" alt="${marca}">
                    </div>
                    <div class="col-4" style="align-self:center;">
                        <h5><strong>Cliente:</strong> ${cliente}</h5>
                        <h5><strong>Modelo:</strong> ${modelo}</h5>
                        <h5><strong>Patente:</strong> ${dominio}</h5>
                    </div>
                    <div class="col-4" style="align-self:center;">
                        <h5><strong>Kilometraje:</strong> ${odometro}</h5>
                        <h5><strong>Estado:</strong> ${reparado ? "Reparado" : "Sin reparar"}</h5>
                    </div>
                    <div class="col-2 d-grid gap-2 mx-auto" style="align-self:center;">
                        <button class="btn btn-modern">Ver detalles</button>
                        <button class="btn btn-warning" id="${dominio}">Marcar como reparado</button>
                    </div>
                </div>
            </div>
        `;
        main.appendChild(card);
    }
}

init();