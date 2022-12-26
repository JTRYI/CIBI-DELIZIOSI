"use strict";

class User{

    constructor(id, firstName, lastName, userName, profilePic, email, password, contact, birthday){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.profilePic = profilePic;
        this.email = email;
        this.password = password;
        this.contact = contact;
        this.birthday = birthday;

    }

    getId(){
        return this.id;
    }

    getfirstName(){
        return this.firstName;
    }

    getlastName(){
        return this.lastName;
    }

    getuserName(){
        return this.userName;
    }

    getprofilePic(){
        return this.profilePic;
    }

    getEmail(){
        return this.email;
    }

    getPassword(){
        return this.password;
    }

    getContact(){
        return this.contact;
    }

    getBirthday(){
        return this.birthday;
    }

    setfirstName(firstName){
        this.firstName = firstName;
    }

    setlastName(lastName){
        this.lastName = lastName;
    }

    setuserName(userName){
        this.userName = userName;
    }

    setprofilePic(profilePic){
        this.profilePic = profilePic;
    }

    setEmail(email){
        this.email = email;
    }

    setPassword(password){
        this.password = password;
    }

    setContact(contact){
        this.contact = contact;
    }

    setBirthday(birthday){
        this.birthday = birthday;
    }

}

module.exports = User;