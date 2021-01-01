"use strict";

var axios = require("axios");

var $ = require("cheerio");

var url = "https://www.interswitchgroup.com/news/insights";
axios.get(url).then(function _callee2(result) {
  var links, link;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          links = $(".insight_link", result.data).get().map(function (x) {
            return $(x).attr("href");
          });
          _context2.next = 3;
          return regeneratorRuntime.awrap(Promise.all(links.map(function _callee(url) {
            var filter, filtered;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(axios.get("https://www.interswitchgroup.com".concat(url)));

                  case 2:
                    filter = _context.sent;
                    filtered = $("p", filter.data).text();

                    if (!(filtered.includes("CEO") || filtered.includes("COO") || filtered.includes("Manager") || filtered.includes("President") || filtered.includes("Vice President"))) {
                      _context.next = 6;
                      break;
                    }

                    return _context.abrupt("return", url);

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            });
          })));

        case 3:
          link = _context2.sent;
          console.log(link.filter(function (url) {
            return url;
          }));

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
})["catch"](function (error) {
  console.log(error);
});