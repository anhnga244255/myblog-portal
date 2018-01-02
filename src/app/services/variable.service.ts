import { JsonMapper } from './../modules/mapper/json.mapper';
import { TransferHttp } from './../modules/transfer-http/transfer-http';
import { UtilHelper } from './../helpers/util.helper';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { BaseService } from '../services';
import { PaginationModel, VariableModel } from "../models";
import { REST_API, PAGINATION } from "../modules/constants";

@Injectable()
export class VariableService extends BaseService {

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
        return this.makeHttpGet(REST_API.VARIABLE.LIST + '?' + queryString)
        .then((res) => {
            res.data = JsonMapper.deserialize(VariableModel, res.data);
            return res;
          });
    }
}



