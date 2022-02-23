
import fs from 'fs-extra';
import csv from 'csv-parser';
import fileSystem from 'fs';
import { permalink } from './utils';

const FILE_DIR = 'import_csv';
const FILES_PATH = {
	"certificate" : "certificates.csv",
	"product" : "products.csv",
	"manufacturer" : "manufacturers.csv",
	'rebates' : 'rebates.csv',
	'engines_make' : 'engines_make.csv',
	'engines' : 'engines.csv',
	'aircraft_makes' : 'aircraft_makes.csv',
	'aircraft_models' : 'aircraft_models.csv'
};

export default class BulkDataImporter {

	executeImport(app){
		this.logger("Start bulk import");
		
		this.app = app;

		// const EngineMakeModel = app.getModel("EngineMake");
		// this.startEnginesMakesImport(app, EngineMakeModel);

		const AircraftMake = app.getModel('AircraftMake');
		this.startAircraftMakesImport(app, AircraftMake);

		// const ManufacturerModel = app.getModel("Manufacturer");
		// this.startManufacturersImport(app, ManufacturerModel);

	}

	startAircraftMakesImport(app, AircraftMake){
		const filePath = this.getCsvFilePath("aircraft_makes");

		this.truncateCollection(AircraftMake);
		this.logger("Importing from aircraft_makes file : " + filePath);

	    fs.createReadStream(filePath)
	    .pipe(csv())
	    .on('data', (row) => {

	      this.insertAircraftMake(Object.values(row), AircraftMake);

	    })
	    .on('end', () => {
	      console.log('AircraftMake CSV file successfully processed');

	      this.startAircraftModelImport(this.app, this.app.getModel("AircraftModel"));
	    });
	}

	startAircraftModelImport(app, AircraftModel){
		const filePath = this.getCsvFilePath("aircraft_models");

		this.truncateCollection(AircraftModel);
		this.logger("Importing from engines makes file : " + filePath);

	    fs.createReadStream(filePath)
	    .pipe(csv())
	    .on('data', (row) => {

	      this.insertAircraftModel(Object.values(row), AircraftModel);

	    })
	    .on('end', () => {
	      console.log('AircraftModel CSV file successfully processed');
	    });
	}

	startEnginesMakesImport(app, EngineMakeModel){
		const filePath = this.getCsvFilePath("engines_make");

		this.truncateCollection(EngineMakeModel);
		this.logger("Importing from engines makes file : " + filePath);

	    fs.createReadStream(filePath)
	    .pipe(csv())
	    .on('data', (row) => {

	      this.insertEngineMake(Object.values(row), EngineMakeModel);

	    })
	    .on('end', () => {
	      console.log('EngineMake CSV file successfully processed');

	      this.startEnginesModelImport(this.app, this.app.getModel("EngineModel"));
	    });
	}

	startEnginesModelImport(app, EngineModel){
		const filePath = this.getCsvFilePath("engines");

		this.truncateCollection(EngineModel);
		this.logger("Importing from engines makes file : " + filePath);

	    fs.createReadStream(filePath)
	    .pipe(csv())
	    .on('data', (row) => {

	      this.insertEngine(Object.values(row), EngineModel);

	    })
	    .on('end', () => {
	      console.log('Engines CSV file successfully processed');
	    });
	}

	

	startManufacturersImport(app, ManufacturerModel){
		const filePath = this.getCsvFilePath("manufacturer");

		this.truncateCollection(ManufacturerModel);
		this.logger("Importing from manufacturer file : " + filePath);

	    fs.createReadStream(filePath)
	    .pipe(csv())
	    .on('data', (row) => {
	      
	      this.insertSingleManufacturer(Object.values(row), ManufacturerModel);

	    })
	    .on('end', () => {
	      console.log('Manufacturer CSV file successfully processed');

		  this.startCertificatesImport(this.app, this.app.getModel("Certificate"));
	    });
	}

	startCertificatesImport(app, CertificateModel){

		const filePath = this.getCsvFilePath("certificate");
		
		this.truncateCollection(CertificateModel);
		this.logger("Importing from certificates file : " + filePath);

	    fs.createReadStream(filePath)
	    .pipe(csv())
	    .on('data', (row) => {

	      this.insertSingleCertificate(Object.values(row), CertificateModel);

	    })
	    .on('end', () => {
	      console.log('Certificate CSV file successfully processed');

	      this.startProductsImport(this.app, this.app.getModel("Product"));
	    });
	}

	startProductsImport(app, ProductModel){
		const filePath = this.getCsvFilePath("product");

		this.truncateCollection(ProductModel);

		this.logger("Importing from products file : " + filePath);

	    fs.createReadStream(filePath)
	    .pipe(csv())
	    .on('data', (row) => {
	      
	      this.insertSingleProduct(Object.values(row), ProductModel);

	    })
	    .on('end', () => {
	      this.logger('Product CSV file successfully processed');
	    });
	}

	async insertSingleManufacturer(dataArray, ManufacturerModel){
		let name = dataArray[0].trim();
		let products = dataArray[1];
		let nickname = dataArray[2];
		let address = dataArray[3];
		let contact = dataArray[4];
		let rebate = dataArray[5];

		let safe = permalink(name);

		await ManufacturerModel.create({
			name,
			nickname,
			permalink: safe,
			safe
		});

		console.log('MFF inserted');
	}

	async insertEngine(dataArray, EngineModel) {
		let name = dataArray[0].trim();
		let type = dataArray[1].trim(); //lower string
		let cylinders = dataArray[2].trim();
		let engine_make = dataArray[3].trim();
		let certificate = dataArray[4].trim();
		let safe = permalink(name);

		if (engine_make.length > 0) {
			engine_make = await this.app.getModel("EngineMake").findOne({name: engine_make});
		}

		await EngineModel.create({
			name,
			// type,
			certificate,
			cylinders,
			engine_make,
			permalink: safe,
			safe
		});

		console.log('Engine Model inserted');
	}

	async insertAircraftModel(dataArray, AircraftModel) {
		let name = dataArray[0].trim();
		let aircraft_make = dataArray[1].trim();
		let model = dataArray[2].trim();
		
		let certificates_names = dataArray[3].trim();
		let certificates = [];
		
		let products_names = dataArray[4].trim();
		let engine_make = dataArray[5].trim();
		let turbo = dataArray[6] == "checked" ? true : false;
		let safe = permalink(name);

		if (engine_make.length > 0) {
			engine_make = await this.app.getModel("EngineMake").findOne({name: engine_make});
		} else {
			engine_make = null;
		}

		if (aircraft_make.length > 0) {
			aircraft_make = await this.app.getModel("AircraftMake").findOne({name: aircraft_make});
		} else {
			aircraft_make = null;
		}

		if (certificates_names.length > 0) {
			certificates = await this.app.getModel("Certificate").find({ name: {
				$in: certificates_names.split(',')
			} })
		}

		let newAircraftModel = await AircraftModel.create({
			name,
			model,
            turbo,
            certificates,
            aircraft_make,
            engine_model: engine_make,
            permalink: safe,
            safe
		});

		if (products_names.length > 0) {
			this.attachAircraftModelToProducts(newAircraftModel, products_names);
		}

		console.log('Aircraft Model inserted');
	}

	async insertEngineMake(dataArray, EngineMakeModel){
		let name = dataArray[0].trim();
		let engineModel = dataArray[1].trim();
		let aircraftModel = dataArray[2].trim();

		let safe = permalink(name);

		await EngineMakeModel.create({
			name,
			permalink: safe,
			safe
		});

		console.log('Engine Make inserted');
	}

	async insertAircraftMake(dataArray, AircraftMake){
		let name = dataArray[0].trim();
		let aircraft = dataArray[1].trim();
		let engine = dataArray[2].trim();

		let safe = permalink(name);

		await AircraftMake.create({
			name,
			permalink: safe,
			safe
		});

		console.log('AircraftMake inserted');
	}

	insertSingleCertificate(dataArray, CertificateModel){
		let name = dataArray[0].trim();
		let products = dataArray[1];
		let ctype = dataArray[2];
		let cid = dataArray[3];
		let makeAndModels = dataArray[7];
		let lastApproved = dataArray[8];

		const safe = permalink(name);

		CertificateModel.create({
			name,
			ctype,
			cid,
			// products,
			// aircraft_makes,
			// aircraft_models,
			// approved_aircraft_models,
			permalink: safe,
			safe
			}).then(newCertificate => {
				let productsQuery = this.explodeProductsForCertificates(dataArray[1].split(','))
				productsQuery.select('_id');

				// execute the query at a later time
				productsQuery.exec(function (err, products) {
					if (err) return err;

					console.log('Link products to certificate');
					
					newCertificate.products = products;
					newCertificate.save();
				})
		})
	}

	attachAircraftMakeToProducts(){

	}

	attachAircraftModelToProducts(aircraftModel, products_names){

		products_names = products_names.split(',').map(x => x.trim());

		for (var i = products_names.length - 1; i >= 0; i--) {
			console.log(products_names[i]);

			this.app.getModel("Product").findOne({name: products_names[i]}).then(pr => {
				if (pr) {
					console.log("Aircraft attached to product" + pr.name);
					pr.aircraft_models.push(aircraftModel);
					pr.save();
				}
			})
		}
	}

	async insertSingleProduct(dataArray, ProductModel){
      let name = dataArray[0].trim();
      let manufacturerName = dataArray[1].trim();
      let part = dataArray[2];
      let price = dataArray[3];
      //from 4-13 are certificate single for diff type
      let rebate = dataArray[15];
      let certificates = dataArray[16].trim();
      let picture = dataArray[17];
      let retailers = dataArray[18];
      let safe = permalink(name);

      let manufacturer = null;
      if (manufacturerName.length > 0) {
      	manufacturer = await this.app.getModel("Manufacturer").findOne({name: manufacturerName});
      }

      if (certificates.length > 0) {
      	certificates = await this.app.getModel("Certificate").find({name : { $in:  certificates.split(',') }});
      } else {
      	certificates = [];
      }

      // console.log('CFF');
      console.log('Found ' + certificates.length + ' certificates for product : ' + name);

      // console.log('MFF' + manufacturer);

      ProductModel.create({
        name,
        part,
        price,
        manufacturer,
        certificates,
        permalink: safe,
        safe
      });
	}

	explodeProductsForCertificates(products, app){
		products = products.map(x => x.trim());

		let query = this.app.getModel('Product').find({ 'name': {$in: products} });

		return query;
	}

	truncateCollection(model){
		model.collection.drop();
	}

	logger(message){
		console.log(message);
	}

	getCsvFilePath(model){
		return FILE_DIR + '\\' + FILES_PATH[model];
	}

}