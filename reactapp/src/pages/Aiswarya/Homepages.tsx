import { Component } from "react";
import picture from './image/NEET_Latest_News_and-Updates-img.jpg';

export const Homepages = ( props: any ) => {
         
        return (
            <div>
                <h3 className="ui center aligned header"><i>Latest News Updates</i></h3>
                <div className="ui image">
                    <img alt={picture} src={picture}/>
                </div>
            </div>

        )
    }


