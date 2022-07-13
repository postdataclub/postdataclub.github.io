function read() {
  return Promise.all(
    Array(11)
      .fill(1)
      .map((_, i) =>
        $.getJSON(`data/words${i}.json`, function (data) {
          return data;
        })
      )
  ).then((objs) => {
    return objs.reduce((a, b) => Object.assign(a, b), {});
  });
}
