import { WeatherService } from "../../services/weather.service";
import { Route } from "./index.route";


export class WeatherRoute extends Route {

  constructor( entity: any, validator: any ) {
    super( entity, validator );
    this.service = new WeatherService( entity );
  }


}
