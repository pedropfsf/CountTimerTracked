class ID {
  static gerenate() {
    return String(Math.random() * 10000000).replace(".", "");
  }
};

export default ID;