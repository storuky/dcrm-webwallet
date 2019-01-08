const getBlob = ({ mime = "text/json;charset=UTF-8", str }) => {
  var _typeof =
    typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
      ? function(obj) {
          return typeof obj;
        }
      : function(obj) {
          return obj &&
            typeof Symbol === "function" &&
            obj.constructor === Symbol &&
            obj !== Symbol.prototype
            ? "symbol"
            : typeof obj;
        };
  var str1 =
    (typeof str === "undefined" ? "undefined" : _typeof(str)) === "object"
      ? JSON.stringify(str)
      : str;
  if (str1 == null) return "";
  // var blob = new Blob([str1], {
  //   type: mime
  // })
  let blob;
  try {
    blob = new Blob([str1], { type: mime });
  } catch (e) {
    // TypeError old chrome and FF
    let BlobBuilder =
      window.BlobBuilder ||
      window.WebKitBlobBuilder ||
      window.MozBlobBuilder ||
      window.MSBlobBuilder;
    if (e.name === "TypeError" && window.BlobBuilder) {
      blob = new BlobBuilder();
      blob.append([str1.buffer]);
      blob = blob.getBlob(mime);
    } else {
      let tip = "Browser does not support";
      alert(tip);
      throw tip;
    }
  }
  return window.URL.createObjectURL(blob);
};

function copyToClp(txt) {
  txt = document.createTextNode(txt);
  var m = document;
  var w = window;
  var b = m.body;
  b.appendChild(txt);
  if (b.createTextRange) {
    var d = b.createTextRange();
    d.moveToElementText(txt);
    d.select();
    m.execCommand("copy");
  } else {
    var d = m.createRange();
    var g = w.getSelection;
    d.selectNodeContents(txt);
    g().removeAllRanges();
    g().addRange(d);
    m.execCommand("copy");
    g().removeAllRanges();
  }
  txt.remove();
}

export { getBlob, copyToClp };
