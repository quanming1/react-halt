export default class SpendTime {
  private startTime: number = 0;
  start = () => {
    this.startTime = +new Date();
  };
  end = () => {
    return +new Date() - this.startTime;
  };

  public static getStart = () => {
    const s = new SpendTime();
    s.start();
    return s;
  };
}
