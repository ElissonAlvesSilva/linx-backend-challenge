const Strings = {
  hashCode(s) {
    let h;
    // eslint-disable-next-line max-len
    for (let i = 0; i < s.length; i++) { h = Math.imul(31, h) + s.charCodeAt(i) | 0; }

    return h;
  },
};

module.exports = Strings;
