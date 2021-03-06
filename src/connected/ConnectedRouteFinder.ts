import RecursiveItemFinder from './RecursiveItemFinder';
import {RouteQuery} from './queries';
import GeneratorConfig from '../GeneratorConfig';
import RouteFinder from '../RouteFinder';

export default class ConnectedRouteFinder implements RouteFinder {
    private readonly config: GeneratorConfig;

    constructor(config:GeneratorConfig) {
        this.config = config;
    }

    findRoutes() : Promise<string[]> {
        return new Promise((resolve) => {
            const recursiveFinder = new RecursiveItemFinder(this.config);
            return recursiveFinder.find(RouteQuery, this.config.APP_SITECORE_PATH,
                (child) => this.config.ROUTE_TEMPLATES.indexOf(child.template.name) >= 0)
                .then(allRoutes => {
                    const justRoutes = allRoutes.map((x: { route: any; }) => x.route);
                    resolve(justRoutes);
                });
        });
    }

}