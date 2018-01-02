/**
 * Created by phuongho on 10/16/16.
 */
import {BaseSearchModel} from "./base_search.model";

export class SearchUserModel extends BaseSearchModel{
    public roleId: string;
    public country: string;
    public state: string;
    public province: string;
    public tags: string;
}
