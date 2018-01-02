/**
 * Created by phuongho on 10/16/16.
 */
import {BaseModel} from "../base.model";
import {PAGINATION} from "../../modules/constants";

export class BaseSearchModel{
  public offset: number = 0;
  public limit: number = PAGINATION.ITEMS_PER_PAGE;
  public key:string = '';
  public sortBy:string = '';
  public sortType:string = 'DESC';
}
