export default () => {
  let form = document.getElementById(`authForm`);
  function authWithEmailAndPassword(email, password) {
    const apiKey = `AIzaSyCZ0WmZ0luHOGFhqojsgyhZz10nG9bK520`;
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
      method: `POST`,
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': `application/json`
      }
    })
     .then((response) => response.json())
     .then((data) =>console.log(data.idToken))
     .catch((error) => console.log(error));
  }

  form.addEventListener(`submit`, async (e) => {
    e.preventDefault();
    const email = e.target.querySelector(`#email-user`).value;
    const password = e.target.querySelector(`#pass-user`).value;
    authWithEmailAndPassword(email, password);
  });
};
