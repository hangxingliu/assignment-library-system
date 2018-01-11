//@ts-check
/// <reference path="./index.d.ts" />

// polyfill
require("core-js/fn/promise");
require("core-js/fn/symbol");

import { updateUI } from "./components/components";
import { setup } from "./api/setup";

setup("/");
updateUI();

window.addEventListener('hashchange', updateUI);

// console.log(process.env.NODE_ENV);
