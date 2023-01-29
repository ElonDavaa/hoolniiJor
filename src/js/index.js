require("@babel/polyfill");
import Search from "./Model/search";

let search = new Search("pizza");

search.doSearch().then(r => console.log(r));