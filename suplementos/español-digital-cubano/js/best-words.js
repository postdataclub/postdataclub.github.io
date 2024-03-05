/* <div class="word-list">
<div class="total-tag">Total</div>
${list_words[0]
  .map((x, i) => `<div class="word-${i + 1}">${x}</div>`)
  .join(" ")}
</div> */

function mark(key, list_words) {
  var listDom = document.getElementById(key);
  console.log(list_words);
  listDom.innerHTML = `
    <div class="flex">
      <div class="word-list">
        <div class="total-tag">CubaDebate</div>
        ${list_words[1]
          .map((x, i) => `<div class="word-${i + 1}">${x}</div>`)
          .join(" ")}
      </div>
      <div class="word-list">
        <div class="total-tag">Facebook</div>
        ${list_words[2]
          .map((x, i) => `<div class="word-${i + 1}">${x}</div>`)
          .join(" ")}
      </div>
      <div class="word-list">
        <div class="total-tag">Telegram</div>
        ${list_words[3]
          .map((x, i) => `<div class="word-${i + 1}">${x}</div>`)
          .join(" ")}
      </div>
      <div class="word-list">
        <div class="total-tag">Twitter</div>
        ${list_words[4]
          .map((x, i) => `<div class="word-${i + 1}">${x}</div>`)
          .join(" ")}
      </div>
      <div class="word-list">
        <div class="total-tag">Youtube</div>
        ${list_words[5]
          .map((x, i) => `<div class="word-${i + 1}">${x}</div>`)
          .join(" ")}
      </div>

    </div>`;
}

function getTen(data, filter) {
  const result = data.filter((x) => filter(x)).map((x) => x.text);

  if (result.length > 10) return result.slice(0, 10);

  return result.concat(Array(10 - result.length).fill("-"));
}

function filter(data, filter) {
  const realData = data
    .filter((x) => filter(x))
    .sort((a, b) => (a.frequency < b.frequency ? 1 : -1));

  return [
    getTen(realData, (x) => true),
    getTen(realData, (x) => x.social_network.includes("CubaDebate")),
    getTen(realData, (x) => x.social_network.includes("Facebook")),
    getTen(realData, (x) => x.social_network.includes("Telegram")),
    getTen(realData, (x) => x.social_network.includes("Twitter")),
    getTen(realData, (x) => x.social_network.includes("Youtube")),
  ];
}

function bestSelect(data) {
  const totalData = Object.keys(data)
    .map((key) => {
      const result = data[key];
      result.text = key;
      return result;
    })
    .filter((x) => x.origin_key);

  const list = Array.from(new Set(totalData.map((x) => x.origin_key)));
  var listDom = document.getElementById("e-select");
  listDom.innerHTML = list
    .map(
      (x, i) =>
        `<option value="${i}" ${
          x === "Del jap. (japonés)" ? "selected" : ""
        }>${x}</option>`
    )
    .join("");

  mark(
    "most-select",
    filter(totalData, (x) => x.origin_key === "Del jap. (japonés)")
  );

  listDom.onchange = function (e) {
    var value = $("#e-select").val();
    mark(
      "most-select",
      filter(totalData, (x) => x.origin_key === list[value])
    );
  };
}
