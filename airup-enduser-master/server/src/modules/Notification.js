import moment from 'moment'
import { formatModelIdToString } from './utils'

var allMedia;
var allManufacturers;
var allTracks;
var ProductsResultSet;

export default async function sendingMailNotifications(app, ses, sendAll = false) {

  allTracks = [];

  var usersNotified = {
    price_changes: [],
    rebates: []
  };

  let aircraftModifiedProducts = await aircraftNotifications(app, sendAll);

  const allRebates = await app.getModel("Rebate").find();

  var trackProcess = tracksNotifications(app, sendAll);

  trackProcess.then(modifiedProducts => {
    
    let priceChangesTemplate = priceChangesHeadingTemplate();
    let rebatesTemplate = rebatesHeadingsTemplate();
    let faaApprovedTemplate = ffApprovedProductsHeadingsTemplate();

    modifiedProducts.faa_approved_products = modifiedProducts.faa_approved_products.concat(aircraftModifiedProducts.faa_approved_products);
    modifiedProducts.price_changes = modifiedProducts.price_changes.concat(aircraftModifiedProducts.price_changes);
    modifiedProducts.rebates = modifiedProducts.rebates.concat(aircraftModifiedProducts.rebates);

    //new products
    for (var i = 0; i < modifiedProducts.faa_approved_products.length; i++) {
      let currentObj = modifiedProducts.faa_approved_products[i];

      let current = currentObj.product;
      var user = currentObj.user;

      if (allTracks[user.email] == undefined) {
        allTracks[user.email] = faaApprovedTemplate;
      }

      let productTemplate = productComponentTemplate(current, 'faapproved_product', currentObj.manufacturer, currentObj.media);

      allTracks[user.email] += productTemplate;
    }

    //price changes products
    for (var i = 0; i < modifiedProducts.price_changes.length; i++) {
      let currentObj = modifiedProducts.price_changes[i];

      let current = currentObj.product;
      var user = currentObj.user;

      if (allTracks[user.email] == undefined) {
        allTracks[user.email] = priceChangesTemplate;
        usersNotified.price_changes.push(user.email);
      } else {
        if (!usersNotified.price_changes.includes(user.email)) {
          allTracks[user.email] += priceChangesTemplate;
          usersNotified.price_changes.push(user.email);
        }
      }

      let productTemplate = productComponentTemplate(current, 'price_changes', currentObj.manufacturer, currentObj.media);

      allTracks[user.email] += productTemplate;
    }

    //rebates  products
    for (var i = 0; i < modifiedProducts.rebates.length; i++) {
      let currentObj = modifiedProducts.rebates[i];

      let current = currentObj.product;
      var user = currentObj.user;

      if (allTracks[user.email] == undefined) {
        allTracks[user.email] = rebatesTemplate;
        usersNotified.rebates.push(user.email);
      } else {
        if (!usersNotified.rebates.includes(user.email)) {
          allTracks[user.email] += rebatesTemplate;
          usersNotified.rebates.push(user.email);
        }
      }


      let rebate = current.rebate;

      if (!rebate) {
        let category = current.categories.filter(x => x.rebate)[0];
        rebate = category.rebate;
      }

      let rebateModel = allRebates.filter(x => (formatModelIdToString(x._id) == formatModelIdToString(rebate)))[0];

      let productTemplate = productComponentTemplate(current, 'rebate', currentObj.manufacturer, currentObj.media, rebateModel.amount);
      allTracks[user.email] += productTemplate;
    }

    let footerTemplate = getFooterTemplate();

    for (var email in allTracks) {
      allTracks[email] += '</table></td></tr>' + footerTemplate;
      try {
        // let email_default = 'anxheloakrobati16@gmail.com';
        ses.sendTemplate(email, "TRACK_PRODUCT", JSON.stringify({ body: allTracks[email] }));
        console.log('send to mail ' + email)
      } catch (e) {
        console.log(e);
      }
    }
  })

}

async function tracksNotifications(app, sendAll = false) {
  //get track resources from db
  const allTracks = await app.getModel("Track").find();
  allMedia = await app.getModel("Media").find();
  allManufacturers = await app.getModel("Manufacturer").find();
  //get some helper resources
  const allUsers = await app.getModel("User").find({
    '_id': { $in: allTracks.map(x => x.user) }
  });

  const allProducts = await app.getModel("Product").find({
    '_id': { $in: allTracks.map(x => x.product) }
  }).populate('categories', 'rebate');

  var modifiedProducts = {
    faa_approved_products: [],
    rebates: [],
    price_changes: []
  };

  for (var i = 0; i < allTracks.length; i++) {
    //get track obj
    let track = allTracks[i];
    //find track user
    let user = allUsers.filter(x => (formatModelIdToString(x._id) == formatModelIdToString(track.user)))[0];

    if (track.last_notified == undefined) {
      updateLastNotified(app, "Track", track._id);
      continue;
    }

    if (!checkIfNotificationAvailable(track, user, sendAll)) {
      continue;
    }

    let product = allProducts.filter(x => formatModelIdToString(x._id) == formatModelIdToString(track.product))[0];

    if (product == null || product == undefined) {
      continue;
    }

    let last_notified = moment(track.last_notified);

    let trackType = getTrackType(product, track.updates, last_notified);
    console.log(trackType)
    if (modifiedProducts[trackType] != undefined) {
      modifiedProducts[trackType].push(getModifiedProductFromTrack(product, user));
    }

    modifiedProducts.faa_approved_products = getNewFFApprovedProducts(allProducts, user, last_notified);

    updateLastNotified(app, "Track", track._id);
  }

  return modifiedProducts;
}

async function aircraftNotifications(app, sendAll = false) {

  let AircraftModelResultSet = await app.getModel("Aircraft").find();
  ProductsResultSet = await app.getModel("Product").find().populate('categories', 'rebate');
  allManufacturers = await app.getModel("Manufacturer").find();
  allMedia = await app.getModel("Media").find();

  let UsersResultSet = await app.getModel("User").find({
    _id: {
      $in: AircraftModelResultSet.map(x => x.user)
    }
  });

  var updatedProducts = [];
  let aircraftLength = AircraftModelResultSet.length;

  var modifiedProducts = {
    faa_approved_products: [],
    rebates: [],
    price_changes: []
  };


  for (var i = 0; i < aircraftLength; i++) {
    let currentAircraftModel = AircraftModelResultSet[i];
    let user = UsersResultSet.filter(x => formatModelIdToString(x.id) == formatModelIdToString(currentAircraftModel.user))[0];
    let aircraft = currentAircraftModel.aircraft_model;
    let categories = currentAircraftModel.categories != undefined ? currentAircraftModel.categories.filter(x => x.updates != 0) : [];
    let frequency = currentAircraftModel.frequency;
    //0,1,2
    let filterProductByApproved = currentAircraftModel.products;

    if (currentAircraftModel.last_notified == undefined) {
      updateLastNotified(app, "Aircraft", currentAircraftModel._id);
      continue;
    }

    let lastNotify = moment(currentAircraftModel.last_notified);

    if (!sendAll) {
      if (lastNotify == undefined) {
        lastNotify = moment();
        return;
      } else {
        //none
        if (frequency == 0) {
          return;
          //weekly
        } else if (frequency == 2) {
          if (lastNotify.diff(moment(), "weeks") < 0) {
            return;
          }
          //monthly
        } else if (frequency == 3) {
          if (lastNotify.diff(moment(), "months") < 0) {
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
    //
    for (var k = 0; k < categories.length; k++) {
      let filteredProducts = findProductsBelongsToAircraft(aircraft, categories[k], lastNotify, filterProductByApproved)

      for (var j = 0; j < filteredProducts.length; j++) {
        var product = filteredProducts[j];

        if (!updatedProducts.includes(product._id + "")) {
          updatedProducts.push(product._id + "");

          var trackType = "";

          if (product.price != product.old_price) {
            trackType = "price_changes";
          }

          if (checkIfRebateProduct(product)) {
            trackType = "rebates";
          }

          //check for rebates;trackType = "rebates";
          if (trackType.length > 0)
            modifiedProducts[trackType].push({
              product: product,
              user: user,
              manufacturer: getProductManufacturer(product),
              media: getProductMediaObject(product)
            })

          updateLastNotified(app, "Aircraft", currentAircraftModel._id);
          break;
        }
      }
    }
  }

  return modifiedProducts;

}

function findProductsBelongsToAircraft(aircraft, category, lastNotify, filterProductByApproved) {

  return ProductsResultSet.filter(x => {

    var isRelated = false;

    if (filterProductByApproved == 1) {
      isRelated = x.approved_aircraft_models.includes(aircraft);
    } else if (filterProductByApproved == 2) {
      isRelated = x.aircraft_models.includes(aircraft);
    } else if (filterProductByApproved == 3) {
      isRelated = (x.approved_aircraft_models.includes(aircraft) || x.aircraft_models.includes(aircraft));
    }

    let existsInCategories = x.categories.includes(formatModelIdToString(category.category));

    // existsInCategories = true;

    let priceChanges = true;
    let rebateChanges = true;
    let isModified = moment(x.updated_at) > lastNotify;

    if (category.updates == 2) {
      priceChanges = (x.price != x.old_price || x.old_price == undefined);
    } else if (category.updates == 4) {
      rebateChanges = false;
    }

    return isRelated && existsInCategories && isModified && rebateChanges && priceChanges;
  });
}

function getModifiedProductFromTrack(product, user) {
  return {
    product: product,
    user: user,
    manufacturer: getProductManufacturer(product),
    media: getProductMediaObject(product)
  };
}

function getNewFFApprovedProducts(allProducts, user, last_notified) {
  //get last created products
  let newCreatedProducts = allProducts.filter(x => moment(x.created_at).isSameOrAfter(moment(last_notified).subtract(1, "months")));
  let formattedNewProducts = [];
  //modifiedProducts.faa_approved_products
  for (var j = 0; j < newCreatedProducts.length; j++) {
    formattedNewProducts.push(getModifiedProductFromTrack(newCreatedProducts[j], user));
    if (j == 4) break;
  }

  return formattedNewProducts;
}

function getTrackType(product, type, last_notified) {
  var trackType = "";
  var isTracked = false;

  if (type == 1) {
    //check for price changes
    if (product.old_price !== product.price) {
      isTracked = true;
      trackType = "price_changes";
    }
  } else if (type == 2) {
    //rebate check
    if (checkIfRebateProduct(product)) {
      trackType = "rebates";
      isTracked = true;
    }
  } else if (type == 3) {
    if (product.old_price !== product.price) {
      isTracked = true;
      trackType = "price_changes";
    }

    if (checkIfRebateProduct(product)) {
      trackType = "rebates";
      isTracked = true;
    }
  }

  // var isModified = (moment(product.updated_at) > last_notified);

  // if(!isModified){
  // 	isTracked = false;
  // }

  if (!isTracked) {
    return "";
  }

  return trackType;
}

function getProductMediaObject(product) {
  var media = {};
  if (product.media.length > 0) {
    media = allMedia.filter(x => formatModelIdToString(x._id) == formatModelIdToString(product.media))[0];
  }

  return media;
}

function getProductManufacturer(product) {
  return allManufacturers.filter(x => (formatModelIdToString(x._id) == formatModelIdToString(product.manufacturer)))[0]
}

function checkIfNotificationAvailable(track, user, sendAll = false) {
  let last_notified = moment(track.last_notified);
  let subscription = user.subscription;

  if (!sendAll) {
    if (subscription == "none") {
      return false;
    }

    if (subscription == "weekly" && last_notified.diff(moment(), "weeks") < 1) {
      return false;
    }

    if (subscription == "monthly" && last_notified.diff(moment(), "months") < 1) {
      return false;
    }
  }

  return true;
}

function updateLastNotified(app, model, id) {
  app.getModel(model).findByIdAndUpdate(id + "", { "last_notified": moment() }, function (err, result) {

    if (err) {
      console.log(error)
    }
    else {
    }

  })
}

function productComponentTemplate(product, type, manufacturer, media, rebate = null) {
  let imageCaption = '';

  if (type == "faapproved_product") {
    imageCaption = 'Released <b> ' + moment(product.created_at).fromNow() + '</b>';
  } else if (type == "rebate") {
    imageCaption = '$ ' + rebate + ' Rebate';
  } else {
    var discount = "";
    if (product.old_product != undefined) {
      let oldProduct = JSON.parse(product.old_product);
      discount = ((parseFloat(oldProduct.price) - parseFloat(product.price)) / (parseFloat(oldProduct.price))) * 100;
      discount = parseFloat(discount).toFixed(2);
    }

    if (discount != "")
      imageCaption = discount + '% OFF';
  }


  let imagePath = getProductImagePath(media);
  //let manufacturer = getProductManufacturer(product.manufacturer);

  var productTemplate = '<tr><td class="bg_white email-section" style="padding-top: 0"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" class="product-component"><tr><td valign="top" width="30%" style="background: #cf2f37;border-top-left-radius: 3px;border-bottom-left-radius: 3px"><table role="presentation" cellspacing="0" cellpadding="10" border="0" width="100%"><tr><td><p class=""><span style="color:#fff;font-size: 15px;font-weight: 600;line-height: 15px;padding-left: 10px">' + imageCaption + ' </span></p><p style="position: relative;"><img class="product-img" style="max-width:120px;margin-left:110px;margin-right:-20px" src="' + imagePath + '"  /></p></td></tr></table></td><td valign="top" width="70%" style="padding-left: 55px;"><table role="presentation" cellspacing="0" cellpadding="10" border="0" width="100%"><tr><td><img src="images/blog-2.jpg" alt="" style="width: 100%; max-width: 600px; height: auto; margin: auto; display: block;"></td></tr><tr><td class="text-services" style="text-align: left;"><h3>' + product.name + '</h3><p class="description" style="margin-bottom: 2px"><span>Manufactured by : ' + manufacturer.name + '</span></p><p class="description" style="margin-top: 0"><span>Part : ' + product.part + ' </span><span style="float: right;">Released : ' + moment(product.created_at).format('DD/MM/YYYY') + ' </span> </p><p style="" class="description"> ' + product.description + ' </p></td></tr></table></td></tr></table></td></tr>'
  return productTemplate;
}

function priceChangesHeadingTemplate() {
  let priceChangesTemplate = '<tr><td class="bg_white"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td class="bg_white"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td class="bg_white email-section"><div class="heading-section" ><h2><span style="" class="badge" align="center">Sales</span>Price Changes</h2></div></td></tr></table></td></tr>';
  return priceChangesTemplate;
}

function rebatesHeadingsTemplate() {
  let rebatesTemplate = '<tr><td class="bg_white"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td class="bg_white"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td class="bg_white email-section"><div class="heading-section" ><h2><span style="font-weight:600;font-size:13px" class="badge" align="center">Rebates</span>New Rebates</h2></div></td></tr></table></td></tr>';
  return rebatesTemplate;
}

function ffApprovedProductsHeadingsTemplate() {
  var faaApprovedTemplate = '<tr><td class="bg_white"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td class="bg_white"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td class="bg_white email-section"><div class="heading-section" ><h2><span style="" class="badge" align="center">NEW</span>FAA-Approved Products</h2></div></td></tr></table></td></tr>';
  return faaApprovedTemplate;
}

function getProductImagePath(media) {
  var path = "http://18.216.16.228/data/media/";

  if (media.name != undefined) {

    if (!media.name.includes("photos")) {
      path += "photos/";
    }

    path += media.name;
  }

  return path;
}

function getFooterTemplate() {
  return '<tr> <td class="bg_white email-section" style="padding-top: 0"> <table role="presentation" cellpadding="0" cellspacing="0" width="100%" class=""> <tr> <td valign="top" width="100%" > <table role="presentation" cellspacing="0" cellpadding="10" border="0" width="100%"> <tr> <td class="text-services" style="text-align: left;"> <p style="font-size:15px;color: #000;margin-top: 10px;text-decoration: none;font-family: \'Hind\', sans-serif;" class="description"> There may be more. Please log into your <a href="http://18.216.16.228/" style="color: #6b9fbc;text-decoration:none">AircraftUpgrade.com</a> account to view the complete list along with the full details of these products and their certifications. <br><br></p><a href="http://18.216.16.228/" style="font-size:16px;background: #cf2f37;color:#fff;padding: 8px 16px;border-radius: 6px;margin-top:40px;text-decoration: none;margin-bottom:30px;font-family: \'Hind\', sans-serif;"> Log into Your Account </a> </td></tr></table> </td></tr></table> </td></tr><tr ><td valign="middle" class="hero bg_white" style="background-color: #152835; background-size: cover; height: 100px;"><div class="overlay"></div><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td style="padding-top: 14px;padding-bottom: 14px;padding-left: 20px"><p style="font-weight: 500;letter-spacing: 0.1cm;color: #ffffff;font-size: 30px;margin-bottom: 0;line-height: 1.1;">Aircraft <a href="http://18.216.16.228/" style="float: right; font-size: 15px;letter-spacing: normal;margin-right: 42px;line-height: normal;margin-top: 16px;text-decoration: none;">My Hangar </a> <a href="http://18.216.16.228/" style="float: right; font-size: 15px;text-decoration: none;letter-spacing: normal;margin-right: 10px;line-height: normal;margin-top: 16px;color: #fff">Contact Us | </a> </p><p style="color: #cf2f37;letter-spacing: 0.3cm;margin-top: 0; margin-left: 5px;font-weight: 600;font-size:10px">UPGRADE</p></td></tr></table></td></tr>';
}

function checkIfRebateProduct(product){
  if (product.rebate) {
    if(moment(product.rebate.expiry_date).isSameOrAfter(moment())){
      return true;
    }
  } else {
    return product.categories.filter(x => (x.rebate  &&  moment(x.rebate.expiry_date).isSameOrAfter(moment()))).length > 0
  }

  return false;
}