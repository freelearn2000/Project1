import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';


@Entity()
export class Weather {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    place?: string;

    @Column()
    info?: string;
}

export class WeatherValidator {

    @IsString( {message: 'Place name should be a string'} )
    @IsNotEmpty( {message: 'Place name should be defined'} )
    place?: string;

    @IsString( {message: 'Info should be a string'} )
    @IsNotEmpty( {message: 'Info should be defined'} )
    info?: string;
}
   
