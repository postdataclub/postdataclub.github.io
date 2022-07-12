export function read(f) {
  let obj = {};
  $.getJSON("data/words0.json", function (data) {
    obj = Object.assign(obj, data);
  });
  $.getJSON("data/words1.json", function (data) {
    obj = Object.assign(obj, data);
  });
  $.getJSON("data/words2.json", function (data) {
    obj = Object.assign(obj, data);
  });
  $.getJSON("data/words3.json", function (data) {
    obj = Object.assign(obj, data);
  });
  $.getJSON("data/words4.json", function (data) {
    obj = Object.assign(obj, data);
  });
  $.getJSON("data/words5.json", function (data) {
    obj = Object.assign(obj, data);
  });
  $.getJSON("data/words6.json", function (data) {
    obj = Object.assign(obj, data);
  });
  $.getJSON("data/words7.json", function (data) {
    obj = Object.assign(obj, data);
  });
  $.getJSON("data/words8.json", function (data) {
    obj = Object.assign(obj, data);
  });
  $.getJSON("data/words9.json", function (data) {
    obj = Object.assign(obj, data);
  });
  $.getJSON("data/words10.json", function (data) {
    obj = Object.assign(obj, data);
  });

  return f(obj);
}
