import {Entity, Column} from "typeorm";
import { IsNotEmpty } from 'class-validator';
import { BaseEntity, BaseValidator } from "./base";


@Entity( )
export class Product extends BaseEntity {

    @Column( )
    name?: string;

    @Column( )
    price?: number;
}

export class ProductValidator extends BaseValidator {
    
    @IsNotEmpty( {message: `price should be defined`} )
    price?: number;
}
