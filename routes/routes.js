const express = require('express');
const router = express.Router();
const routesController = require('./routesController')
const middleware = require('../public/js/middlewares/middleware')
const multer = require('multer');
const upload = multer()


//Routes

router.get('/',routesController.index_GET);
router.get('/login/:id', middleware.loginVerify, routesController.login);
router.get('/acceso_denegado',routesController.accesoDenegado_GET);
router.post('/userAccess', routesController.userAccess_POST);
router.get('/tabla_registro',middleware.verifyToken, routesController.tabla_registro_GET);
router.post('/getIncomingTable',  routesController.getIncomingTable_POST);
router.post('/getIncomingTableAll',  routesController.getIncomingTableAll_POST);
router.post('/getProgramaId',  routesController.getProgramaId_POST);
router.post('/insertRegistroIncoming', middleware.verifyToken, routesController.insertRegistroIncoming_POST);
router.post('/sapInfo',  routesController.sapInfo_POST);
router.post('/insertPrograma',  routesController.insertPrograma_POST);
router.post('/getHistorialIncoming',  routesController.getHistorialIncoming_POST);
router.get('/material', middleware.sspi,  routesController.material_GET);
router.get('/checklist', middleware.sspi,  routesController.checklist_GET);
router.post('/insertCheckListIncoming', middleware.sspi, routesController.insertCheckListIncoming_POST);
router.post('/liberar', middleware.sspi, routesController.liberar_POST);



// router.get('/notificar',middleware.sspi, routesController.notificar_GET);
// router.post('/getCorreosTable',  routesController.getCorreosTable_POST);
// router.post('/getAllCorreos',  routesController.getAllCorreos_POST);
// router.post('/insertCorreo',  routesController.insertCorreo_POST);
// router.post('/deleteCorreo',  routesController.deleteCorreo_POST);



module.exports = router;