/**
 * Price reveal.
 *
 * Turns every `.piece` button inside a container into a price toggle. One
 * delegated listener covers the whole gallery, so adding a piece to the
 * markup needs no change here.
 *
 * Registered on a single namespace object rather than exported as an ES
 * module, so the page also runs when index.html is opened straight from
 * disk over file:// — where module imports are blocked by CORS.
 */
(function (namespace) {
  "use strict";

  var OPEN_CLASS = "is-open";

  function setOpen(piece, isOpen) {
    piece.classList.toggle(OPEN_CLASS, isOpen);
    piece.setAttribute("aria-expanded", String(isOpen));
  }

  function closeAll(root) {
    var open = root.querySelectorAll(".piece." + OPEN_CLASS);

    for (var i = 0; i < open.length; i += 1) {
      setOpen(open[i], false);
    }

    return open.length;
  }

  /**
   * @param {Element|null} root Container holding the `.piece` buttons.
   * @returns {boolean} Whether the behaviour was attached.
   */
  function initPriceReveal(root) {
    if (!root) {
      return false;
    }

    var pieces = root.querySelectorAll(".piece");

    if (pieces.length === 0) {
      return false;
    }

    root.addEventListener("click", function (event) {
      var target = event.target;

      if (!target || typeof target.closest !== "function") {
        return;
      }

      var piece = target.closest(".piece");

      if (!piece || !root.contains(piece)) {
        return;
      }

      setOpen(piece, !piece.classList.contains(OPEN_CLASS));
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") {
        return;
      }

      if (closeAll(root) > 0) {
        event.preventDefault();
      }
    });

    return true;
  }

  namespace.initPriceReveal = initPriceReveal;
})((window.priceGallery = window.priceGallery || {}));
