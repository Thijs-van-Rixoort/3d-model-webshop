import express from 'express';
import * as registration from '../src/controllers/registration';
import { MailingListController } from '../src/controllers/mailing-list';
import { ProductInactiveController } from '../src/controllers/product-inactive';
import { ProductController } from './controllers/product';
import { ShoppingCartController } from '../src/controllers/shopping-cart';
import { ContactController } from '../src/controllers/contact';
import * as user from '../src/controllers/coolertesting'
import * as userverify from '../src/controllers/session-verifyCT'
require("dotenv").config();

const LIVE_SERVER_PORT: string = process.env.LIVE_SERVER_PORT!;

const app = express();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', `http://127.0.0.1:${LIVE_SERVER_PORT}`);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', "true");
  next();
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// ENDPOINTS //
// Products
/**
 * Adds a product to the database.
 * @author Thijs van Rixoort
 */
app.post("/addProduct", (req: express.Request, res: express.Response) => {
  new ProductController().addProduct(req, res);
});

/**
 * Gets a specific product from the database. Should have been a "GET" request.
 * @author Thijs van Rixoort
 */
app.get("/getSingleProduct/:id", (req: express.Request, res: express.Response) => {
  new ProductController().getProduct(req, res);
});

/**
 * Gets all the products that are stored in the database and active.
 * @author Thijs van Rixoort
 */
app.get("/getAllProducts", (req: express.Request, res: express.Response) => {
  new ProductController().getProducts(res);
});

/**
 * Set a products active status to inactive.
 * @author Jacky Schoen
 */
app.put("/setProductInactive", (request: express.Request, response: express.Response): void => {
  let productInactiveController: ProductInactiveController = new ProductInactiveController(request);
  productInactiveController.checkIfProductExists(response);
});

// Mailing List
/**
 * Adds a new email entry to the newsletter mailing list.
 * @author Jacky Schoen
 */
app.post("/addEmailToMailingList", (request: express.Request, response: express.Response): void => {
  let mailingListController: MailingListController = new MailingListController(request);
  mailingListController.checkResultLength(response);
});

// Contact Form
/**
 * Adds a new contact form submission.
 * @author Jacky Schoen
 */
app.post("/addContactMessage", (request: express.Request, response: express.Response): void => {
  let contactController: ContactController = new ContactController(request);
  contactController.addContactMessage(response);
});

// Shopping Cart
/**
 * Deletes a product from the shopping cart. 
 * @author Jacky Schoen
 */
app.delete("/removeFromShoppingCart", (request: express.Request, response: express.Response): void => {
  let shoppingCartController: ShoppingCartController = new ShoppingCartController(request);
  shoppingCartController.checkIfProductExist(response);
});

// Registration
/**
 * adds users to the database
 * @author Ömer Aynaci
 */
app.post("/addUser", (req, res) => {
  registration.addUser(req, res);
})

// Registration
/**
 * gets all users from the database
 * @author Ömer Aynaci
 */
app.get("/getAllUsers", (req, res) => {
  registration.getAllUsers(req, res);
})






//cool testing me!
app.get("/loginUser", (req, res) => {
  user.getusers(req, res)
});

//cool testing me!
app.get("/verifyUser", (req, res) => {
  userverify.verifyuser(req, res)
});






// set port, listen for requests
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});