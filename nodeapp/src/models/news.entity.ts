import { Entity, Column } from "typeorm";
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from "./base";


@Entity( )
export class News extends BaseEntity {

    @Column( )
    title?: string;

    @Column( )
    content?: string;
}

export class NewsValidator {

    @IsString( {message: `Title should be a string`} )
    @IsNotEmpty( {message: `Title should be defined`} )
    title?: string;

    @IsString( {message: `Content should be a string`} )
    @IsNotEmpty( {message: `Content should be defined`} )
    content?: string;
}
