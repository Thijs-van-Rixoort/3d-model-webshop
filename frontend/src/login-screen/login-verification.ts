
// function resolveAfter2MS(x:any) {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(x);
//       }, 200);
//     });
//   }




// const sessionIDVerify = async function (): Promise<string|null> {

//     let obfuscation = sessionStorage.getItem("SessionKey");
    
    
//     if (obfuscation != null) {
    
//       const verify:any = await resolveAfter2MS((new StoreUserInDatabase()).verifySession(obfuscation));
//       return verify[0].id;
    
//     } else {
//       return null;
//       };
//     }
    
    
    
    
    
//     const verifyUser = async () => {
    
//     if (sessionStorage.getItem("SessionKey") != null) {
    
//       let loginVerified = await sessionIDVerify();
//       if (loginVerified != null) {
//         console.log(loginVerified)
//         console.log("b")
//       } else {
//         sessionStorage.removeItem("SessionKey");
//         location.reload;
//         console.log("c")
//     }
//   }
// };

// verifyUser();