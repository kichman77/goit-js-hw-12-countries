import { alert, error, defaultModules } from "@pnotify/core/dist/PNotify";
import * as PNotifyMobile from "@pnotify/mobile/dist/PNotifyMobile";
import debounce from "lodash.debounce";
import template from "./template.hbs";
import "../../node_modules/@pnotify/core/dist/PNotify.css";
import "../../node_modules/@pnotify/core/dist/BrightTheme.css";

defaultModules.set(PNotifyMobile, {});

let name, notice;
const url = `https://restcountries.eu/rest/v2/name/`;
const input = document.getElementById("get-country");
// console.log(input);
const button = document.getElementById("get-country-btn");
// console.log(button);
const div = document.getElementById("country-box");
// console.log(div);

input.addEventListener(
  "input",
  debounce(() => {
    name = input.value;
    // console.log(input.value);
    div.innerHTML = "";

    fetch(`${url}${name}`)
      .then((response) => {
        // console.log(response);
        if (response.status == 200) {
          return response.json();
        } else if (!name) {
          div.innerHTML = "";
        } else {
          notice = alert({ title: "Not found", hide: true, delay: 1000 });
        }
        if (response.status == 404) {
          error({ text: "error 404" });
        }
      })
      .then((data) => {
        if (data.length > 10) return error({ text: "Введите более точный запрос страны" });
        if (!data.length) return error({ text: "Пустой запрос" });

        // console.log(data.length);
        const country = template(data);
        div.insertAdjacentHTML("afterbegin", country);
      })
      .catch((err) => {
        console.log(err.message);
        // console.log("Response error");
      });
  }, 400)
);
