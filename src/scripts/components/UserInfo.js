
export class UserInfo {
    constructor(profileNameContainerSelector, profileJobContainerSelector, avatarContainerSelector) {
        this._profileNameContainer = document.querySelector(profileNameContainerSelector)
        this._profileJobContainer = document.querySelector(profileJobContainerSelector)
        this._avatarContainer = document.querySelector(avatarContainerSelector)
    }
    getUserInfo() {
        return [this._profileNameContainer.textContent, this._profileJobContainer.textContent]
    }
    setUserInfo({name, about}) {
        this._profileNameContainer.textContent = name
        this._profileJobContainer.textContent = about
    }
    setUserAvatar(avatarLink){
        this._avatarContainer.src = avatarLink
    }
    
}