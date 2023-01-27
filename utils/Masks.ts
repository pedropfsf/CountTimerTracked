class Masks {
  static formatMonthAndYear(value: string): string {
    return value.replace(/(\d{2})(\d{4})/, "$1/$2");
  }

  static formatDate(value: string): string {
    return value.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
  }

  static formatTimer(value: string): string {
    return value.replace(/(\d{2})(\d{2})/, "$1:$2");
  }
};

export default Masks;