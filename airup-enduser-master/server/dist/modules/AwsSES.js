"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = require("./utils");
var _awsSdk = _interopRequireDefault(require("aws-sdk"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _swigEmailTemplates = _interopRequireDefault(require("swig-email-templates"));
var _awkSesConfig = _interopRequireDefault(require("../config/awk-ses-config"));
var _path = require("path");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
 * Amazon Simple Email Service
 */
class AwsSES {

  constructor() {
    _awsSdk.default.config.update({
      accessKeyId: _awkSesConfig.default.aws.key,
      secretAccessKey: _awkSesConfig.default.aws.secret,
      region: _awkSesConfig.default.aws.ses.region });


    this.init();

    this.transporter = _nodemailer.default.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SES_USERNAME,
        pass: process.env.SES_PASSWORD } });



    this.template = new _swigEmailTemplates.default({
      juice: {
        images: true } });



  }

  /**
   * Initialize
   */
  init() {
    this.ses = new _awsSdk.default.SES({ apiVersion: '2010-12-01' });
  }

  renderTemplate(path, data) {
    const ref = this;
    return new Promise((resolve, reject) => {
      ref.template.render(path, data, (err, html) => {
        resolve(html);
      });
    });
  }

  async sendResetEmail(to, subject, data) {
    try {

      const path = (0, _path.join)(__dirname, '../app/user/templates/password-reset/submit.html');

      let html = await this.renderTemplate(path, data);

      await this.transporter.sendMail({
        from: `"Aircraft upgrade" ${process.env.SMTP_SENDER}`, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: html // html body
      });
      console.log('Email sent');
    } catch (err) {
      console.log(err);
    }
  }

  async sendConfirmEmail(to, subject, data) {
    try {

      const path = (0, _path.join)(__dirname, '../app/user/templates/password-reset/confirm.html');

      let html = await this.renderTemplate(path, data);

      await this.transporter.sendMail({
        from: `"Aircraft upgrade" ${process.env.SMTP_SENDER}`, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: html // html body
      });
      console.log('Email sent');
    } catch (err) {
      console.log(err);
    }
  }

  async sendThankYouEmailForAdvertisement(to, subject, data = {}) {
    try {

      const path = (0, _path.join)(__dirname, '../app/user/templates/advertisement/thankyouNotice.html');

      let html = await this.renderTemplate(path, data);

      await this.transporter.sendMail({
        from: `"Aircraft Upgrade" ${process.env.SMTP_SENDER}`, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: html // html body
      });
      console.log('Email sent');
    } catch (err) {
      console.log(err);
    }
  }

  async sendEmailAdvertisementNotification(subject, data = {}) {
    try {
      const path = (0, _path.join)(__dirname, '../app/user/templates/advertisement/backendEmailNotice.html');

      let html = await this.renderTemplate(path, data);

      await this.transporter.sendMail({
        from: `"Aircraft Upgrade" ${process.env.SMTP_SENDER}`, // sender address
        to: 'advertising@aircraftupgrade.com', // list of receivers
        subject: subject, // Subject line
        html: html // html body
      });
      console.log('Email sent');
    } catch (Err) {
      console.log(Err);
    }
  }

  /**
   * Send mail
   */
  send(to, subject, message, from) {
    if (!Array.isArray(to)) {
      to = [to];
    }
    const params = {
      Destination: {
        ToAddresses: to },

      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: message }

          /* replace Html attribute with the following if you want to send plain text emails.
          Text: {
              Charset: "UTF-8",
              Data: message
          }
          */ },

        Subject: {
          Charset: 'UTF-8',
          Data: subject } },


      ReturnPath: from ? from : _awkSesConfig.default.aws.ses.from.default,
      Source: from ? from : _awkSesConfig.default.aws.ses.from.default };


    this.ses.sendEmail(params, (err, data) => {
      if (err) {
        return console.log(err, err.stack);
      } else {
        console.log("Email sent.", data);
      }
    });
  }

  getStatistics() {
    return this.ses.getSendStatistics();
  }

  createTemplate(params) {
    this.ses.createTemplate(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else console.log(data); // successful response
    });
  }

  updateTemplate(params) {
    this.ses.updateTemplate(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else console.log(data); // successful response
    });
  }

  /**
   * Send mail
   */
  sendTemplate(to, template, TemplateData) {
    if (!Array.isArray(to)) {
      to = [to];
    }
    const params = {
      Destination: {
        ToAddresses: to },

      Template: template, /* required */
      TemplateData: TemplateData, /* required */
      ReturnPath: _awkSesConfig.default.aws.ses.from.default,
      Source: _awkSesConfig.default.aws.ses.from.default };


    this.ses.sendTemplatedEmail(params, (err, data) => {
      if (err) {
        return console.log(err, err.stack);
      } else {
        console.log("Email sent.", data);
      }
    });
  }

  getNotificationMailTemplate() {
    //replace body parameter when this template is used
    var template = '<!DOCTYPE html>' +
    '<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">' +
    '<head>' +
    ' <meta charset="utf-8"> <!-- utf-8 works for most cases -->' +
    ' <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn\'t be necessary -->' +
    ' <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->' +
    ' <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->' +
    ' <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->' +
    '' +
    ' <link href="https://fonts.googleapis.com/css?family=Baloo+Bhaina+2|Roboto&display=swap" rel="stylesheet">' +
    '' +
    ' <!-- CSS Reset : BEGIN -->' +
    ' <style> @import url(\'https://fonts.googleapis.com/css?family=Oswald|Hind&display=swap\');@import url(\'https://fonts.googleapis.com/css?family=Didact+Gothic|Hind|Nunito+Sans&display=swap\');' +

    '@font-face {' +
    'font-family: Futura; src: url(http://aircraft.idev.al/api/fonts/futura/medium.woff);' +
    '}' +
    '   /* What it does: Remove spaces around the email design added by some email clients. */' +
    '   /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */' +
    '   html,' +
    '   body {' +
    '     margin: 0 auto !important;' +
    '     padding: 0 !important;' +
    '     height: 100% !important;' +
    '     width: 100% !important;' +
    '   }' +
    '' +
    '   /* What it does: Stops email clients resizing small text. */' +
    '   * {' +
    '     -ms-text-size-adjust: 100%;' +
    '     -webkit-text-size-adjust: 100%;' +
    '   }' +
    '' +
    '   /* What it does: Centers email on Android 4.4 */' +
    '   div[style*="margin: 16px 0"] {' +
    '     margin: 0 !important;' +
    '   }' +
    '' +
    '   /* What it does: Stops Outlook from adding extra spacing to tables. */' +
    '   table,' +
    '   td {' +
    '     mso-table-lspace: 0pt !important;' +
    '     mso-table-rspace: 0pt !important;' +
    '   }' +
    '' +
    '   /* What it does: Fixes webkit padding issue. */' +
    '   table {' +
    '     border-spacing: 0 !important;' +
    '     border-collapse: collapse !important;' +
    '     table-layout: fixed !important;' +
    '     margin: 0 auto !important;' +
    '   }' +
    '' +
    '   /* What it does: Uses a better rendering method when resizing images in IE. */' +
    '   img {' +
    '     -ms-interpolation-mode:bicubic;' +
    '   }' +
    '' +
    '   /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */' +
    '   a {' +
    '     text-decoration: none;' +
    '   }' +
    '' +
    '   /* What it does: A work-around for email clients meddling in triggered links. */' +
    '   *[x-apple-data-detectors],  /* iOS */' +
    '   .unstyle-auto-detected-links *,' +
    '   .aBn {' +
    '     border-bottom: 0 !important;' +
    '     cursor: default !important;' +
    '     color: inherit !important;' +
    '     text-decoration: none !important;' +
    '     font-size: inherit !important;' +
    '     font-family: inherit !important;' +
    '     font-weight: inherit !important;' +
    '     line-height: inherit !important;' +
    '   }' +
    '' +
    '   /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */' +
    '   .a6S {' +
    '     display: none !important;' +
    '     opacity: 0.01 !important;' +
    '   }' +
    '' +
    '   /* What it does: Prevents Gmail from changing the text color in conversation threads. */' +
    '   .im {' +
    '     color: inherit !important;' +
    '   }' +
    '' +
    '   /* If the above doesn\'t work, add a .g-img class to any image in question. */' +
    '   img.g-img + div {' +
    '     display: none !important;' +
    '   }' +
    '' +
    '   /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */' +
    '   /* Create one of these media queries for each additional viewport size you\'d like to fix */' +
    '' +
    '   /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */' +
    '   @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {' +
    '     u ~ div .email-container {' +
    '       min-width: 320px !important;' +
    '     }' +
    '   }' +
    '   /* iPhone 6, 6S, 7, 8, and X */' +
    '   @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {' +
    '     u ~ div .email-container {' +
    '       min-width: 375px !important;' +
    '     }' +
    '   }' +
    '   /* iPhone 6+, 7+, and 8+ */' +
    '   @media only screen and (min-device-width: 414px) {' +
    '     u ~ div .email-container {' +
    '       min-width: 414px !important;' +
    '     }' +
    '   }' +
    '' +
    '' +
    ' </style>' +
    '' +
    ' <!-- CSS Reset : END -->' +
    '' +
    ' <!-- Progressive Enhancements : BEGIN -->' +
    ' <style>' +
    '' +
    '   .primary{' +
    '     background: #f5564e;' +
    '   }' +
    '   .bg_white{' +
    '     background: #ffffff;' +
    '   }' +
    '   .bg_light{' +
    '     background: #fafafa;' +
    '   }' +
    '   .bg_black{' +
    '     background: #000000;' +
    '   }' +
    '   .bg_dark{' +
    '     background: rgba(0,0,0,.8);' +
    '   }' +
    '   .email-section{' +
    '     padding:2.5em;' +
    '   }' +
    '' +
    '   /*BUTTON*/' +
    '   .btn{' +
    '     padding: 5px 15px;' +
    '     display: inline-block;' +
    '   }' +
    '   .btn.btn-primary{' +
    '     border-radius: 5px;' +
    '     background: #f5564e;' +
    '     color: #ffffff;' +
    '   }' +
    '   .btn.btn-white{' +
    '     border-radius: 5px;' +
    '     background: #ffffff;' +
    '     color: #000000;' +
    '   }' +
    '   .btn.btn-white-outline{' +
    '     border-radius: 5px;' +
    '     background: transparent;' +
    '     border: 1px solid #fff;' +
    '     color: #fff;' +
    '   }' +
    '' +
    '   h1,h2,h3,h4,h5,h6{' +
    '     font-family: \'Hind\', sans-serif;' +
    '     color: #000000;' +
    '     margin-top: 0;' +
    '   }' +
    '' +
    '   body{' +
    '     font-family: \'Hind\', sans-serif;' +
    '     font-weight: 400;' +
    '     font-size: 15px;' +
    '     line-height: 1.8;' +
    '     color: rgba(0,0,0,.4);' +
    '   } p { font-family: \'Hind\', sans-serif; }' +
    '' +
    '   a{' +
    '     color: #f5564e;' +
    '   }' +
    '' +
    '   table{' +
    '   }' +
    '   /*LOGO*/' +
    '' +
    '   .logo h1{' +
    '     margin: 0;' +
    '   }' +
    '   .logo h1 a{' +
    '     color: #000;' +
    '     font-size: 20px;' +
    '     font-weight: 700;' +
    '     text-transform: uppercase;' +
    '     font-family: \'Hind\', sans-serif;' +
    '   }' +
    '' +
    '   .navigation{' +
    '     padding: 0;' +
    '   }' +
    '   .navigation li{' +
    '     list-style: none;' +
    '     display: inline-block;;' +
    '     margin-left: 5px;' +
    '     font-size: 12px;' +
    '     font-weight: 700;' +
    '     text-transform: uppercase;' +
    '   }' +
    '   .navigation li a{' +
    '     color: rgba(0,0,0,.6);' +
    '   }' +
    '' +
    '   /*HERO*/' +
    '   .hero{' +
    '     position: relative;' +
    '     z-index: 0;' +
    '   }' +
    '   .hero .overlay{' +
    '     position: absolute;' +
    '     top: 0;' +
    '     left: 0;' +
    '     right: 0;' +
    '     bottom: 0;' +
    '     content: \'\';' +
    '     width: 100%;' +
    '     background: #000000;' +
    '     z-index: -1;' +
    '     opacity: .3;' +
    '   }' +
    '   .hero .icon{' +
    '   }' +
    '   .hero .icon a{' +
    '     display: block;' +
    '     width: 60px;' +
    '     margin: 0 auto;' +
    '   }' +
    '   .hero .text{' +
    '     color: rgba(255,255,255,.8);' +
    '     padding: 0 4em;' +
    '   }' +
    '   .hero .text h2{' +
    '     color: #ffffff;' +
    '     font-size: 40px;' +
    '     margin-bottom: 0;' +
    '     line-height: 1.2;' +
    '     font-weight: 900;' +
    '   }' +
    '' +
    '' +
    '   /*HEADING SECTION*/' +
    '   .heading-section{' +
    '   }' +
    '   .heading-section h2{' +
    '     color: #000000;' +
    '     font-size: 27px;' +
    '     margin-top: 0;' +
    '     line-height: 1.4;' +
    '     font-weight: 600;' +
    '   }' +
    '   .heading-section .subheading{' +
    '     margin-bottom: 20px !important;' +
    '     display: inline-block;' +
    '     font-size: 13px;' +
    '     text-transform: uppercase;' +
    '     letter-spacing: 2px;' +
    '     color: rgba(0,0,0,.4);' +
    '     position: relative;' +
    '   }' +
    '   .heading-section .subheading::after{' +
    '     position: absolute;' +
    '     left: 0;' +
    '     right: 0;' +
    '     bottom: -10px;' +
    '     content: \'\';' +
    '     width: 100%;' +
    '     height: 2px;' +
    '     background: #f5564e;' +
    '     margin: 0 auto;' +
    '   }' +
    '' +
    '   .heading-section-white{' +
    '     color: rgba(255,255,255,.8);' +
    '   }' +
    '   .heading-section-white h2{' +
    '     font-family: \'Hind\', sans-serif;' +
    '     line-height: 1;' +
    '     padding-bottom: 0;' +
    '   }' +
    '   .heading-section-white h2{' +
    '     color: #ffffff;' +
    '   }' +
    '   .heading-section-white .subheading{' +
    '     margin-bottom: 0;' +
    '     display: inline-block;' +
    '     font-size: 13px;' +
    '     text-transform: uppercase;' +
    '     letter-spacing: 2px;' +
    '     color: rgba(255,255,255,.4);' +
    '   }' +
    '' +
    '' +
    '   .icon{' +
    '     text-align: center;' +
    '   }' +
    '   .icon img{' +
    '   }' +
    '' +
    '' +
    '   /*SERVICES*/' +
    '   .services{' +
    '     background: rgba(0,0,0,.03);' +
    '   }' +
    '   .text-services{' +
    '     padding: 10px 10px 0; ' +
    '     text-align: center;' +
    '   }' +
    '   .text-services h3{' +
    '     font-size: 18px;' +
    '     font-weight: 500;' +
    '     margin-bottom: 0' +
    '   }' +
    '' +
    '   .services-list{' +
    '     padding: 0;' +
    '     margin: 0 0 10px 0;' +
    '     width: 100%;' +
    '     float: left;' +
    '   }' +
    '' +
    '   .services-list .text{' +
    '     width: 100%;' +
    '     float: right;' +
    '   }' +
    '   .services-list h3{' +
    '     margin-top: 0;' +
    '     margin-bottom: 0;' +
    '     font-size: 18px;' +
    '   }' +
    '   .services-list p{' +
    '     margin: 0;' +
    '   }' +
    '' +
    '' +
    '   /*DESTINATION*/' +
    '   .text-tour{' +
    '     padding-top: 10px;' +
    '   }' +
    '   .text-tour h3{' +
    '     margin-bottom: 0;' +
    '   }' +
    '   .text-tour h3 a{' +
    '     color: #000;' +
    '   }' +
    '' +
    '   /*BLOG*/' +
    '   .text-services .meta{' +
    '     text-transform: uppercase;' +
    '     font-size: 14px;' +
    '   }' +
    '' +
    '   /*TESTIMONY*/' +
    '   .text-testimony .name{' +
    '     margin: 0;' +
    '   }' +
    '   .text-testimony .position{' +
    '     color: rgba(0,0,0,.3);' +
    '' +
    '   }' +
    '' +
    '' +
    '   /*COUNTER*/' +
    '   .counter{' +
    '     width: 100%;' +
    '     position: relative;' +
    '     z-index: 0;' +
    '   }' +
    '   .counter .overlay{' +
    '     position: absolute;' +
    '     top: 0;' +
    '     left: 0;' +
    '     right: 0;' +
    '     bottom: 0;' +
    '     content: \'\';' +
    '     width: 100%;' +
    '     background: #000000;' +
    '     z-index: -1;' +
    '     opacity: .3;' +
    '   }' +
    '   .counter-text{' +
    '     text-align: center;' +
    '   }' +
    '   .counter-text .num{' +
    '     display: block;' +
    '     color: #ffffff;' +
    '     font-size: 34px;' +
    '     font-weight: 700;' +
    '   }' +
    '   .counter-text .name{' +
    '     display: block;' +
    '     color: rgba(255,255,255,.9);' +
    '     font-size: 13px;' +
    '   }' +
    '' +
    '' +
    '   ul.social{' +
    '     padding: 0;' +
    '   }' +
    '   ul.social li{' +
    '     display: inline-block;' +
    '   }' +
    '' +
    '   /*FOOTER*/' +
    '' +
    '   .footer{' +
    '     color: rgba(255,255,255,.5);' +
    '' +
    '   }' +
    '   .footer .heading{' +
    '     color: #ffffff;' +
    '     font-size: 20px;' +
    '   }' +
    '   .footer ul{' +
    '     margin: 0;' +
    '     padding: 0;' +
    '   }' +
    '   .footer ul li{' +
    '     list-style: none;' +
    '     margin-bottom: 10px;' +
    '   }' +
    '   .footer ul li a{' +
    '     color: rgba(255,255,255,1);' +
    '   }' +
    '' +
    '' +
    '   .product-component{' +
    '     border-collapse: separate !important;' +
    '     border: 3px solid #8eb3c7;' +
    '     border-radius: 6px;' +
    '   }' +
    '' +
    '   .product-component .description{' +
    '         font-size: 14px;' +
    '         font-weight: 500;' +
    '         line-height: 16px;' +
    '         color: #32424e;' +
    '               max-height:98px; overflow:hidden;font-family:\'Hind\', sans-serif; ' +
    '   }' +
    '' +
    '   .product-component .product-img{' +
    '     position: absolute;' +
    '     left: 120px;' +
    '   }' +
    '' +
    '   .badge{' +
    '     background: #cf2f37;' +
    '     color:#fff;' +
    '     font-weight: 500;' +
    '     padding: 3px 6px;' +
    '     border-radius: 5px;' +
    '     font-size: 12px;' +
    '     vertical-align: middle;margin-right:5px' +
    '   }' +
    '' +
    '   @media screen and (max-width: 500px) {' +
    '' +
    '     .icon{' +
    '       text-align: left;' +
    '     }' +
    '' +
    '     .text-services{' +
    '       padding-left: 0;' +
    '       padding-right: 20px;' +
    '       text-align: left;' +
    '     }' +
    '' +
    '   }' +
    '' +
    '' +
    ' </style>' +
    '</head>' +
    '' +
    '<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; ">' +
    ' <center style="width: 100%; background-color: #f1f1f1;">' +
    '   <div style="max-width: 800px; margin: 0 auto;" class="email-container">' +
    '     <!-- BEGIN BODY -->' +
    '     <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">' +
    '       <tr >' +
    '         <td valign="middle" class="hero bg_white" style="background-color: #152835; background-size: cover; height: 200px;">' +
    '           <div class="overlay"></div>' +
    '           <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">' +
    '             <tr>' +
    '               <td style="text-align: center;padding-top: 30px;padding-bottom: 30px">' +
    '                 <h2 style="font-weight: 500;letter-spacing: 0.3cm;color: #ffffff;font-size: 40px;margin-bottom: 0;line-height: 1.2;">Aircraft</h2>' +
    '                   <h3 style="color: #cf2f37;letter-spacing: 0.5cm;margin-top: 0; margin-left: 5px">UPGRADE</h3>' +
    '               </td>' +
    '             </tr>' +
    '           </table>' +
    '         </td>' +
    '       </tr><!-- end tr -->' +
    '        {{ body }}' +
    '     </table>' +
    '' +
    '   </div>' +
    ' </center>' +
    '</body>' +
    '</html>';

    return template;
  }


  async triggerCertificateProductUpdate(app, certificate, product) {
    //get track resources from db
    const allTracks = await app.getModel("Track").find({
      product: product._id });


    //get some helper resources
    const allUsers = await app.getModel("User").find({
      '_id': { $in: allTracks.map((x) => x.user) } });


    for (var i = 0; i < allTracks.length; i++) {
      //get track obj
      let track = allTracks[i];
      //find track user
      let user = allUsers.filter((x) => (0, _utils.formatModelIdToString)(x._id) == (0, _utils.formatModelIdToString)(track.user))[0];

      console.log(user.email);

      let emailMessage = 'A ' + certificate.name + ' certificate is associated to the product ' + product.name;
      let body = '<tr><td class="bg_white"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td class="bg_white"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td class="bg_white email-section"><div class="heading-section">' + emailMessage + '</div></td></tr></table></td></tr>';
      this.sendTemplate("anxheloakrobati16@gmail.com", "TRACK_PRODUCT", JSON.stringify({ body }));
    }
  }}exports.default = AwsSES;