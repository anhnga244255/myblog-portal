import { JsonMapper } from './../modules/mapper/json.mapper';
import { TransferHttp } from './../modules/transfer-http/transfer-http';
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

import { BaseService } from '../services';
import { MediaModel } from "../models";
import { HTTP_METHOD, REST_API } from "../modules/constants";
import * as  _ from 'lodash';

@Injectable()
export class MediaService extends BaseService {

    constructor(protected _http: TransferHttp) {
        super(_http);
    }

    /**
     * Upload image
     * @param url
     * @param data
     * @returns {Promise<TResult>}
     */

    private uploadMedia(url: string, data: MediaModel, isShowSpinner: boolean = true): Promise<MediaModel> {
        let model = MediaModel.toRequest(data);
        let obj = this.toUploadFields(model);

        return this.requestHttpFormData( url, HTTP_METHOD.POST, obj)
        .then((res) => {
            return JsonMapper.deserialize(MediaModel, res);
        });
    }

    /**
     *
     * @param data
     * @returns {Promise<MediaModel>}
     */
    public uploadImage(data: MediaModel, isShowSpinner: boolean = true): Promise<MediaModel> {
        return this.uploadMedia(`${this.mediaUrl}/` + REST_API.MEDIA, data, isShowSpinner);
    }

    public uploadFile(data: MediaModel, isShowSpinner: boolean = true): Promise<MediaModel> {
        return this.uploadMedia(`${this.apiUrl}/` + REST_API.FILE, data, isShowSpinner);
    }
}