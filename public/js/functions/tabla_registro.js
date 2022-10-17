let btnCerrarHistorial = document.getElementById("btnCerrarHistorial")
let btnCerrarRegistro = document.getElementById("btnCerrarRegistro")
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



const picker2 = datepicker('#fecha_registro', {
    customDays: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    overlayPlaceholder: 'Seleccionar Mes',
    customMonths: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    disabled: true,
    minDate: new Date(2020, 0, 1),
    formatter: (input, date, instance) => {
        let mm = date.getMonth() + 1;
        let dd = date.getDate();
        let yy = date.getFullYear();
        myDateString = yy + '-' + mm + '-' + dd;
        input.value = myDateString

      
    }


})



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

                let status=""
                if(   element2.registro_status != 'APROBADO'){status=`<span class="icoSidebar fas fa-times text-danger"><span hidden>B</span></span>`}
               else {status=`<span class="icoSidebar fas fa-check text-success"><span hidden>C</span></span>`}
            


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
        url: `/getIncomingTable`,
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

                    
                    
                    
                    
                    `<button type="submit" class="btn" id="btnHist${element.programa_id}" onClick="modalRegistrar('${element.programa_id}')"> <span class="icoSidebar fas fa-pen text-primary""></span>`,
                    `<button type="submit" class="btn" id="btnHist${element.programa_id}" onClick="modalHistorial('${element.programa_id}')"> <span class="icoSidebar fas fa-folder-open text-info""></span>`,
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

            let data1=data[0]
    
            idprograma=data1[0].programa_id

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


            serial.value = ""
            pzastotal.value = ""
            pzasok.value = ""
            pzasnok.value = ""
            fecha_registro.value = ""
            comentarioreg.value = ""


            document.getElementById("PDF").src="/../"+idprograma+".pdf";

        })
        .catch((err) => { console.error(err) })


}



btnCapturarRegistro.addEventListener('click', function (evt) {


    if(serial.value != "" && pzastotal.value != "" && pzasok.value != "" && pzasnok.value != "" && fecha_registro.value != "" && (parseInt(pzastotal.value)==parseInt(pzasok.value)+parseInt(pzasnok.value))  )

    {
        btnCapturarRegistro.disabled = true
        data = {"programa": `${idprograma}`, "serial": `${serial.value}`, "pzastotales": `${pzastotal.value}`, "pzasok": `${pzasok.value}`, "pzasnok": `${pzasnok.value}`,
        "fecha": `${fecha_registro.value}`,"comentario": `${comentarioreg.value}`, "empleado": `${user_id.innerText}` 
        }
        axios({
            method: 'post',
            url: `/insertRegistroIncoming`,
            data: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })
            .then((result) => {

               
                serial.value = ""
                pzastotal.value = ""
                pzasok.value = ""
                pzasnok.value = ""
                fecha_registro.value = ""
                comentarioreg.value = ""


                $('#modalRegistrar').modal('hide');

                // btnCapturar.disabled = false
                // //btnEliminar.setAttribute("hidden", true); 
                // successMessage("Inspeccion Guardada")

            })
            .catch((err) => { console.error(err) })
    

    }else{
       // errorMessage("Informacion Incompleta")
    }



});