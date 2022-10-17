let btnCerrarHistorial = document.getElementById("btnCerrarHistorial")
let btnCerrarRegistro = document.getElementById("btnCerrarRegistro")
let btnLiberar = document.getElementById("btnLiberar")

let user_id = document.getElementById("user_id")
let table = $('#table').DataTable(
    {
        bFilter: true,
        bInfo: true,
        paging: true,
        pageLength: 15,

    }
);



let tableHist = $('#tableHistorial').DataTable(
    {
        bFilter: true,
        bInfo: true,
        paging: true,
        pageLength: 15,


    }
);




$(document).ready(function () {

    incommingTable()


})


btnCerrarHistorial.addEventListener("click", () => {
    tableHist.clear().draw();

})



function modalHistorial(id) {

    $('#modalHistorial').modal({ backdrop: 'static', keyboard: false })



    data = { "id": `${id}` }
    axios({
        method: 'post',
        url: `/getHistorialIncoming`,
        data: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then((result) => {


            let hisotrial = result.data

            hisotrial.forEach(element2 => {

                let status = ""
                if (element2.registro_status != 'APROBADO') { status = `<span class="icoSidebar fas fa-times text-danger"><span hidden>B</span></span>` }
                else { status = `<span class="icoSidebar fas fa-check text-success"><span hidden>C</span></span>` }



                tableHist.row.add([

                    element2.registro_fecha.substring(0, element2.registro_fecha.indexOf("T")),
                    element2.registro_serial,
                    element2.registro_pzastotales,
                    element2.registro_pzasok,
                    element2.registro_pzasnok,
                    element2.registro_empleado,
                    element2.registro_comentario,
                    status


                ]).draw(false);

            });

        })
        .catch((err) => { console.error(err) })


}


function incommingTable() {

    data = { "id": `` }
    axios({
        method: 'post',
        url: `/getIncomingTableAll`,
        data: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then((result) => {

            let data = result.data

            data.forEach(element => {

                let status=""
                if(   element.programa_status === 'LIBERADO'){status=`<span class="icoSidebar fas fa-check text-success"><span hidden>B</span></span>`}
               else {status=`<span class="icoSidebar fas fa-calendar-week text-secondary"><span hidden>C</span></span>`}

                table.row.add([





                    `<button type="submit" class="btn" id="btnHist${element.programa_id}" onClick="modalHistorial('${element.programa_id}')"> <span class="icoSidebar fas fa-folder-open text-info""></span>`,
                    `<button type="submit" class="btn" id="btnHist${element.programa_id}" onClick="modalRegistrar('${element.programa_id}')"> <span class="icoSidebar fas fa-list text-primary""></span>`,
                    element.programa_id,
                    element.programa_sap,
                    element.programa_proveedor,
                    element.programa_cliente,
                    element.programa_plataforma,
                    element.programa_descripcion,
                    element.programa_alerta,
                    element.programa_periodo,
                    element.programa_comentario,

                    status



                ]).draw(false);


            });




        })
        .catch((err) => { console.error(err) })


}






let idprograma

function modalRegistrar(id) {

    $('#modalRegistrar').modal({ backdrop: 'static', keyboard: false })
    btnCapturarRegistro.disabled = false


    data = { "id": `${id}` }
    axios({
        method: 'post',
        url: `/getProgramaId`,
        data: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then((result) => {

            let data = result.data


            data1= data[0]
            data2= data[1]

            idprograma = data1[0].programa_id

            sap.value = data1[0].programa_sap
            proveedor.value = data1[0].programa_proveedor
            cliente.value = data1[0].programa_cliente
            plataforma.value = data1[0].programa_plataforma
            descripcion.value = data1[0].programa_descripcion
            periodo.value = data1[0].programa_periodo
            comentario.value = data1[0].programa_comentario
            alerta.value = data1[0].programa_alerta
            razonqueja.value = data1[0].programa_razonqueja
            numeroqueja.value = data1[0].programa_numeroqueja

            document.getElementById("PDF").src="/../"+idprograma+".pdf";


            if(data2.length===1){
                embarques.value = data2[0].checklist_embarque
                ocho.value = data2[0].checklist_ocho
                acciones.value = data2[0].checklist_acciones
                queja.value = data2[0].checklist_queja
                seguimiento.value = data2[0].checklist_corporativo
                cost.value = data2[0].checklist_cost
                sqe.value = data2[0].checklist_sqe
                comentariocheck.value = data2[0].checklist_comentario
                fechaactualizacion.value = data2[0].checklist_fecha
                usuario.value = data2[0].checklist_user

            }else{

                embarques.value = ""
                ocho.value =
                acciones.value = ""
                queja.value = ""
                seguimiento.value = ""
                cost.value = ""
                sqe.value = ""
                comentariocheck.value = ""
                fechaactualizacion.value = ""
                usuario.value = ""
            }
 




            if(data1[0].programa_status != "ACTIVO"){
                
                btnCapturarRegistro.hidden=true
                btnLiberar.hidden=true

                embarques.disabled=true
                ocho.disabled=true
                acciones.disabled=true
                queja.disabled=true
                seguimiento.disabled=true
                cost.disabled=true
                sqe.disabled=true
                comentariocheck.disabled=true

            }else{

                btnCapturarRegistro.hidden=false
                btnLiberar.hidden=false

                embarques.disabled=false
                ocho.disabled=false
                acciones.disabled=false
                queja.disabled=false
                seguimiento.disabled=false
                cost.disabled=false
                sqe.disabled=false
                comentariocheck.disabled=false

            }

      

            if(embarques.value ==="APROBADO" && ocho.value==="APROBADO" &&  acciones.value==="APROBADO" && queja.value==="APROBADO" && seguimiento.value==="APROBADO"
            && cost.value==="APROBADO"  && sqe.value==="APROBADO" &&  data1[0].programa_status==="LIBERADO"
            ){
             
                btnLiberar.hidden=true
                btnCapturarRegistro.hidden=true
            }else if(embarques.value ==="APROBADO" && ocho.value==="APROBADO" &&  acciones.value==="APROBADO" && queja.value==="APROBADO" && seguimiento.value==="APROBADO"
            && cost.value==="APROBADO"  && sqe.value==="APROBADO" &&  data1[0].programa_status==="ACTIVO"){
              
                btnLiberar.hidden=false
                btnCapturarRegistro.hidden=false
                
            }else{
               
                btnLiberar.hidden=true
                btnCapturarRegistro.hidden=false
            }


        })
        .catch((err) => { console.error(err) })


}


let todayDate = moment()
const dformat = "YYYY-MM-DD"

btnCapturarRegistro.addEventListener('click', function (evt) {


    if (embarques.value != "" && ocho.value != "" && acciones.value != "" && queja.value != "" && seguimiento.value != "" && cost.value != "" && sqe.value != "" ) {
        btnCapturarRegistro.disabled = true
        data = {
            "programa": `${idprograma}`, "embarques": `${embarques.value}`, "ocho": `${ocho.value}`, "acciones": `${acciones.value}`, "queja": `${queja.value}`,
            "seguimiento": `${seguimiento.value}`, "cost": `${cost.value}`, "sqe": `${sqe.value}`, "comentariocheck": `${comentariocheck.value}`, "fecha": `${todayDate.format(dformat)}`
        }
        axios({
            method: 'post',
            url: `/insertCheckListIncoming`,
            data: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })
            .then((result) => {

                console.log("true");
                embarques.value = ""
                ocho.value = ""
                acciones.value = ""
                queja.value = ""
                seguimiento.value = ""
                cost.value = ""
                sqe.value = ""
                comentariocheck.value = ""
                fechaactualizacion.value = ""
                usuario.value = ""

                $('#modalRegistrar').modal('hide');

                // btnCapturar.disabled = false
                // //btnEliminar.setAttribute("hidden", true); 
                // successMessage("Inspeccion Guardada")

            })
            .catch((err) => { console.error(err) })


    } else {
        // errorMessage("Informacion Incompleta")
    }



});






btnLiberar.addEventListener('click', function (evt) {



        btnLiberar.disabled = true
        data = {
            "programa": `${idprograma}`
        }
        axios({
            method: 'post',
            url: `/liberar`,
            data: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })
            .then((result) => {


                $('#modalRegistrar').modal('hide');

 

            })
            .catch((err) => { console.error(err) })




});