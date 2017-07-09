define({ "api": [
  {
    "type": "post",
    "url": "/wallet/load",
    "title": "Transfer Money From Master Wallet To Card",
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