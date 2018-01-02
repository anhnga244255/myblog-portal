import { CountryModel } from "./../models/country.model";
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
export class CountryService extends BaseService {

    constructor(public http: TransferHttp) {
        super(http);
    }

    /**
     * Get list
     * @returns {Promise<T>|Promise<U>}
     */
    public findAll(paging: boolean = true, filter: any = {}): Promise<PaginationModel> {

        if (!paging) {
            filter.offset = '';
            filter.limit = '';
        }
        let queryString = UtilHelper.parseFilterToString(filter);
        return this.makeHttpGet(`${this.apiUrl}/` + REST_API.COUNTRY.LIST + '?' + queryString)
            .then((res) => {
                res.data = JsonMapper.deserialize(CountryModel, res.data);
                return res;
            });
    }

    public getStates(code: string = ''): Promise<PaginationModel> {

        return this.makeHttpGet(`${this.apiUrl}/` + REST_API.COUNTRY.STATES + '/' + code)
            .then((res) => {
                return res;
            });
    }

    public getProvince(name: string = ''): Promise<PaginationModel> {

        return this.makeHttpGet(`${this.apiUrl}/` + REST_API.COUNTRY.PROVINCE + '/' + name)
            .then((res) => {
                return res;
            });
    }

    /**
   * edit
   * @returns {Promise<T>|Promise<U>}
   */
    public update(data: CountryModel): Promise<StateModel> {
        let obj = CountryModel.toRequest(data);

        return this.makeHttpPut(`${this.apiUrl}/` + REST_API.COUNTRY.UPDATE + '/' + data.id, obj);
    }

    /**
   * delete
   * @returns {Promise<T>|Promise<U>}
   */
    public delete(id: string): Promise<StateModel> {

        return this.makeHttpDelete(`${this.apiUrl}/` + REST_API.COUNTRY.DELETE + '/' + id);
    }
    /**
     * create
     * @returns {Promise<T>|Promise<U>}
     */
    public create(data: CountryModel): Promise<StateModel> {
        let obj = CountryModel.toRequest(data);

        return this.makeHttpPost(`${this.apiUrl}/` + REST_API.COUNTRY.CREATE, obj);
    }
}



