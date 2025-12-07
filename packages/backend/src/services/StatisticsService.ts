import {Elysia} from "elysia";

export class StatisticsService {
    private static readonly PLUGIN_NAME = 'statisticsService' as const;

    public static statisticsServicePlugin = () => new Elysia().decorate(this.PLUGIN_NAME, new StatisticsService())


}