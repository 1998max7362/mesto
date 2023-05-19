
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
        return [this._userData.name, this._userData.about]
    }

    getUserId() {
        return this._userData._id
    }

    setUserInfo({name, about}) {
        this._userData.name = name
        this._userData.about = about
    }

    _renderUserInfo() {
        this._profileNameContainer.textContent = this._userData.name
        this._profileJobContainer.textContent = this._userData.about
    }

    setUserAvatar(avatarLink){
        this._userData.avatar = avatarLink
    }

    _renderUserAvatar() {
        this._avatarContainer.src = this._userData.avatar
    }
}