
export class UserInfo {
    constructor(profileNameContainerSelector, profileJobContainerSelector, avatarContainerSelector,userData) {
        this._profileNameContainer = document.querySelector(profileNameContainerSelector)
        this._profileJobContainer = document.querySelector(profileJobContainerSelector)
        this._avatarContainer = document.querySelector(avatarContainerSelector)

        this._userData = userData
        this._renderUserInfo()
        this._renderUserAvatar()
    }
    getUserInfo() {
        return [this.userData.name, this.userData.about]
    }

    getUserId() {
        return this.userData._id
    }

    setUserInfo({name, about}) {
        this.userData.name = name
        this.userData.about = about
    }

    _renderUserInfo() {
        this._profileNameContainer.textContent = this.userData.name
        this._profileJobContainer.textContent = this.userData.about
    }

    setUserAvatar(avatarLink){
        this.userData.avatar = avatarLink
    }

    _renderUserAvatar() {
        this._avatarContainer.src = this.userData.avatar
    }
}