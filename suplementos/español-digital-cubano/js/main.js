$.getScript("js/read-data.js", () => {
  return read().then((data) => {
    console.log(Object.keys(data).length);

    $.getScript("js/natural-2.js", () => {
      return naturalPie(data);
    });

    $.getScript("js/digital-2.js", () => {
      return digitalPie(data);
    });

    $.getScript("js/rae-2.js", () => {
      return raePie(data);
    });

    $.getScript("js/ranking-words.js", () => {
      return ranking(data);
    });

    $.getScript("js/daily-frequency.js", () => {
      return daily(data);
    });

    $.getScript("js/ethnology.js", () => {
      return ethnology(data);
    });

    $.getScript("js/best-words.js", () => {
      return bestSelect(data);
    });
  });
});
