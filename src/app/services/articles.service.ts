import { ArticlesModel } from "./../models/articles.model";
import { JsonMapper } from './../modules/mapper/json.mapper';
import { TransferHttp } from './../modules/transfer-http/transfer-http';
import { UtilHelper } from './../helpers/util.helper';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { BaseService } from '../services';
import { PaginationModel, VariableModel, StateModel } from "../models";
import { REST_API, PAGINATION } from "../modules/constants";

@Injectable()
export class ArticlesService extends BaseService {

    constructor(public http: TransferHttp) {
        super(http);
    }

    /**
     * Get list variable
     * @returns {Promise<T>|Promise<U>}
     */
    public findAll(paging: boolean = true, filter: any = {}): Promise<PaginationModel> {

        if (!paging) {
            filter.offset = '';
            filter.limit = '';
        }
        let queryString = UtilHelper.parseFilterToString(filter);
        return this.makeHttpGet(`${this.apiUrl}/` + REST_API.ARTICLES.LIST + '?' + queryString)
            .then((res) => {
                res.data = JsonMapper.deserialize(ArticlesModel, res.data);
                return res;
            });
    }

    /**
    * edit tag
    * @returns {Promise<T>|Promise<U>}
    */
    public update(data: ArticlesModel): Promise<StateModel> {
        let obj = ArticlesModel.toRequest(data);

        return this.makeHttpPut(`${this.apiUrl}/` + REST_API.ARTICLES.UPDATE + '/' + data.id, obj);
    }
    /**
    * delete articles
    * @returns {Promise<T>|Promise<U>}
    */
    public delete(id: string): Promise<StateModel> {

        return this.makeHttpDelete(`${this.apiUrl}/` + REST_API.ARTICLES.DELETE + '/' + id);
    }
    /**
     * create articles
     * @returns {Promise<T>|Promise<U>}
     */
    public create(data: ArticlesModel): Promise<StateModel> {
        let obj = ArticlesModel.toRequest(data);

        return this.makeHttpPost(`${this.apiUrl}/` + REST_API.ARTICLES.CREATE, obj);
    }
}



