export type loginCredentials = {
    clientId?:string |undefined,
    select_by?:string|undefined,
    credential?:string|undefined,
 }
 
 export type userDataType = {
    name:string,
    email:string,
    picture:string,
    savedFiles:string[]
 }