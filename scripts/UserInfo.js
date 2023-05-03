
export class UserInfo {
    constructor(profileNameContainer, profileJobContainer) {
        this._profileNameContainer = profileNameContainer
        this._profileJobContainer = profileJobContainer
    }
    getUserInfo() {
        return [this._profileNameContainer.textContent, this._profileJobContainer.textContent]
    }
    setUserInfo([name, job]) {
        this._profileNameContainer.textContent = name
        this._profileJobContainer.textContent = job
    }
    
}