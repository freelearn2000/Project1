import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty, IsString } from 'class-validator';


@Entity()
export class News {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    title?: string;

    @Column()
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
