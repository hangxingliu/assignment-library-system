//@ts-check
/// <reference path="./index.d.ts" />

import { updateUI } from "./components/components";
import { setup } from "./api/setup";

setup("/");
updateUI();

window.addEventListener('hashchange', updateUI);

// console.log(process.env.NODE_ENV);
