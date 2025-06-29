module.exports = {
  home: (req, res) => {
    res.render("home");
  },
  second: (req, res) => {
    res.render("second");
  },
};
// This file defines a basic controller with two methods: home and second.
// Each method renders a different view when called.