let titleDisplay = document.getElementById("novelTitleDisplay");

titleDisplay.innerText = "HELLO TITLE EXAMPLE";

$('#novelTitleDisplay').html('whatever');

//https://github.com/vanillaes/csv
import { parse } from '/csv_parser.js'

const reader = new FileReader();

reader.onload = (event) => {
  const csvString = event.target.result;
  resolve(csvString);
};

reader.onerror = (event) => {
  reject(event.error);
};

reader.readAsText('novel_titles_test.csv');

const parsed = parse(csv);

$('#novelTitleDisplay').html(parsed);
