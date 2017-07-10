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
    var key = req.headers['access-key'];
    if (! key ||  key !== "1pZHAuZXhhbXBsZS5jb20iLCJzdWIiOiJtYWlsdG8")
        return res.status(401).send({ error: "Not Authorized" });
    next();
});

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
 *  @apiHeader {String} access-key 1pZHAuZXhhbXBsZS5jb20iLCJzdWIiOiJtYWlsdG8
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
 *  @apiHeader {String} access-key 1pZHAuZXhhbXBsZS5jb20iLCJzdWIiOiJtYWlsdG8
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
});


/**
 * @api {get} /wallet/transactions View Transactions History On Wallet
 * @apiHeader {String} access-key 1pZHAuZXhhbXBsZS5jb20iLCJzdWIiOiJtYWlsdG8
 * @apiGroup Wallet
 * @apiVersion 1.0.0
 * @apiParam {String} proxyNumber     Mandatory ProxyNumber AKA CardNumber. .
 * @apiParamExample {json} Request-Example:
 * /wallet/transactions?proxyNumber=5388300003302
 *  @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *  {
 *   "success": "Card transaction history retrieved successfully!",
 *   "messageCode": "2010",
 *   "transactionList": [
 *      {
 *           "aauId": null,
 *           "account": "4893827430665925",
 *           "acqInstCode": null,
 *          "acquirerId": null,
 *           "addressVerif": null,
 *           "amt": "2",
 *           "apan": null,
 *           "applyReq": null,
 *           "approved": null,
 *           "authAmount": null,
 *           "authCode": "548327",
 *           "buyerFirst": null,
 *           "buyerLast": null,
 *           "buyerLoaderId": "",
 *           "buyerMiddle": null,
 *           "caid": null,
 *           "cardHolderAdj": null,
 *           "cardHolderFee": null,
 *           "cardPbmStatus": null,
 *           "cardStatus": null,
 *           "cardStatusDesc": null,
 *           "class": "com.zoompass.cardprocessor.api.transaction.CardTransactionItem",
 *           "clientRefnum": "",
 *           "comment": "Loading 2 to the card with proxy #5388300003302",
 *           "countryName": "",
 *           "credit": "2",
 *           "creditCardnum": null,
 *           "customIndicator": "NDValue Load",
 *           "ddaAccount": null,
 *           "ddaInstitution": null,
 *           "ddaRouting": null,
 *           "debit": null,
 *           "description": "Value Load",
 *           "expDate": null,
 *           "inserted": "07/09/2017  7:00:27 PM",
 *          "issuingCurrcode": "CAD",
 *           "localAmount": "2",
 *           "localCurrCode": "",
 *           "localTranCurrCode": null,
 *           "logId": null,
 *           "matchStatusDesc": null,
 *           "matchTypeDesc": null,
 *           "mcc": "",
 *           "mccDescription": null,
 *           "merchAddr": "",
 *           "merchant": "A2A SOURCE ID",
 *           "merchantNo": "",
 *           "origAuthAmount": null,
 *           "pan": null,
 *           "payExpDate": null,
 *           "posCond": null,
 *           "posEntry": null,
 *           "postdate": "07/09/2017",
 *           "purseNo": null,
 *           "pursecandoid": null,
 *           "reasonCode": null,
 *           "reasonDescription": "Undefined (catch all)",
 *           "reasonId": null,
 *           "reference": "CC00EB3AFCF5",
 *           "requestCode": "1710",
 *           "responseCode": "0",
 *           "responseDescription": "Approval",
 *           "reversed": "False",
 *           "sCode": null,
 *           "settleAmount": "2",
 *           "settleSeq": null,
 *           "sourceDesc": null,
 *           "strategyName": "Paymobile Generic PrePaid Visa-Corporate",
 *           "terminalId": null,
 *           "tranResult": "Completed OK",
 *           "trandate": "07/09/2017",
 *           "txnLevel": "",
 *           "txntype": "ValueLoad",
 *           "userid": "A2A184373",
 *           "utcInserted": "2017-07-09 23:00:27.300",
 *           "utcPostDate": "2017-07-09 23:00:27.300",
 *           "variance": null
 *       },
 *   ],
 *   "transactionCount": 1
 *  }
 *     @apiErrorExample {json} Error 
 *     HTTP/1.1 200 OK
*     {
*        "error": "Error retrieving transactions.",
*        "messageCode": "4022"
*      }
 */
router.route("/transactions").get(function (req, res) {
    var proxyNumber = req.query.proxyNumber;

    req.checkQuery('proxyNumber', 'Required').notEmpty();
    req.checkQuery('proxyNumber', 'Not A Numeric String').matches(new RegExp('^\\d+$'));

    res.contentType("application/json");

    var errors = req.validationErrors();

    if (errors) {
        res.status(400).send(errors);
        return;
    } else {

        login().then(function (token) {
            getTransactions(proxyNumber, token).then(function (result) {
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

function getTransactions(proxyNumber, token) {
    var options = {
        method: 'GET',
        uri: 'https://demo.zoompass.com/pm-api/getTransactions/?proxyNumber=' + proxyNumber,
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
