import { eq } from 'drizzle-orm';
import { genSaltSync, hashSync } from 'bcrypt-ts';




export async function getUser(email: string, password:string) {
  // console.log("here")
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "");
  urlencoded.append("username", email );
  urlencoded.append("password", password);
  urlencoded.append("scope", "");
  urlencoded.append("client_id", "");
  urlencoded.append("client_secret", "");
  
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    // redirect: "follow" 
  };
  
  return await fetch(`${process.env.NGURL}api/auth/jwt/login`, requestOptions)
  .then((response) => response.json())
    .then((result) => {return result})
    .catch((error) => {return null;});
}
