import AwsSES from './AwsSES'
import moment from 'moment'
import sendingMailNotifications from './Notification'

export default function startCron(app, sendAll = false){

  console.log("Started cron ");
  try{

    const ses = new AwsSES();

    sendingMailNotifications(app, ses, sendAll);
  
  } catch(e){
    console.log('error');
    console.log(e);
  }  
  console.log("Finished cron");
}

async function tracksNotifications(app, sendAll){

  let trackModel = app.getModel("Track");

  var users = [];

  const allTracks = await trackModel.find();
  const allUsers = await app.getModel("User").find({
    '_id': { $in: allTracks.map(x => x.user)}
  });

  const allProducts = await app.getModel("Product").find({
    '_id': { $in: allTracks.map(x => x.product)}
  });


  var type;


  for(var i=0; i<allTracks.length; i++ ){
    var track = allTracks[i];
    let product = track.product+"";
    var user = track.user+"";
    //check for user notify settings
    var userObj = allUsers.filter(x => (x._id+"" == user))[0];

    var subscription = userObj.subscription;

    type = track.updates;


    if(track.last_notified == undefined){
      updateLastNotified(app, "Track", track._id);
      break;
    }

    var last_notified = moment(track.last_notified);

    if(!sendAll){
      if(subscription == "none"){
        continue;
      }

      if(subscription == "weekly" && last_notified.diff(moment(), "weeks") < 1){
          continue;
      }

      if(subscription == "monthly" && last_notified.diff(moment(), "months") < 1){
          continue;
      }
    }

    var productObj = allProducts.filter(x => x._id +"" == product)[0];

    if(productObj != null){
      var isTracked = false;
      var extraMessage = "";

      if(type == 1){
        if(productObj.old_price !== productObj.price ){
          isTracked = true;
          extraMessage = " <b> New price : </b> " + productObj.price + " $";
        }
      } else if(type == 2){
        //rebate check
        // extraMessage = "Rebate changed";
      } else if(type == 3){
        isTracked = true;
      }

      var isModified = (moment(productObj.updated_at) > last_notified);

      if(!isModified){
        isTracked = false;
      }

      if(isTracked){

        if(userObj){
          console.log("Track notifications : " + productObj.name);

          let email = userObj.email;

          // let email = "aldi5991@gmail.com";

          console.log(productObj.old_product)
          if(productObj.old_product != undefined){
            var oldProduct = JSON.parse(productObj.old_product);

            if(productObj.name != oldProduct.name){
              extraMessage += "<br/> <b>Name is changed : </b> " + productObj.name;
            }

            if(productObj.part != oldProduct.part){
              extraMessage += "<br/> <b>Part is changed : </b> "  + productObj.part;
            }

            if(productObj.certificate.reference != oldProduct.certificate){
              extraMessage += "<br/> <b> Certificate is changed </b> ";
            }

          }

          console.log(extraMessage);

          notify(email, "Track Updates : " + productObj.name, "Product " + productObj.name + " is updated." + extraMessage);

          updateLastNotified(app, "Track", track._id);
        }

        users.push(user);
      }
    }

  }
}

async function aircraftNotifications(app, sendAll){

    let AircraftModelResultSet = await app.getModel("Aircraft").find();
    let ProductsResultSet = await app.getModel("Product").find();

    let UsersResultSet = await app.getModel("User").find({
      _id:{
        $in: AircraftModelResultSet.map(x => x.user)
      }
    });

    var updatedProducts = [];

    for(var i=0; i<AircraftModelResultSet.length;i++){
      let currentAircraftModel = AircraftModelResultSet[i];
      // console.log(currentAircraftModel)
      let aircraftUser = currentAircraftModel.user + "";
      let userObj = UsersResultSet.filter(x=> x._id+"" == aircraftUser)[0];
      let aircraft = currentAircraftModel.aircraft_model;
      var categories = [];

      if(currentAircraftModel.categories != undefined){
        categories = currentAircraftModel.categories.filter(x => x.updates != 0);
      }

      let frequency = currentAircraftModel.frequency;
      //0,1,2
      var filterProductByApproved = currentAircraftModel.products;

      if(currentAircraftModel.last_notified == undefined){
        updateLastNotified(app, "Aircraft", currentAircraftModel._id);
        break;
      }

      let lastNotify = moment(currentAircraftModel.last_notified);


      if(!sendAll){
        if(lastNotify == undefined){
          lastNotify = moment();
          return;
        } else {
          //none
          if(frequency == 0){
            return;
          //weekly
          } else if(frequency == 2){
            if(lastNotify.diff(moment(), "weeks") < 0){
              return;
            }
            //monthly
          } else if(frequency == 3){
            if(lastNotify.diff(moment(), "months") < 0){
              return "";
            }
          }
        }
      }
      //categories
      //active 1
      //price 2
      //rebate 4
      //none 0
      //7 all
    for(var i=0; i<categories.length; i++){

      let filteredProducts = ProductsResultSet.filter(x => {

        var isRelated = false;

        if(filterProductByApproved == 1){
          isRelated = x.approved_aircraft_models.includes(aircraft+"");
        } else if(filterProductByApproved == 2) {
          isRelated = x.aircraft_models.includes(aircraft+"");
        } else if(filterProductByApproved == 3){
          isRelated = (x.approved_aircraft_models.includes(aircraft+"") || x.aircraft_models.includes(aircraft+""));
        }

        let existsInCategories = x.categories.includes((categories[i].category+""));

        // existsInCategories = true;

        let priceChanges = true;
        let rebateChanges = true;
        let isModified = moment(x.updated_at) > lastNotify;

        if(categories[i].updates == 2){
          priceChanges = (x.price != x.old_price || x.old_price == undefined);
        } else if(categories[i].updates == 4){
          rebateChanges = false;
        }

        return isRelated && existsInCategories && isModified && rebateChanges && priceChanges;
      });

      filteredProducts.forEach(product => {
          if(!updatedProducts.includes(product._id+"")){
            updatedProducts.push(product._id+"");
            var extraMessage = "";

            if(product.old_product != undefined){
              var oldProduct = JSON.parse(product.old_product);

              if(product.price != oldProduct.price){
                extraMessage += "<br/> <b>Price is changed : </b> " + product.price + " $";
              }

              if(product.name != oldProduct.name){
                extraMessage += "<br/> <b>Name is changed : </b> " + product.name;
              }

              if(product.part != oldProduct.part){
                extraMessage += "<br/> <b>Part is changed : </b> "  + product.part;
              }

              if(product.certificate.reference != oldProduct.certificate){
                extraMessage += "<br/> <b> Certificate is changed </b> ";
              }

            }

            console.log("Aircraft notifications" + product.name);
            notify(userObj.email, "Product updated "+product.name, "Product is updated. " + extraMessage);
            updateLastNotified(app, "Aircraft", currentAircraftModel._id);
          }
        });
      }
    }

}

function notify(user, template, subject){
  // return "";
  const ses = new AwsSES();
	console.log(user);  
// call sesClient to send an email
  // ses.send(user, template, subject);
}

function updateLastNotified(app, model, id){
  app.getModel(model).findByIdAndUpdate(id+"",{"last_notified": moment()}, function(err, result){

    if(err){
        console.log(error)
    }
    else{
        // console.log(result);
    }

  })
}
