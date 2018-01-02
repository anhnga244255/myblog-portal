export class ImageHelper {
  constructor() {}
  /**
   * Get Image
   * @param imageUrl 
   * @param width 
   * @param height 
   * @param mode 
   */
  public static getImage(imageUrl: string, width: number, height: number, mode: string) {
    return imageUrl + '?width=' + width + '&height=' + height + '&quality=' + '&mode=' + mode;
  }
}
