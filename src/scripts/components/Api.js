
export class Api {
  constructor({ baseUrl, headers }) {
    this.headers = headers
    this.baseUrl = baseUrl
  }

  async getInitialCards() {
    try {
      const res = await fetch(`${this.baseUrl}/cards`, {
        headers: this.headers,
        method: 'GET',
      })
      return this._getResposeData(res)
    } catch (err) {
      console.log(err)
    }
  }

  async getUserData() {
    try {
      const res = await fetch(`${this.baseUrl}/users/me`, {
        headers: this.headers,
        method: 'GET'
      })
      return this._getResposeData(res)
    } catch (err) {
      console.log(err)
    }
  }

  async patchUserData({name, about}) {
    try {
      const res = await fetch(`${this.baseUrl}/users/me`, {
        headers: this.headers,
        method: 'PATCH',
        body: JSON.stringify({
          name,
          about,
        })
      })
      return this._getResposeData(res)
    } catch (err) {
      console.log(err)
    }
  }


  async updateAvatar({avatar}) {
    try {
      const res = await fetch(`${this.baseUrl}/users/me/avatar`, {
        headers: this.headers,
        method: 'PATCH',
        body: JSON.stringify({
          avatar,
        })
      })
      return this._getResposeData(res)
    } catch (err) {
      console.log(err)
    }
  }


  async postCard({name, link}) {
    try {
      const res = await fetch(`${this.baseUrl}/cards`, {
        headers: this.headers,
        method: 'POST',
        body: JSON.stringify({
          name,
          link
        })
      })
      return this._getResposeData(res)
    } catch (err) {
      console.log(err)
    }
  }

  async deleteCard(_id) {
    try {
      const res = await fetch(`${this.baseUrl}/cards/${_id}`, {
        headers: this.headers,
        method: 'DELETE',
      });
      return this._getResposeData(res)
    } catch (err) {
      console.log(err)
    }
  }

  async likeCard(_id) {
    try {
      const res = await fetch(`${this.baseUrl}/cards/${_id}/likes`, {
        headers: this.headers,
        method: 'PUT',
      });
      return this._getResposeData(res)
    } catch (err) {
      console.log(err)
    }
  }

  async dislikeCard(_id) {
    try {
      const res = await fetch(`${this.baseUrl}/cards/${_id}/likes`, {
        headers: this.headers,
        method: 'DELETE',
      });
      return this._getResposeData(res)
    } catch (err) {
      console.log(err)
    }
  }

  async _getResposeData(res) {
    if (res.ok) {
      return await res.json();
    }
    throw new Error(res.status);
}

}



