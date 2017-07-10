define({ "api": [
  {
    "type": "get",
    "url": "/wallet/transactions",
    "title": "View Transactions History On Wallet",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "access-key",
            "description": "<p>1pZHAuZXhhbXBsZS5jb20iLCJzdWIiOiJtYWlsdG8</p>"
          }
        ]
      }
    },
    "group": "Wallet",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "proxyNumber",
            "description": "<p>Mandatory ProxyNumber AKA CardNumber. .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "/wallet/transactions?proxyNumber=5388300003302",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "  HTTP/1.1 200 OK\n{\n \"success\": \"Card transaction history retrieved successfully!\",\n \"messageCode\": \"2010\",\n \"transactionList\": [\n    {\n         \"aauId\": null,\n         \"account\": \"4893827430665925\",\n         \"acqInstCode\": null,\n        \"acquirerId\": null,\n         \"addressVerif\": null,\n         \"amt\": \"2\",\n         \"apan\": null,\n         \"applyReq\": null,\n         \"approved\": null,\n         \"authAmount\": null,\n         \"authCode\": \"548327\",\n         \"buyerFirst\": null,\n         \"buyerLast\": null,\n         \"buyerLoaderId\": \"\",\n         \"buyerMiddle\": null,\n         \"caid\": null,\n         \"cardHolderAdj\": null,\n         \"cardHolderFee\": null,\n         \"cardPbmStatus\": null,\n         \"cardStatus\": null,\n         \"cardStatusDesc\": null,\n         \"class\": \"com.zoompass.cardprocessor.api.transaction.CardTransactionItem\",\n         \"clientRefnum\": \"\",\n         \"comment\": \"Loading 2 to the card with proxy #5388300003302\",\n         \"countryName\": \"\",\n         \"credit\": \"2\",\n         \"creditCardnum\": null,\n         \"customIndicator\": \"NDValue Load\",\n         \"ddaAccount\": null,\n         \"ddaInstitution\": null,\n         \"ddaRouting\": null,\n         \"debit\": null,\n         \"description\": \"Value Load\",\n         \"expDate\": null,\n         \"inserted\": \"07/09/2017  7:00:27 PM\",\n        \"issuingCurrcode\": \"CAD\",\n         \"localAmount\": \"2\",\n         \"localCurrCode\": \"\",\n         \"localTranCurrCode\": null,\n         \"logId\": null,\n         \"matchStatusDesc\": null,\n         \"matchTypeDesc\": null,\n         \"mcc\": \"\",\n         \"mccDescription\": null,\n         \"merchAddr\": \"\",\n         \"merchant\": \"A2A SOURCE ID\",\n         \"merchantNo\": \"\",\n         \"origAuthAmount\": null,\n         \"pan\": null,\n         \"payExpDate\": null,\n         \"posCond\": null,\n         \"posEntry\": null,\n         \"postdate\": \"07/09/2017\",\n         \"purseNo\": null,\n         \"pursecandoid\": null,\n         \"reasonCode\": null,\n         \"reasonDescription\": \"Undefined (catch all)\",\n         \"reasonId\": null,\n         \"reference\": \"CC00EB3AFCF5\",\n         \"requestCode\": \"1710\",\n         \"responseCode\": \"0\",\n         \"responseDescription\": \"Approval\",\n         \"reversed\": \"False\",\n         \"sCode\": null,\n         \"settleAmount\": \"2\",\n         \"settleSeq\": null,\n         \"sourceDesc\": null,\n         \"strategyName\": \"Paymobile Generic PrePaid Visa-Corporate\",\n         \"terminalId\": null,\n         \"tranResult\": \"Completed OK\",\n         \"trandate\": \"07/09/2017\",\n         \"txnLevel\": \"\",\n         \"txntype\": \"ValueLoad\",\n         \"userid\": \"A2A184373\",\n         \"utcInserted\": \"2017-07-09 23:00:27.300\",\n         \"utcPostDate\": \"2017-07-09 23:00:27.300\",\n         \"variance\": null\n     },\n ],\n \"transactionCount\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error ",
          "content": "HTTP/1.1 200 OK\n{\n   \"error\": \"Error retrieving transactions.\",\n   \"messageCode\": \"4022\"\n }",
          "type": "json"
        }
      ]
    },
    "filename": "app/server.js",
    "groupTitle": "Wallet",
    "name": "GetWalletTransactions"
  },
  {
    "type": "post",
    "url": "/wallet/load",
    "title": "Transfer Money From Master Wallet To Card",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "access-key",
            "description": "<p>1pZHAuZXhhbXBsZS5jb20iLCJzdWIiOiJtYWlsdG8</p>"
          }
        ]
      }
    },
    "group": "Wallet",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "proxyNumber",
            "description": "<p>Mandatory ProxyNumber AKA CardNumber.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "amount",
            "description": "<p>Mandatory Amount .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"proxyNumber\" : \"5388300003302\",\n  \"amount\" : 44\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": \"Card has been loaded successfully!\",\n  \"messageCode\": \"2003\",\n  \"proxyNumber\": \"5388300003302\",\n  \"amount\": \"44.00\",\n  \"balance\": \"64.00\",\n  \"externalTransactionId\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/server.js",
    "groupTitle": "Wallet",
    "name": "PostWalletLoad"
  },
  {
    "type": "put",
    "url": "/wallet",
    "title": "Create New Wallet",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "access-key",
            "description": "<p>1pZHAuZXhhbXBsZS5jb20iLCJzdWIiOiJtYWlsdG8</p>"
          }
        ]
      }
    },
    "group": "Wallet",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "proxyNumber",
            "description": "<p>Mandatory ProxyNumber AKA CardNumber.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>Mandatory FirstName .</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Mandatory LastName .</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Mandatory Email .</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Mandatory Address .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"email\":\"adsd@sadasd.com\",\n  \"proxyNumber\" : \"5388300003302\",\n   \"firstName\":\"km\",\n   \"lastName\":\"km\",\n   \"address\":\"asdsad\"\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"success\": \"Account has been created successfully!\",\n   \"messageCode\": \"2006\",\n   \"walletNumber\": \"100000003135\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error ",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": \"Error registering account!\",\n  \"messageCode\": \"4007\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/server.js",
    "groupTitle": "Wallet",
    "name": "PutWallet"
  }
] });
