import { NewsService } from "../../services/news.service";
import { Route } from "./index.route";


export class NewsRoute extends Route {

  constructor( entity: any, validator: any ) {
    super( entity, validator );
    this.service = new NewsService( entity );
  }
}