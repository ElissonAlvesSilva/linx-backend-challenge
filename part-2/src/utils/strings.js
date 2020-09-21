const Strings = {
  hashCode(s) {
    if (!s) {
      throw new Error('must be pass a string');
    }

    let h;
    // eslint-disable-next-line max-len
    for (let i = 0; i < s.length; i++) { h = Math.imul(31, h) + s.charCodeAt(i) | 0; }

    return h;
  },
};

module.exports = Strings;
