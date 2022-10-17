
const nodeMailer = require('nodeMailer');
const middleware = {};


  // middleware.transport = nodeMailer.createTransport({
  //       host: 'smtp.gmail.com',
  //       secure: false,
  //       port: 465,
  //       secure:true,
  //       auth:{
  //         user: "del.tristone@gmail.com",
  //         pass: "MX11Tri!11"
  //       }
    
  //     });
	  
	  
	   middleware.transport = nodeMailer.createTransport({
		host: '10.57.199.133',
        from: 'noreply@tristone.com',
		secureConnection: false,
		port: 25,
		transportMethod: 'SMTP',
    
      });


module.exports = middleware;
