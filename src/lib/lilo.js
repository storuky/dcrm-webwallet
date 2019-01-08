function newWeb3(providers) {
  let idInit = 0;
  this.lilo = {
    dcrmReqAddr: function(fromAddress, coin, pwd) {
      let inputdata = {
        params: [fromAddress, coin],
        method: "lilo_dcrmReqAddr",
        jsonrpc: "2.0",
        id: ++idInit
      };
      let callback = new Promise(function(resolve) {
        $.ajax({
          url: providers,
          type: "post",
          data: JSON.stringify(inputdata),
          dataType: "json",
          contentType: "application/json",
          success: function(data) {
            if (data && data.result) {
              if (data.result.indexOf("{") === 0) {
                let $data = JSON.parse(data.result);
                sessionStorage.setItem("dcrmFromAddress", $data.DcrmAddr);
                resolve($data.DcrmAddr);
                // that.lilo.dcrmConfimAddr($data.DcrmAddr, coin, pwd).then(function (val) {
                //   resolve(val)
                // })
              } else {
                resolve(data);
              }
            } else if (data && data.error) {
              resolve(data);
            }
          },
          error: function(e) {
            console.log("error", e);
            resolve(e);
          }
        });
      });
      return callback;
    },
    dcrmConfimAddr: function(data, coin) {
      let inputdata = {
        params: [data, coin],
        method: "lilo_dcrmConfirmAddr",
        jsonrpc: "2.0",
        id: ++idInit
      };
      let callback = new Promise(function(resolve) {
        $.ajax({
          url: providers,
          type: "post",
          data: JSON.stringify(inputdata),
          dataType: "json",
          contentType: "application/json",
          success: function(data) {
            if (data && data.result) {
              if (data.result.indexOf("{") === 0) {
                let $data = JSON.parse(data.result);
                sessionStorage.setItem("dcrmFromAddress", $data.DcrmAddr);
                resolve($data.DcrmAddr);
                // that.lilo.dcrmConfimAddr($data.DcrmAddr, coin, pwd).then(function (val) {
                //   resolve(val)
                // })
              } else {
                resolve(data);
              }
            } else if (data && data.error) {
              resolve(data);
            }
          },
          error: function(e) {
            console.log("error", e);
            resolve(e);
          }
        });
      });
      return callback;
    },
    dcrmGetAddr: function(coinbase, coin) {
      let inputdata = {
        params: [coinbase, coin],
        method: "lilo_dcrmGetAddr",
        jsonrpc: "2.0",
        id: ++idInit
      };
      let callback = new Promise(function(resolve, reject) {
        $.ajax({
          url: providers,
          type: "post",
          data: JSON.stringify(inputdata),
          dataType: "json",
          contentType: "application/json",
          success: function(data) {
            // console.log(data)
            if (data && data.result) {
              let $data =
                data.result.indexOf("{") === 0
                  ? JSON.parse(data.result)
                  : data.result;
              sessionStorage.setItem("dcrmFromAddress", $data.DcrmAddr);
              // console.log(1)
              resolve($data);
            } else {
              // console.log(2)
              resolve(data.result);
            }
            // console.log(3)
          },
          error: function(e) {
            console.log("error", e);
            resolve(e);
          }
        });
      });
      return callback;
    },
    dcrmLockin: function(txhax, value, coin) {
      let inputdata = {
        params: [txhax, value, coin],
        method: "lilo_dcrmLockin",
        jsonrpc: "2.0",
        id: ++idInit
      };
      let callback = new Promise(function(resolve, reject) {
        $.ajax({
          url: providers,
          type: "post",
          data: JSON.stringify(inputdata),
          dataType: "json",
          contentType: "application/json",
          success: function(data) {
            if (data && data.result) {
              let $data =
                data.result.indexOf("{") === 0
                  ? JSON.parse(data.result)
                  : data.result;
              resolve($data);
            } else if (data && data.error) {
              reject(data);
            }
          },
          error: function(e) {
            console.log("error", e);
            reject(e);
          }
        });
      });
      return callback;
    },
    dcrmGetBalance: function(fromAddress, coin) {
      let inputdata = {
        params: [fromAddress, coin],
        method: "lilo_dcrmGetBalance",
        jsonrpc: "2.0",
        id: ++idInit
      };
      let callback = new Promise(function(resolve, reject) {
        $.ajax({
          url: providers,
          type: "post",
          data: JSON.stringify(inputdata),
          dataType: "json",
          contentType: "application/json",
          success: function(data) {
            if (data && data.result) {
              let $data =
                data.result.indexOf("{") === 0
                  ? JSON.parse(data.result)
                  : data.result;
              resolve($data);
            } else if (data && data.error) {
              resolve(data);
            }
          },
          error: function(e) {
            console.log("error", e);
            resolve(e);
          }
        });
      });
      return callback;
    }
    // dcrmSendTransaction: function (toAddress, value, coin, pwd) {
    //   let fromAddress = sessionStorage.getItem('dcrmFromAddress')
    //   let sendData = {
    //     from: fromAddress,
    //     to: toAddress,
    //     value: value,
    //     pwd: pwd,
    //     data: 'LOCKOUT:' + toAddress + ':' + value + ':' + coin
    //   }
    //   let callback
    //   if (!fromAddress) {
    //     that.lilo.dcrmGetAddr(sessionStorage.getItem('localFromAddress'), coin).then(function (val) {
    //       sendData.from = val
    //       callback = new Promise(function (resolve) {
    //         new SendTransactionPub(that, sendData).then(function (res) {
    //           resolve(res)
    //         })
    //       })
    //     })
    //   } else {
    //     callback = new Promise(function (resolve) {
    //       new SendTransactionPub(that, sendData).then(function (res) {
    //         resolve(res)
    //       })
    //     })
    //   }
    //   return callback
    // },
    // dcrmLockout: function (toAddress, value, coin, pwd, data) {
    //   let fromAddress = sessionStorage.getItem('dcrmFromAddress')
    //   let sendData = {
    //     from: fromAddress,
    //     to: toAddress,
    //     value: value,
    //     pwd: pwd,
    //     data: 'LOCKOUT:' + toAddress + ':' + value + ':' + coin
    //   }
    //   console.log(sendData)
    //   let callback
    //   if (!fromAddress) {
    //     that.lilo.dcrmGetAddr(sessionStorage.getItem('localFromAddress'), coin).then(function (val) {
    //       sendData.from = val
    //       callback = new Promise(function (resolve) {
    //         new SendTransactionPub(that, sendData, data).then(function (res) {
    //           resolve(res)
    //         })
    //       })
    //     })
    //   } else {
    //     callback = new Promise(function (resolve) {
    //       new SendTransactionPub(that, sendData).then(function (res) {
    //         resolve(res)
    //       })
    //     })
    //   }
    //   return callback
    // }
  };
  return this;
  // return this.returnWeb3
}
// (function () {
//   let Super = function () {}
//   Super.prototype = Web3.prototype
//   newWeb3.prototype = new Super()
// })()

// newWeb3.prototype = new Web3()

function SendTransactionPub(that, data, other) {
  console.log(that);
  let rawTx = {
    nonce: data.nonce ? data.nonce : other.nonce,
    gasPrice: data.gasPrice ? Number(data.gasPrice) : Number(other.gasPrice),
    gasLimit: data.gasLimit ? Number(data.gasLimit) : Number(other.gasLimit),
    from: data.from,
    to: data.to ? data.to : "0x00000000000000000000000000000000000000dc",
    value: data.value ? Number(data.value) : 0,
    data: data.data ? data.data : ""
  };
  let Tx = require("ethereumjs-tx");
  data.pwd = data.pwd.indexOf("0x") === 0 ? data.pwd.substr(2) : data.pwd;
  let privateKey = new Buffer(data.pwd, "hex");
  let tx = new Tx(rawTx);
  tx.sign(privateKey);
  let serializedTx = tx.serialize();
  let serializedTxString = serializedTx.toString("hex");
  serializedTxString =
    serializedTxString.indexOf("0x") === 0
      ? serializedTxString
      : "0x" + serializedTxString;
  let callback = new Promise(function(resolve, reject) {
    that.eth.sendRawTransaction(serializedTxString, function(err, hash) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        // console.log(hash)
        resolve(hash);
      }
    });
  });
  return callback;
}

// newWeb3.lilo.dcrmGetBalance = function () {
//   this.getBlock(12)
// }
export default newWeb3;
