import { Location } from '@angular/common';
import { MetaService } from '@ngx-meta/core';
import { BaseComponent } from './../base.component';
import { Component, ViewEncapsulation, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService, MediaService, UserIdentityService } from "../../services";

import { UserModel, MediaModel } from "../../models";
import { GlobalState } from "../../global.state";
import { STATE_EVENT } from "../../modules/constants";
import { Overlay } from "angular2-modal";

@Component({
    selector: 'my-profile',
    encapsulation: ViewEncapsulation.None,
    template: require('../../views/accounts/profile.html'),
})
export class AccountComponent extends BaseComponent {

    protected pageTitle = 'My profile';
    private user: UserModel;
    private media: MediaModel;

    @ViewChild('userFormModal') private userFormModal;
    @ViewChild('changePasswordFormModal') private changePasswordFormModal;

    constructor(protected _router: Router,
        protected _route: ActivatedRoute,
        protected _meta: MetaService,
        protected _location: Location,
        private _state: GlobalState,
        protected _mediaService: MediaService,
        protected _userService: UserService,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef, ) {
        super(_router, _route, _meta, _location);
    }

    ngOnInit() {
        this.setPageTitle(this.pageTitle);
        this.user = new UserModel();
        this.media = new MediaModel();
        this.getProfile();
    }

    /**
     * Event Select File
     * @param event
     */
    onFileSelected(event): void {
        this.media.image = event.target.files;
    }

    /**
     * Update profile
     */
    private updateProfile() {
        try {
            this.user.removeRule("phoneNumber", "required");
            this.user.removeRule("avatarUrl", "required");

            if (this.media && this.media.image) {
                this.user.addRule("avatarUrl", "extension");
                this.user.addRule("avatarUrl", "maxSizeUpload");
            } else {
                this.user.removeRule("avatarUrl", "extension");
                this.user.removeRule("avatarUrl", "maxSizeUpload");
            }

            if (this.user.validate("formUser")) {
                Promise.resolve()
                    .then(() => {
                        if (this.media && this.media.image) {
                            return this._mediaService.uploadImage(this.media);
                        }
                    })
                    .then((response) => {
                        if (response) {
                            this.user.avatarUrl = response.url;
                        }

                        return this._userService.updateProfile(this.user)
                    })
                    .then(response => {
                        if (response) {
                            this.getProfile();
                            this.setSuccess(response.message);
                            this.showHideUserFormModal(false);
                        }
                    })
                    .catch(error => {
                        this.setError(error);
                    });
            }
        } catch (error) {
            this.setError(error);
        }
    }

    /**
     * Update profile
     */
    private changePassword(): void {
        try {
            if (this.user.validate("formChangePassword")) {
                this._userService.changePassword(this.user)
                    .then(response => {
                        if (response) {
                            this.setSuccess(this._t("Change password successful."));
                            UserIdentityService.setCredentials(response);
                            this.showHideChangePasswordFormModal(false);
                        }
                    })
                    .catch(error => {
                        this.setError(error);
                    });
            }
        } catch (error) {
            this.setError(error);
        }
    }

    /**
     * Get Detail
     */
    private getProfile(): void {
        try {
            this._userService.getProfile()
                .then(response => {
                    if (response) {
                        this.user = response;

                        UserIdentityService.setProfile(response);
                        this._state.notifyDataChanged(STATE_EVENT.UPDATE_PROFILE, response); // notify update profile
                    }
                })
                .catch(error => {
                    this.setError(error);
                });
        } catch (error) {
            this.setError(error);
        }
    }

    /**
     * show hide user modal
     * @param isShow
     */
    private showHideUserFormModal(isShow: boolean = true) {
        if (isShow) {
            this.userFormModal.show();
        } else {
            this.getProfile();
            this.user.resetForm("formUser");
            this.userFormModal.hide();
        }
    }

    /**
     * show hide user modal
     * @param isShow
     */
    private showHideChangePasswordFormModal(isShow: boolean = true) {
        if (isShow) {
            this.changePasswordFormModal.show();
        } else {
            this.getProfile();
            this.user.resetForm("formChangePassword");
            this.changePasswordFormModal.hide();
        }
    }
}
