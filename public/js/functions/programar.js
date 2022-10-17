

let sap = document.getElementById("sap")
let proveedor = document.getElementById("proveedor")
let cliente = document.getElementById("cliente")
let plataforma = document.getElementById("plataforma")
let descripcion = document.getElementById("descripcion")
let alerta = document.getElementById("alerta")
let periodo = document.getElementById("periodo")
let comentario = document.getElementById("comentario")


$(document).ready(function () {

    sap.focus()
    // getSelectInputs()

    // critico.value = ""
    // unidad.value = ""
    // sunidad.innerHTML = ""
    // scritico.innerHTML = ""

})


sap.addEventListener('change', function (evt) {

    sapFunction()

});

let materialID = ""


function sapFunction() {


    data = { "sap": `${sap.value}` }
    axios({
        method: 'post',
        url: `/sapInfo`,
        data: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then((result) => {
            dataInfo = result.data

            if (dataInfo.length == 1) {


                proveedor.value = dataInfo[0].programa_proveedor
                cliente.value = dataInfo[0].programa_cliente
                plataforma.value = dataInfo[0].programa_plataforma
                descripcion.value = dataInfo[0].programa_descripcion

            } else {


                proveedor.value = ""
                cliente.value = ""
                plataforma.value = ""
                descripcion.value = ""
            }



        })
        .catch((err) => { console.error(err) })






}

// function sapFunction() {

//     data = { "id": `${sap.value}` }
//     axios({
//         method: 'post',
//         url: `/sapInfo`,
//         data: JSON.stringify(data),
//         headers: { 'content-type': 'application/json' }
//     })
//         .then((result) => {

//             let dataInfo = result.data

//             console.log(dataInfo);


//         })
//         .catch((err) => { console.error(err) })


// }



// function getSelectInputs() {

//     axios({
//         method: 'get',
//         url: `/getConfig`,
//         headers: { 'content-type': 'application/json' }
//     }).then((response) => {

//         data= response.data
//         categoria = data[0]
//         concepto = data[1]
//         area = data[2]

//         scategoria.innerHTML = ""
//         option = document.createElement('option')
//         scategoria.add(option)
//         categoria.forEach(element => {
//             cat = element.categoria
//             option = document.createElement('option')
//             option.text = cat
//             option.value = element.categoria
//             scategoria.add(option)
//         });


//         sconcepto.innerHTML = ""
//         option = document.createElement('option')
//         sconcepto.add(option)
//         concepto.forEach(element => {
//             cat = element.concepto
//             option = document.createElement('option')
//             option.text = cat
//             option.value = element.concepto
//             sconcepto.add(option)
//         });


//         sarea.innerHTML = ""
//         option = document.createElement('option')
//         sarea.add(option)
//         area.forEach(element => {
//             cat = element.area
//             option = document.createElement('option')
//             option.text = cat
//             option.value = element.area
//             sarea.add(option)
//         });

//         })
//         .catch((err) => { console.error(err) })


// }



// btnCapturar.addEventListener('click', function (evt) {

//     let files = document.getElementById('fileUploader').files[0]

//     console.log(files);
//     if (sap.value != "" && proveedor.value != "" && cliente.value != "" && plataforma.value != "" && descripcion.value != "" && alerta.value != "" &&
//         periodo.value != "" && comentario.value != "") {
//         btnCapturar.disabled = true
//         data = {
//             "sap": `${sap.value}`, "proveedor": `${proveedor.value}`, "cliente": `${cliente.value}`, "plataforma": `${plataforma.value}`,
//             "descripcion": `${descripcion.value}`, "alerta": `${alerta.value}`, "periodo": `${periodo.value}`, "comentario": `${comentario.value}`,
//             "razonqueja": `${razonqueja.value}`, "numeroqueja": `${numeroqueja.value}`, "foto": files
//         }
//         axios({
//             method: 'post',
//             url: `/insertPrograma`,
//             data: JSON.stringify(data),
//             headers: { 'content-type': 'application/json' },
//         })
//             .then((result) => {

//                 InsertImage()

//                 sap.value = ""
//                 proveedor.value = ""
//                 cliente.value = ""
//                 plataforma.value = ""
//                 descripcion.value = ""
//                 periodo.value = ""
//                 comentario.value = ""
//                 alerta.value = ""
//                 razonqueja.value = ""
//                 numeroqueja.value = ""
//                 btnCapturar.disabled = false



//                 successMessage("Inspeccion Guardada")

//             })
//             .catch((err) => { console.error(err) })


//     } else {
//         errorMessage("Informacion Incompleta")
//     }



// });






// btnEliminar.addEventListener('click', function (evt) {


//     data = { "material": `${material.value}`,"materialID": `${materialID}`}


//     axios({
//         method: 'post',
//         url: `/deleteMaterial`,
//         data: JSON.stringify(data),
//         headers: { 'content-type': 'application/json' }
//     })
//         .then((result) => {


//             material.value = ""
//             descripcion.value = ""
//             scategoria.value = ""
//             sconcepto.value = ""
//             sarea.value = ""
//             rack.value = ""
//             nivel.value = ""
//             stockmin.value = ""
//             stockmax.value = ""
//             stock.value = ""
//             unidad.value = ""
//             precio.value = ""
//             reorden.value = ""
//             critico.value = ""

//             btnCapturar.disabled = false
//             btnEliminar.setAttribute("hidden", true); 
//             successMessage("Material Eliminado")

//         })
//         .catch((err) => { console.error(err) })

// });



function errorMessage(message) {

    soundWrong()
    alerta_prefijo.innerHTML = "Error: " + message
    alerta_prefijo.classList.remove("animate__flipOutX", "animate__animated")
    alerta_prefijo.classList.add("animate__flipInX", "animate__animated")


    setTimeout(() => {
        alerta_prefijo.classList.remove("animate__flipInX", "animate__animated")
        alerta_prefijo.classList.add("animate__flipOutX", "animate__animated")
    }, 2000);

}


function successMessage(message) {

    soundOk()
    alerta_prefijo.classList.remove("alert-danger");
    alerta_prefijo.classList.add("alert-success");

    alerta_prefijo.innerHTML = message
    alerta_prefijo.classList.remove("animate__flipOutX", "animate__animated")
    alerta_prefijo.classList.add("animate__flipInX", "animate__animated")


    setTimeout(() => {

        alerta_prefijo.classList.remove("animate__flipInX", "animate__animated")
        alerta_prefijo.classList.add("animate__flipOutX", "animate__animated")
        setTimeout(() => {
            alerta_prefijo.classList.remove("alert-success");
            alerta_prefijo.classList.add("alert-danger");
        }, 2000);

    }, 2000);

}