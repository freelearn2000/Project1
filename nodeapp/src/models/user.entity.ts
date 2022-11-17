import { Entity, Column } from "typeorm";
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { BaseEntity, BaseValidator } from "./base";


@Entity( )
export class User extends BaseEntity {

    @Column( )
    name?: string;

    @Column( {unique:true} )
    email?: string;

    @Column( )
    password?: string;

    @Column( )
    address?: string;
}

export  class UserValidator extends BaseValidator {

    @IsEmail( {}, {message: 'Email is not valid'} )
    @IsNotEmpty( {message: 'Email should be defined'} )
    email?: string;

    @Matches( /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password must contain atleast eight characters including one uppercase letter, one lowercase letter, and one number or special character'} )
    @IsNotEmpty( {message: 'Password should be defined'} )
    password?: string;

    @IsString( {message: 'Address should be a string'} )
    @IsNotEmpty( {message: 'Address should be defined'} )
    address?: string;
}  

export  class AuthUserValidator {
    
    @IsEmail( {}, {message: 'Email is not valid'} )
    @IsNotEmpty( {message: 'Email should be defined'} )
    email?: string;

    @IsNotEmpty( {message: 'Password should be defined'} )
    password?: string;

}  
