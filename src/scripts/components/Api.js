
export class Api {
  constructor({ baseUrl, headers }) {
    this.headers = headers
    this.baseUrl = baseUrl
  }


  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
      method: 'GET',
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err)
      });
  }

  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
      method: 'GET'
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err)
      });
  }

  patchUserData([name,about]) {
    console.log(`${name}, ${about}`)
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
      method: 'PATCH',
      body: JSON.stringify({
        name,
        about,
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err)
      });
  }

  updateAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      headers: this.headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar,
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err)
      });
  }

  async postCard(name, link) {
    try {
      const res = await fetch(`${this.baseUrl}/cards`, {
        headers: this.headers,
        method: 'POST',
        body: JSON.stringify({
          name,
          link,
        })
      });
      if (res.ok) {
        return await res.json();
      }
      throw new Error(res.status);
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
      if (res.ok) {
        return await res.json();
      }
      throw new Error(res.status);
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
      if (res.ok) {
        return await res.json();
      }
      throw new Error(res.status);
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
      if (res.ok) {
        return await res.json();
      }
      throw new Error(res.status);
    } catch (err) {
      console.log(err)
    }
  }

}
// ---------------------------------


