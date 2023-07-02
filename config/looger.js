require("dotenv").config();
const DEBUG = process.env.DEBUG;
function info(...params) {
  if (DEBUG) {
    console.info(params);
  }
}

function error(...params) {
  if (DEBUG) {
    console.error(params);
  }
}

function warn(...params) {
  if (DEBUG) {
    console.warn(params);
  }
}

function log(...params) {
  if (DEBUG) {
    console.log(params);
  }
}

module.exports = {
  info,
  warn,
  error,
  log,
};
