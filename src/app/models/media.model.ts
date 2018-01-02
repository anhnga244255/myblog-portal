/**
 * Created by phuongho on 10/16/16.
 */
import { BaseModel } from "./base.model";
import { MAX_SIZE_UPLOAD, IMAGE_EXTENSION } from "../modules/constants";
import { UtilHelper } from "../helpers/util.helper";
import { ValidateModel } from "./validate.model";
import { Json } from '../modules';

export class MediaModel extends BaseModel {
  @Json('file')
  public file: any = undefined;

  @Json('image')
  public image: any = undefined;

  @Json('path')
  public path: string = undefined;

  @Json('url')
  public url: string = undefined;

  @Json('signature')
  public signature: string = undefined;

  @Json('type')
  public type: string = undefined;

  constructor() {
    super();
    this.validateRules = new ValidateModel();
    this.initValidateRules();
  }

  /**
   *
   * @returns {ValidateModel}
   */
  public initValidateRules(): ValidateModel {

    this.addRule("image", "required", true, this._t("Image can not be blank."));
    this.addRule("image", "extension", IMAGE_EXTENSION, this._t("Only allow file *.png , *.jpg."));
    this.addRule("image", "maxSizeUpload", MAX_SIZE_UPLOAD, this._t(`File upload too large. Only allow ${MAX_SIZE_UPLOAD}MB.`));

    return this.getRules();
  }

  /**
   *
   * @param data
   * @returns {MediaModel}
   */
  public static toRequest(data: any): MediaModel {
    let model: any = {};

    model.file = UtilHelper.setDataDefault(data.file);
    model.image = UtilHelper.setDataDefault(data.image);
    if(data.type) {
      model.type = UtilHelper.setDataDefault(data.type);
    }
    return model;
  }
}