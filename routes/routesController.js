//Conexion a base de datos
const controller = {};
var amqp = require('amqplib/callback_api');
const jwt = require('jsonwebtoken');
//Require Redis
const redis = require('redis');
//Require Funciones
const funcion = require('../public/js/functions/controllerFunctions');
const fileUpload = require('express-fileupload');

const ejs = require("ejs");
const path = require('path');
const nodeMailer = require('../public/mail/conn')

async function sendMail(to, material) {

    const data = await ejs.renderFile(path.join(__dirname, `../public/mail/mail.ejs`), { clave: material.clave_material, stock: material.stock, reorden: material.punto_reorden, descripcion: material.descripcion  });
    let mailOptions = {
        from: "noreply@tristone.com",
        to: `${to}`,
        subject: `ToolCrib Punto de Reorden #${material.clave_material} `,
        text: "",
        html: data,
    };


    nodeMailer.transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.info(info);
        }
    })
}


controller.index_GET = (req, res) => {
    user = req.connection.user
    res.render('index.ejs', {
        user
    });
}

controller.login = (req, res) => {
    res.render('login.ejs', {
    });
}

controller.accesoDenegado_GET = (req, res) => {
    user = req.connection.user
    res.render('acceso_denegado.ejs', {
        user
    });
}

function acceso(req) {
    let acceso = []
    let userGroups = req.connection.userGroups

    return new Promise((resolve, reject) => {
        userGroups.forEach(element => {
            if (element.toString() === 'TFT\\TFT.DEL.PAGES_Incoming') {
                acceso.push(element.toString())
            }
        });
        let response = acceso.length == 0 ? reject("noAccess") : resolve(acceso)
    })

}




controller.material_GET = (req, res) => {

    let access = ""
    acceso(req)
        .then((result) => {
         
            result.forEach(element => {
                
                if (element === "TFT\\TFT.DEL.PAGES_Incoming") access = "ok"
            });
            if (access == "ok") {
                res.render("programar.ejs")
            } else {
                res.redirect("/acceso_denegado")
            }
        })
        .catch((err) => { res.redirect("/acceso_denegado") })


}




controller.checklist_GET = (req, res) => {

    let access = ""
    acceso(req)
        .then((result) => {

            user_id=req.connection.user
         
            result.forEach(element => {
                
                if (element === "TFT\\TFT.DEL.PAGES_Incoming") access = "ok"
            });
            if (access == "ok") {
                res.render('checklist.ejs', {
                    user_id
                });
            } else {
                res.redirect("/acceso_denegado")
            }
        })
        .catch((err) => { res.redirect("/acceso_denegado") })


}


controller.tabla_registro_GET = (req, res) => {


    
    user_id=req.res.locals.authData.id.id

        res.render('tabla_registro.ejs', {
            user_id
        });

}

controller.userAccess_POST = (req, res) => {
    let user_id = req.body.user
    funcion.getUsers(user_id)
        .then((result) => {
            if (result.length == 1) {
                emp_nombre = result[0].emp_name

                accessToken(user_id, emp_nombre)
                    .then((result) => {
                        cookieSet(req, res, result)
                    })
                    .catch((err) => { res.json(err); })

            } else {
                res.json("unathorized")
            }
        })
        .catch((err) => {
            console.error(err);
            res.json(err)
        })
}

function accessToken(user_id, user_name) {
    return new Promise((resolve, reject) => {
        const id = { id: `${user_id}`, username: `${user_name}` }
        jwt.sign({ id }, `tristone`, {/*expiresIn: '1h'*/}, (err, token) => {
            resolve(token)
            reject(err)
        })
    })
}


function cookieSet(req, res, result) {

    let minutes = 15;
    const time = minutes * 60 * 1000;
    res.cookie('accessToken', result,
        {
            maxAge: time,
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production' ? true : false
        })
    res.json(result)

}






controller.getIncomingTable_POST = (req, res) => {

    funcion.getIncomingTable()
    .then((result) => { res.json(result) })
    .catch((err) => { console.error(err) })
}

controller.getIncomingTableAll_POST = (req, res) => {

    funcion.getIncomingTableAll()
    .then((result) => { res.json(result) })
    .catch((err) => { console.error(err) })
}



controller.getProgramaId_POST = (req, res) => {


    async function waitForPromise() {

        let programa = await funcion.getProgramaId(req.body.id)
        let checklist = funcion.getChecklist(req.body.id)

        Promise.all([programa, checklist])
            .then(result => { res.json(result) })
            .catch(err => { console.error(err) })

    }
    waitForPromise()

}



controller.liberar_POST = (req, res) => {

    let data = req.body

    async function waitForPromise() {

        let programa = await funcion.liberar(data)
        let checklist = funcion.liberarcheck(data)

        Promise.all([programa, checklist])
            .then(result => { res.json(result) })
            .catch(err => { console.error(err) })

    }
    waitForPromise()

}



controller.insertPrograma_POST = (req, res) => {

    let data = req.body

let fileUploader = req.files.fileUploader;
// fileUploader.mv('D:/DEL/calidad_incoming/' + result.insertId + '.jpg', function (err) {

    funcion.insertPrograma(data)
    .then((result) => {


        fileUploader.mv('D:/DEL/calidad_incoming/' + result.insertId + '.pdf', function (err) {
            if (err)
                return res.status(500).send(err);
        });

         res.render("programar.ejs")
        })
    .catch((err) => { console.error(err) })
}



controller.insertImage_POST = (req, res) => {

    let data = req.body


}

controller.insertRegistroIncoming_POST = (req, res) => {

    let data = req.body

    let status 

    if(req.body.pzasnok>0){
        status="RECHAZADO"
    }else{
        status="APROBADO"
    }

    funcion.insertRegistroIncoming(data, status)
    .then((result) => { res.json(result) })
    .catch((err) => { console.error(err) })
}


controller.insertCheckListIncoming_POST = (req, res) => {

    let data = req.body

    let user = req.connection.user.substring(4)


    funcion.insertCheckListIncoming(data, user)
    .then((result) => { res.json(result) })
    .catch((err) => { console.error(err) })
}




controller.getHistorialIncoming_POST = (req, res) => {

    let data = req.body

    funcion.getHistorialIncoming(data)
    .then((result) => { res.json(result) })
    .catch((err) => { console.error(err) })
}


controller.sapInfo_POST = (req, res) => {
    

    let data = req.body

    funcion.sapInfo(data)
    .then((result) => { res.json(result) })
    .catch((err) => { console.error(err) })
}


controller.notificar_GET = (req, res) => {
    
    let access = ""
    acceso(req)
        .then((result) => {

            result.forEach(element => {
                
                if (element === "TFT\\TFT.DEL.PAGES_Toolcrib") access = "ok"
            });
            if (access == "ok") {
                res.render("notificar.ejs")
            } else {
                res.redirect("/acceso_denegado")
            }
        })
        .catch((err) => { res.redirect("/acceso_denegado") })


}



controller.getCorreosTable_POST = (req, res) => {

    funcion.getCorreos()
    .then((result) => { res.json(result) })
    .catch((err) => { console.error(err) })
}



controller.getAllCorreos_POST = (req, res) => {

    funcion.getAllCorreos()
    .then((result) => { res.json(result) })
    .catch((err) => { console.error(err) })
}

controller.insertCorreo_POST = (req, res) => {

    let correo = req.body.correo

    funcion.insertCorreo(correo)
    .then((result) => { res.json(result) })
    .catch((err) => { console.error(err) })
}


controller.deleteCorreo_POST = (req, res) => {

    let id = req.body.id

    funcion.deleteCorreo(id)
    .then((result) => { res.json(result) })
    .catch((err) => { console.error(err) })
}
module.exports = controller;