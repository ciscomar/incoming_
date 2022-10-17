let btnCapturar = document.getElementById("btnCapturar")
let scorreo = document.getElementById("correo")

let table = $('#table').DataTable(
    {
        bFilter: true,
        bInfo: true,
        paging: true,
        pageLength: 8,  
        
    }
);


$(document).ready(function () {

    correosTable()
    getAllCorreos()


})




function correosTable() {

    data = { "id": `` }
    axios({
        method: 'post',
        url: `/getCorreosTable`,
        data: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then((result) => {

            let data = result.data

            data.forEach(element => {

                table.row.add([
                    `<button type="submit" class="btn" id="btndelete${ element.id}" onClick="deleteCorreo('${element.id}')"> <span class="icoSidebar fas fa-trash text-danger""></span>`,
                    element.correo,

                ]).draw(false);
            });




        })
        .catch((err) => { console.error(err) })


}


function getAllCorreos() {

    data = { "id": `` }
    axios({
        method: 'post',
        url: `/getAllCorreos`,
        data: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then((result) => {

            let data = result.data
            data= result.data
            correos = data

    
            scorreo.innerHTML = ""
            option = document.createElement('option')
            scorreo.add(option)
            correos.forEach(element => {
                cat = element.emp_correo
                option = document.createElement('option')
                option.text = cat
                option.value = element.emp_correo
                scorreo.add(option)
            });
    



        })
        .catch((err) => { console.error(err) })


}




btnCapturar.addEventListener('click', function (evt) {


    data = { "correo": `${scorreo.value}` }
    axios({
        method: 'post',
        url: `/insertCorreo`,
        data: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then((result) => {


            table.clear().draw()
            correosTable()


        })
        .catch((err) => { console.error(err) })



})



function deleteCorreo(id) {

    data = { "id": `${id}` }
    axios({
        method: 'post',
        url: `/deleteCorreo`,
        data: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then((result) => {

            table.clear().draw()
            correosTable()

        })
        .catch((err) => { console.error(err) })


}