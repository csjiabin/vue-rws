/**
 * shitty logger class
 */
class VueRwsLogger {
  constructor() {
    this.debug = false;
    this.prefix = "%cVue-RWS: ";
  }

  info(text, data = "") {
    if (this.debug)
      console.info(
        this.prefix + `%c${text}`,
        "color: blue; font-weight: 600",
        "color: #333333",
        data
      );
  }

  error() {
    if (this.debug) console.error(this.prefix, ...arguments);
  }

  warn() {
    if (this.debug) console.warn(this.prefix, ...arguments);
  }

  event(text, data = "") {
    if (this.debug)
      console.info(
        this.prefix + `%c${text}`,
        "color: blue; font-weight: 600",
        "color: #333333",
        data
      );
  }
}
export default new VueRwsLogger();
