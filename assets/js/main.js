/**
 * Entry point. Wires the page up once the deferred scripts have run.
 */
(function (namespace) {
  "use strict";

  if (!namespace || typeof namespace.initPriceReveal !== "function") {
    return;
  }

  namespace.initPriceReveal(document.querySelector(".gallery__grid"));
})(window.priceGallery);
