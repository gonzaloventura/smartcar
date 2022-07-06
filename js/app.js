let autos = [];
let autosReverse = [];
const noReparados = [];
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
        text: 'Dodge',
        value: 'Dodge'
    },
    {
        text: 'Nissan',
        value: 'Nissan'
    },
    {
        text: 'Audi',
        value: 'Audi'
    },
    {
        text: 'BMW',
        value: 'BMW'
    }
];

leerStorage();

ordenarArray(marcas);

init();

function init() {
    menu();
    dashboard();
}

function leerStorage() {
    let autosStorage = localStorage.getItem("autos");
    if (autosStorage) {
        autos = JSON.parse(autosStorage);
        autosReverse = autos.reverse();
    }
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

function dashboard() {
    const main = document.getElementById("main");
    main.innerHTML = "";
    main.classList.add("container");

    const div = document.createElement("div");
    div.classList.add("row");

    const divCol = document.createElement("div");
    divCol.classList.add("cardsDash");
    div.appendChild(divCol);

    main.appendChild(div);

    divCol.appendChild(cardAutosTaller());
    divCol.appendChild(cardAutosReparados());
    divCol.appendChild(cardAutosSinReparar());
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
                verAutos(autosReverse);
            } else if (element === "Autos Reparados") {
                verAutosReparados();
            } else if (element === "Autos sin reparar") {
                verAutosNoReparados();
            } else if (element === "Salir") {
                dashboard();
            }

            n++;
        });
    });
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
                <select class="form-select" id="modelo">
                </select>
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
    fetchModelos();
    revisarCampos();

    agregarAuto();

}

function revisarCampos() {
    const inputCliente = document.getElementById("nombre");
    const inputDominio = document.getElementById("dominio");
    const inputOdometro = document.getElementById("odometro");
    const inputMarca = document.getElementById("marca");
    const inputModelo = document.getElementById("modelo");

    inputCliente.addEventListener("keyup", () => {
        if (inputCliente.value.length > 2) {
            inputCliente.classList.remove("is-invalid");
            inputCliente.classList.add("is-valid");

        } else {
            inputCliente.classList.remove("is-valid");
            inputCliente.classList.add("is-invalid");
        }
    });


}

function limpiarCampos() {
    const inputCliente = document.getElementById("nombre");
    const inputDominio = document.getElementById("dominio");
    const inputOdometro = document.getElementById("odometro");
    const inputMarca = document.getElementById("marca");
    const inputModelo = document.getElementById("modelo");

    inputCliente.value = "";
    inputDominio.value = "";
    inputOdometro.value = "";
    inputMarca.value = "";
    inputModelo.value = "";
}

function selectMarcas() {
    let optionList = document.getElementById('marca').options;
    optionList.add(new Option('Seleccione una marca', '', false));
    marcas.forEach((element) =>
        optionList.add(
            new Option(element.text, element.value, element.selected)
        )
    );
}

function selectCarsModels(data) {
    let marca = document.getElementById('marca');
    marca.addEventListener("change", () => {
        let modelo = document.getElementById('modelo');
        modelo.innerHTML = "";
        let modeloFetchs = data.filter(e => e.marca == marca.value);
        modeloFetchs.forEach((element) => {
            let optionList = document.getElementById('modelo').options;
            optionList.add(
                new Option(element.car, element.car, element.selected)
            )
        });
    });
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
        guardarEnLocal(autos);

        mostrarAlerta("success", `Se cargó correctamente.`);
        limpiarCampos();
        leerStorage();
    });
}

function guardarEnLocal(autos) {
    localStorage.setItem("autos", JSON.stringify(autos));
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
    <div class="card-body text-center text-light bg-modern rounded">
        <h2 class="card-title">${autos.length}</h2>
        <h5 class="card-title">Autos en taller</h5>
    </div>
    `
    return card;
}

function cardAutosReparados() {

    filtrarReparados();
    const card = document.createElement("div");
    card.classList.add("card", "shadow-sm");
    card.setAttribute("style", "width: 20rem;");

    card.innerHTML = `
    <div class="card-body text-center text-light bg-success rounded">
        <h2 class="card-title">${filtrarReparados().length}</h2>
        <h5 class="card-title">Autos reparados</h5>
    </div>
    `
    return card;
}

function cardAutosSinReparar() {
    const card = document.createElement("div");
    card.classList.add("card", "shadow-sm");
    card.setAttribute("style", "width: 20rem;");

    card.innerHTML = `
    <div class="card-body text-center text-light bg-danger rounded">
        <h2 class="card-title">${filtrarNoReparados().length}</h2>
        <h5 class="card-title">Autos sin reparar</h5>
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

function verAutos(array) {
    const main = document.getElementById("main");
    main.innerHTML = "";
    main.classList.add("container");

    for (let element of array) {
        const { cliente, marca, modelo, dominio, odometro, reparado } = element;

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
                        <button class="btn btn-modern" id="${dominio}">Ver detalles</button>
                    </div>
                </div>
            </div>
        `;
        main.appendChild(card);
        let btn = document.getElementById(dominio);
        btn.addEventListener("click", () => {
            fetchLocal(element);
        });
    }
}

function verAutosReparados() {
    const reparados = autos.filter(e => e.reparado == true);

    const main = document.getElementById("main");
    main.innerHTML = "";
    main.classList.add("container");


    for (let auto of reparados) {
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
                        <button class="btn btn-modern" id="${dominio}">Ver detalles</button>
                    </div>
                </div>
            </div>
        `;
        main.appendChild(card);
        let btn = document.getElementById(dominio);
        btn.addEventListener("click", () => {
            fetchLocal(auto);
        });
    }
}

function verAutosNoReparados() {
    const noReparados = autos.filter(e => e.reparado == false);

    const main = document.getElementById("main");
    main.innerHTML = "";
    main.classList.add("container");


    for (let auto of noReparados) {
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
                        <button class="btn btn-modern" id="${dominio}">Ver detalles</button>
                    </div>
                </div>
            </div>
        `;
        main.appendChild(card);
        let btn = document.getElementById(dominio);
        btn.addEventListener("click", () => {
            fetchLocal(auto);
        });
    }
}

function filtrarReparados() {
    const reparados = autos.filter(e => e.reparado == true);
    return reparados;
}

function filtrarNoReparados() {
    const noReparados = autos.filter(e => e.reparado == false);
    return noReparados;
}

// Fetch para obtener los modelos de la marca seleccionada
function fetchModelos() {
    fetch("assets/img/autos/autos.json")
        .then(result => result.json())
        .then(data => selectCarsModels(data));
}


// Fetch para obtener las imagenes de los modelos
function fetchLocal(auto) {
    fetch("assets/img/autos/autos.json")
        .then(result => result.json())
        .then(data => mostrarDetalles(data, auto));
}

function mostrarDetalles(data, auto) {
    const { cliente, marca, modelo, odometro, dominio, reparado } = auto;
    let modeloFetchs = data.filter(e => e.car == modelo);
    const main = document.getElementById("main");
    main.innerHTML = "";
    main.classList.add("container");
    const card = document.createElement("div");
    card.classList.add("card", "shadow-sm", "mb-3");
    card.innerHTML = `
            <div class="card-body">
                <div class="row">
                    <div class="col-3 text-center" style="align-self:center;">
                        <img class="img" src="${modeloFetchs[0].img}" alt="${modeloFetchs[0].car}">
                    </div>
                    <div class="col-2" style="align-self:center; text-align: center;">
                        <img src="assets/img/marcas/${marca}.png" width="120px" alt="${marca}">
                    </div>
                    <div class="col-4" style="align-self:center;">
                        <h5><strong>Cliente:</strong> ${cliente}</h5>
                        <h5><strong>Modelo:</strong> ${modelo}</h5>
                    </div>
                    <div class="col-3" style="align-self:center;">
                        <h5><strong>Patente:</strong> ${dominio}</h5>
                        <h5><strong>Estado:</strong> ${reparado ? "Reparado" : "Sin reparar"}</h5>
                    </div>
                </div>
            </div>
    `
    main.appendChild(card);
    botonesDetalles(auto);
}

function botonesDetalles(auto) {
    const botonesArray = ["Ver Servicio a Realizar", "Marcar como " + (auto.reparado ? "Sin Reparar" : "Reparado")];
    const main = document.getElementById("main");
    const card = document.createElement("div");
    card.classList.add("text-center");

    botonesArray.forEach(element => {
        const btn = document.createElement("button");
        if (element == "Marcar como Reparado") {
            btn.classList.add("btn", "btn-success", "m-2");
            btn.addEventListener("click", () => {
                auto.reparado = true;
                fetchLocal(auto);
                guardarEnLocal(autos);
            });
        } else if (element == "Marcar como Sin Reparar") {
            btn.classList.add("btn", "btn-danger", "m-2");
            btn.addEventListener("click", () => {
                auto.reparado = false;
                fetchLocal(auto);
                guardarEnLocal(autos);
            });
        } else if (element == "Ver Servicio a Realizar") {
            btn.classList.add("btn", "btn-modern", "btn-block", "m-2");
            btn.addEventListener("click", () => {
                verDetallesReparacion(auto);
            });
        }
        btn.innerText = element;
        card.appendChild(btn);
    });
    main.appendChild(card);
}

function verDetallesReparacion(auto) {
    if (document.getElementById("detalle-reparacion")) {
        document.getElementById("detalle-reparacion").remove();
    }
    const main = document.getElementById("main");
    main.classList.add("container");
    const card = document.createElement("div");
    card.id = "detalle-reparacion";
    card.classList.add("card", "shadow-sm", "mb-3");
    main.appendChild(card);
    servicios(auto);


}

function servicios(auto) {
    console.log(auto);
    const card = document.getElementById("detalle-reparacion");
    if (auto.odometro > 5000 && auto.odometro < 15000) {
        card.innerHTML = `
            <div class="card-body">
                <div class="row">
                    <table class="table table-hover">
                    <thead>
                    <tr>
                      <th scope="col">CÓDIGO</th>
                      <th scope="col">DESCRIPCIÓN</th>
                      <th scope="col">REPUESTO</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Cambio de aceite de motor</td>
                      <td>Aceite Motor</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Cambio de filtro de aire</td>
                      <td>Filtro de aire</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Cambio de filtro de combustible</td>
                      <td>Filtro de combustible</td>
                    </tr>
                  </tbody>
                    </table>
                </div>
            </div>
    `;
    } else if (auto.odometro > 15000 && auto.odometro < 25000) {
        card.innerHTML = `
            <div class="card-body">
                <div class="row">
                    <table class="table table-hover">
                    <thead>
                    <tr>
                      <th scope="col">DESCRIPCIÓN</th>
                      <th scope="col">REPUESTO</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Cambio de aceite de motor</td>
                      <td>Aceite Motor</td>
                    </tr>
                    <tr>
                      <td>Cambio de filtro de aire</td>
                      <td>Filtro de aire</td>
                    </tr>
                    <tr>
                      <td>Cambio de filtro de combustible</td>
                      <td>Filtro de combustible</td>
                    </tr>
                    <tr>
                      <td>Verificar el estado de los soportes de motor</td>
                      <td>Soporte motor</td>
                    </tr>
                    <tr>
                      <td>Rotación de ruedas</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>Alineación y balanceo</td>
                      <td>Uso de alineadora y balanzas</td>
                    </tr>
                  </tbody>
                    </table>
                </div>
            </div>
    `;
    } else if (auto.odometro > 25000 && auto.odometro < 35000) {
        card.innerHTML = `
        <div class="card-body">
            <div class="row">
                <table class="table table-hover">
                <thead>
                <tr>
                  <th scope="col">DESCRIPCIÓN</th>
                  <th scope="col">REPUESTO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cambio de aceite de motor</td>
                  <td>Aceite Motor</td>
                </tr>
                <tr>
                  <td>Cambio de filtro de aire</td>
                  <td>Filtro de aire</td>
                </tr>
                <tr>
                  <td>Cambio de filtro de combustible</td>
                  <td>Filtro de combustible</td>
                </tr>
                <tr>
                      <td>Rotación de ruedas</td>
                      <td>-</td>
                    </tr>
                <tr>
                    <td>Alineación y balanceo</td>
                    <td>Uso de alineadora y balanzas</td>
                </tr>
                <tr>
                    <td>Revision de sistema de frenos</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>Engrase de rodamientos en las ruedas traseras</td>
                    <td>Grasa</td>
                </tr>
                <tr>
                    <td>Cambio de filtro de aire del habitáculo del aire acondicionado.</td>
                    <td>Filtro de polen</td>
                </tr>
              </tbody>
                </table>
            </div>
        </div>
`;
    } else if (auto.odometro > 35000 && auto.odometro < 45000) {
        card.innerHTML = `
        <div class="card-body">
            <div class="row">
                <table class="table table-hover">
                <thead>
                <tr>
                  <th scope="col">DESCRIPCIÓN</th>
                  <th scope="col">REPUESTO</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                <td>Cambio de aceite de motor</td>
                <td>Aceite Motor</td>
                </tr>
                <tr>
                <td>Cambio de filtro de aire</td>
                <td>Filtro de aire</td>
                </tr>
                <tr>
                <td>Cambio de filtro de combustible</td>
                <td>Filtro de combustible</td>
                </tr>
                <tr>
                    <td>Rotación de ruedas</td>
                    <td>-</td>
                    </tr>
                <tr>
                    <td>Alineación y balanceo</td>
                    <td>Uso de alineadora y balanzas</td>
                </tr>
                <tr>
                    <td>Inspección de filtro de aire del habitáculo del aire acondicionado.</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>Cambio de aceite hidráulico</td>
                    <td>Aceite hidráulico</td>
                </tr>
                <tr>
                    <td>Cambio de aceite diferencial (si es 4x4)</td>
                    <td>Aceite diferencial</td>
                </tr>
              </tbody>
                </table>
            </div>
        </div>
`;
    } else if (auto.odometro > 45000 && auto.odometro < 55000) {
        card.innerHTML = `
        <div class="card-body">
            <div class="row">
                <table class="table table-hover">
                <thead>
                <tr>
                  <th scope="col">DESCRIPCIÓN</th>
                  <th scope="col">REPUESTO</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                <td>Cambio de aceite de motor</td>
                <td>Aceite Motor</td>
                </tr>
                <tr>
                <td>Cambio de filtro de aire</td>
                <td>Filtro de aire</td>
                </tr>
                <tr>
                <td>Cambio de filtro de combustible</td>
                <td>Filtro de combustible</td>
                </tr>
                <tr>
                    <td>Rotación de ruedas</td>
                    <td>-</td>
                    </tr>
                <tr>
                    <td>Alineación y balanceo</td>
                    <td>Uso de alineadora y balanzas</td>
                </tr>
              </tbody>
                </table>
            </div>
        </div>
`;
    } else if (auto.odometro > 55000 && auto.odometro < 75000) {
        card.innerHTML = `
        <div class="card-body">
            <div class="row">
                <table class="table table-hover">
                <thead>
                <tr>
                  <th scope="col">DESCRIPCIÓN</th>
                  <th scope="col">REPUESTO</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                <td>Cambio de aceite de motor</td>
                <td>Aceite Motor</td>
                </tr>
                <tr>
                <td>Cambio de filtro de aire</td>
                <td>Filtro de aire</td>
                </tr>
                <tr>
                <td>Cambio de filtro de combustible</td>
                <td>Filtro de combustible</td>
                </tr>
                <tr>
                    <td>Rotación de ruedas</td>
                    <td>-</td>
                    </tr>
                <tr>
                    <td>Alineación y balanceo</td>
                    <td>Uso de alineadora y balanzas</td>
                </tr>
                <tr>
                    <td>Cambio de kit de distribución</td>
                    <td>Kit distribución</td>
                </tr>
                <tr>
                    <td>Cambio de Poly-V</td>
                    <td>Poly-V</td>
                </tr>
                <tr>
                    <td>Cambio de Liquido refrigerante</td>
                    <td>Liquido refrigerante</td>
                </tr>
                <tr>
                    <td>Inspección tren delantero</td>
                    <td>-</td>
                </tr>
              </tbody>
                </table>
            </div>
        </div>
`;
    } else if (auto.odometro > 75000 && auto.odometro < 100000) {
        card.innerHTML = `
        <div class="card-body">
            <div class="row">
                <table class="table table-hover">
                <thead>
                <tr>
                  <th scope="col">DESCRIPCIÓN</th>
                  <th scope="col">REPUESTO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cambio de aceite de motor</td>
                  <td>Aceite Motor</td>
                </tr>
                <tr>
                  <td>Cambio de filtro de aire</td>
                  <td>Filtro de aire</td>
                </tr>
                <tr>
                  <td>Cambio de filtro de combustible</td>
                  <td>Filtro de combustible</td>
                </tr>
                <tr>
                    <td>Inspección tren delantero</td>
                    <td>-</td>
                </tr>
              </tbody>
                </table>
            </div>
        </div>
`;
    } else if (auto.odometro > 100000) {
        card.innerHTML = `
            <div class="card-body">
                <div class="row">
                    <h5>Se debe inspeccionar toda la unidad</h5>
                </div>
            </div>
    `;
    } else {
        card.innerHTML = `
            <div class="card-body">
                <div class="row">
                    <h5>Error en el kilometraje ingresado</h5>
                </div>
            </div>
    `;
    }
}