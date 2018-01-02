/**
 * Created by phuongho on 10/14/16.
 */
import { Json } from '../modules';

export class StateModel {
  @Json('title')
  public title: string = undefined;

  @Json('code')
  public code: number = undefined;

  @Json('message')
  public message: string = undefined;

  @Json('value')
  public value: any = undefined;

  public static instances: StateModel;

  /**
   * init state model
   * @returns {StateModel}
   */
  public static getInstances(): StateModel {
    if (this.instances == null) {
      this.instances = new StateModel();
    }

    return this.instances;
  }

  /**
   *
   * @param code
   * @param message
   * @param value
   * @param title
   * @returns {StateModel}
   */
  public init(code, message, value: any = {},  title: string = ''): StateModel {
    this.code = code;
    this.value = value;
    this.message = message;
    this.title = title;

    return this;
  }
}
