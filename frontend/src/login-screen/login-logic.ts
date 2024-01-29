const awesome = async () => {
  let dataSortingUser: any = await coolcooluser();

  if (dataSortingUser != null) {

    createSuccesNotification('Je bent ingelogd!')

    window.setTimeout(function () {
      window.location.assign(`../../public/html/product-overview.html`);
    }, 1200);
  }




}
(document.getElementById("loginButton") as HTMLButtonElement).addEventListener("click", awesome)
function resolveAfter2S(x: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, 200);
  });
}



const coolcooluser = async function (): Promise<string> {

  let email = (document.getElementById("email") as HTMLInputElement).value
  let password = (document.getElementById("password") as HTMLInputElement).value

  const sqltest: any = await resolveAfter2S((new StoreUserInDatabase()).retrievelogin(email, password));

  console.log(sqltest[0].id)
  sessionStorage.setItem("SessionKey", sqltest[0].id)

  return sqltest[0].id;
};

const loginSuccess = () => {

}