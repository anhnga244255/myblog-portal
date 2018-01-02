import { ProvinceStateModel } from "./../models/province_state.model";
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
export class ProvinceStateService extends BaseService {

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
        return this.makeHttpGet(`${this.apiUrl}/` + REST_API.PROVINCE_STATE.LIST + '?' + queryString)
            .then((res) => {
                res.data = JsonMapper.deserialize(ProvinceStateModel, res.data);
                return res;
            });
    }

    /**
   * edit
   * @returns {Promise<T>|Promise<U>}
   */
    public update(data: ProvinceStateModel): Promise<StateModel> {
        let obj = ProvinceStateModel.toRequest(data);

        return this.makeHttpPut(`${this.apiUrl}/` + REST_API.PROVINCE_STATE.UPDATE + '/' + data.id, obj);
    }

    /**
   * delete
   * @returns {Promise<T>|Promise<U>}
   */
    public delete(id: string): Promise<StateModel> {

        return this.makeHttpDelete(`${this.apiUrl}/` + REST_API.PROVINCE_STATE.DELETE + '/' + id);
    }
    /**
     * create
     * @returns {Promise<T>|Promise<U>}
     */
    public create(data: ProvinceStateModel): Promise<StateModel> {
        let obj = ProvinceStateModel.toRequest(data);

        return this.makeHttpPost(`${this.apiUrl}/` + REST_API.PROVINCE_STATE.CREATE, obj);
    }
}



