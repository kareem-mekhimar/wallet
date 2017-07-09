var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var request = require('request');
var rp = require('request-promise');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/', function (req, res, next) {
    var contype = req.headers['content-type'];
    if (contype && contype.indexOf('application/json') !== 0)
        return res.status(415).send({ error: "Unsupported Media Type (" + contype + ")" });
    next();
});

app.use(function (err, req, res, next) {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({ error: 'Bad JSON syntax' });
    }
    next();
});

app.use(expressValidator());

var router = express.Router();

/**
 * @api {put} /wallet Create New Wallet
 * @apiGroup Wallet
 * @apiVersion 1.0.0
 * @apiParam {String} proxyNumber     Mandatory ProxyNumber AKA CardNumber.
 * @apiParam {String} firstName     Mandatory FirstName .
 * @apiParam {String} lastName     Mandatory LastName .
 * @apiParam {String} email     Mandatory Email .
 * @apiParam {String} address     Mandatory Address .
 * @apiParamExample {json} Request-Example:
 *     {
 *      "email":"adsd@sadasd.com",
 *       "proxyNumber" : "5388300003302",
 *        "firstName":"km",
 *        "lastName":"km",
 *        "address":"asdsad"
 *      }
 * 
 *  @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *       "success": "Account has been created successfully!",
 *       "messageCode": "2006",
 *       "walletNumber": "100000003135"
 *    }
 * 
 *   @apiErrorExample {json} Error 
 *     HTTP/1.1 200 OK
 *     {
 *       "error": "Error registering account!",
 *       "messageCode": "4007"
 *     }
 */

router.route("/").put(function (req, res) {
    var body = req.body;

    req.checkBody('proxyNumber', 'Required').notEmpty();
    req.checkBody('proxyNumber', 'Not A Numeric String').matches(new RegExp('^\\d+$'));

    req.checkBody('firstName', 'Required').notEmpty();
    req.checkBody('lastName', 'Required').notEmpty();
    req.checkBody("email", "Email With a Valid Syntax is Required").notEmpty().isEmail();

    req.checkBody("address", "Required").notEmpty();

    res.contentType("application/json");

    var errors = req.validationErrors();

    if (errors) {
        res.status(400).send(errors);
        return;
    } else {

        login().then(function (token) {
            registerAccount(body, token).then(function (result) {
                res.status(200).send(result);
            });
        });

    }
});


/**
 * @api {post} /wallet/load Transfer Money From Master Wallet To Card
 * @apiGroup Wallet
 * @apiVersion 1.0.0
 * @apiParam {String} proxyNumber     Mandatory ProxyNumber AKA CardNumber.
 * @apiParam {Number} amount     Mandatory Amount .
 * @apiParamExample {json} Request-Example:
 *     {
 *       "proxyNumber" : "5388300003302",
 *       "amount" : 44
 *      }
 *  @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "success": "Card has been loaded successfully!",
 *      "messageCode": "2003",
 *      "proxyNumber": "5388300003302",
 *      "amount": "44.00",
 *      "balance": "64.00",
 *      "externalTransactionId": null
 *    }
 * 
 */
router.route("/load").post(function (req, res) {
    var body = req.body;

    req.checkBody('proxyNumber', 'Required').notEmpty();
    req.checkBody('proxyNumber', 'Not A Numeric String').matches(new RegExp('^\\d+$'));

    req.checkBody('amount', 'Required').notEmpty();
    req.checkBody('amount', 'Must Be A valid Number').isNumeric();

    res.contentType("application/json");

    var errors = req.validationErrors();

    if (errors) {
        res.status(400).send(errors);
        return;
    } else {

        login().then(function (token) {
            loadCard(body, token).then(function (result) {
                res.status(200).send(result);
            });
        });

    }
})

function login() {
    var options = {
        method: 'POST',
        uri: 'https://demo.zoompass.com/pm-api/login',
        body: {
            username: "taxiApi",
            password: "tYpc983Ruc7wq"
        },
        json: true
    };

    return rp(options)
        .then(function (parsedBody) {

            return parsedBody.access_token;
        })
        .catch(function (err) {
            return err;
        });
}

function registerAccount(body, token) {
    var options = {
        method: 'GET',
        uri: 'https://demo.zoompass.com/pm-api/registerAccount/?proxyNumber=' + body.proxyNumber + '&firstName=' + body.firstName + '&lastName=' + body.lastName + '&email=' + body.email + '&address=' + body.address + '&city=portsaid&stateProv=AB&country=CA&zipPostal=T0J0B2&clientId=1234',
        headers: {
            "authorization": "Bearer " + token
        }
    };

    return rp(options)
        .then(function (body) {
            return body;
        })
        .catch(function (err) {

            return err;
        });
}


function loadCard(body, token) {
    var options = {
        method: 'GET',
        uri: 'https://demo.zoompass.com/pm-api/loadCard/?proxyNumber=' + body.proxyNumber + '&amount=' + body.amount,
        headers: {
            "authorization": "Bearer " + token
        }
    };

    return rp(options)
        .then(function (body) {
            return body;
        })
        .catch(function (err) {

            return err;
        });
}



app.use('/wallet', router);
app.use('/wallet/data', express.static('../public'))

app.listen(8888);
