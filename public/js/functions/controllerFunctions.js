const funcion = {};

const dbE = require('../../db/conn_empleados');
const db = require('../../db/conn_incoming');
const dbA = require('../../db/conn_areas');
const dbEA = require('../../db/conn_empleadosAll');


funcion.insertPrograma= (values) => {


    return new Promise((resolve, reject) => {
            db(`
        INSERT INTO programa (
            programa_sap,
            programa_proveedor,
            programa_cliente,
            programa_plataforma,
            programa_descripcion,
            programa_alerta,
            programa_periodo,
            programa_comentario,
            programa_razonqueja,
            programa_numeroqueja,
            programa_status
            )
    VALUES( 
    '${values.sap}',
    '${values.proveedor}', 
    '${values.cliente}', 
    '${values.plataforma}',
    '${values.descripcion}',
    '${values.alerta}', 
    '${values.periodo}',
    '${values.comentario}', 
    '${values.razonqueja}', 
    '${values.numeroqueja}', 
    'ACTIVO')`)
                .then((result) => { resolve(result) })
                .catch((error) => { console.log(error); reject(error) })

    })

}



funcion.getIncomingTable = () => {
    return new Promise((resolve, reject) => {
        db(`
        SELECT 
            *
        FROM
            programa
            WHERE programa_status='ACTIVO'
       
        `)
            .then((result) => { resolve(result) })
            .catch((error) => { reject(error) })
    })
}


funcion.getIncomingTableAll = () => {
    return new Promise((resolve, reject) => {
        db(`
        SELECT 
            *
        FROM
            programa
            ORDER BY programa_status DESC
       
        `)
            .then((result) => { resolve(result) })
            .catch((error) => { reject(error) })
    })
}



funcion.getProgramaId = (id) => {
    return new Promise((resolve, reject) => {
        db(`
        SELECT 
            *
        FROM
            programa
            WHERE programa_id='${id}' 
       
        `)
            .then((result) => { resolve(result) })
            .catch((error) => { reject(error) })
    })
}


funcion.getChecklist = (id) => {
    return new Promise((resolve, reject) => {
        db(`
        SELECT 
            *
        FROM
            checklist
            WHERE checklist_programa='${id}' 
       
        `)
            .then((result) => { resolve(result) })
            .catch((error) => { reject(error) })
    })
}

funcion.insertRegistroIncoming= (values, status) => {


    return new Promise((resolve, reject) => {
            db(`
        INSERT INTO registros (
           registro_programa,
           registro_empleado,
           registro_serial,
           registro_pzastotales,
           registro_pzasok,
           registro_pzasnok,
           registro_fecha,
           registro_comentario,
           registro_status
            )
    VALUES( 
    '${values.programa}',
    '${values.empleado}', 
    '${values.serial}', 
    '${values.pzastotales}',
    '${values.pzasok}',
    '${values.pzasnok}', 
    '${values.fecha}',
    '${values.comentario}',
    '${status}'
    )`
    
    )
                .then((result) => { resolve(result) })
                .catch((error) => { console.log(error); reject(error) })

    })

}




funcion.getHistorialIncoming = (values) => {
    return new Promise((resolve, reject) => {
        db(`
        SELECT 
            *
        FROM
            registros
        WHERE 
            registro_programa='${values.id}'
        ORDER BY 
        registro_id DESC
       
        `)
            .then((result) => { resolve(result) })
            .catch((error) => { reject(error) })
    })
}



funcion.sapInfo = (values) => {

    return new Promise((resolve, reject) => {
        db(`
        SELECT 
            *
        FROM
            programa
        WHERE 
            programa_sap='${values.sap}'
        ORDER BY 
        programa_id DESC LIMIT 1
       
        `)
            .then((result) => { resolve(result) })
            .catch((error) => { reject(error) })
    })
}




funcion.getUsers = (user) => {
    return new Promise((resolve, reject) => {
        dbE(`
        SELECT 
            emp_name
        FROM
            empleados
        WHERE
            emp_num = ${user}
       
        `)
            .then((result) => { resolve(result) })
            .catch((error) => { reject(error) })
    })
}



funcion.getCorreos = (id) => {
    return new Promise((resolve, reject) => {
        db(`
        SELECT 
            *
        FROM
            correo
       
        `)
            .then((result) => { resolve(result) })
            .catch((error) => { reject(error) })
    })
}


funcion.getAllCorreos= () => {
    return new Promise((resolve, reject) => {
        dbEA(`
        SELECT 
            emp_correo
        FROM
            del_empleados
        WHERE
            emp_correo != ""
       
        `)
            .then((result) => { resolve(result) })
            .catch((error) => { reject(error) })
    })
}


funcion.insertCorreo = (correo) => {

    return new Promise((resolve, reject) => {
        db(`
        INSERT INTO 
            correo (correo)
        VALUES
            ('${correo}')
            `)
            .then((result) => { resolve(result) })
            .catch((error) => { reject(error) })
    })
}



funcion.deleteCorreo = (id) => {

    return new Promise((resolve, reject) => {
        db(`
        DELETE 
            FROM 
                correo 
            WHERE
                id = '${id}'
            `)
            .then((result) => { resolve(result) })
            .catch((error) => { reject(error) })
    })
}





funcion.insertCheckListIncoming= (values, user) => {


    return new Promise((resolve, reject) => {
            db(`
        INSERT INTO checklist (
            checklist_programa,
            checklist_embarque, 
            checklist_ocho, 
            checklist_acciones, 
            checklist_queja, 
            checklist_corporativo, 
            checklist_cost,
            checklist_sqe, 
            checklist_comentario, 
            checklist_user, 
            checklist_fecha, 
            checklist_status)
    VALUES( 
    '${values.programa}',
    '${values.embarques}', 
    '${values.ocho}', 
    '${values.acciones}',
    '${values.queja}',
    '${values.seguimiento}', 
    '${values.cost}',
    '${values.sqe}',  
    '${values.comentariocheck}',
    '${user}', 
    '${values.fecha}',
    'ACTIVO')
       ON DUPLICATE KEY UPDATE 
            checklist_programa='${values.programa}', 
            checklist_embarque='${values.embarques}', 
            checklist_ocho='${values.ocho}', 
            checklist_acciones='${values.acciones}', 
            checklist_queja='${values.queja}',
            checklist_corporativo='${values.seguimiento}', 
            checklist_cost= '${values.cost}', 
            checklist_sqe='${values.sqe}',  
            checklist_comentario='${values.comentariocheck}',
            checklist_user='${user}',  
            checklist_fecha='${values.fecha}', 
            checklist_status='ACTIVO'
            `)
                .then((result) => { resolve(result) })
                .catch((error) => {  reject(error) })

    })

}




funcion.liberar = (values) => {
    return new Promise((resolve, reject) => {
        db(`
        UPDATE  programa
            SET programa_status= 'LIBERADO'
        WHERE programa_id ='${values.programa}'

       
        `)
            .then((result) => { resolve(result) })
            .catch((error) => { reject(error) })
    })
}



funcion.liberarcheck = (values) => {
    return new Promise((resolve, reject) => {
        db(`
        UPDATE  checklist
            SET checklist_status= 'LIBERADO'
        WHERE checklist_programa ='${values.programa}'

       
        `)
            .then((result) => { resolve(result) })
            .catch((error) => { reject(error) })
    })
}




module.exports = funcion;