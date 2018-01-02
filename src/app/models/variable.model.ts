/**
 * Created by phuongho on 7/12/16.
 */
import { BaseModel } from "./base.model";
import { UtilHelper } from "../helpers";
import { Json } from '../modules';

export class VariableModel extends BaseModel {
    @Json('value')
    public value: string = undefined;

    @Json('keyword')
    public keyword: string = undefined;

    constructor() {
        super();
    }
}
