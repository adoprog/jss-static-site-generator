import { expect } from 'chai';
import ConnectedLayoutService from './ConnectedLayoutService';
import ConsoleGeneratorLogger from '../logging/ConsoleGeneratorLogger';

describe('ConnectedLayoutService constructor', () => {

    it('should throw an error when proxy null', () => {
        expect(() => new ConnectedLayoutService('', "apiKey", "appName", () => Promise.resolve(new Response()), new ConsoleGeneratorLogger())).to.throw('proxyUrl');
    });

    it('should throw an error when apiKey null', () => {
        expect(() => new ConnectedLayoutService('proxyUrl', '', "appName", () => Promise.resolve(new Response()), new ConsoleGeneratorLogger())).to.throw('apiKey');
    });

    it('should throw an error when appName null', () => {
        expect(() => new ConnectedLayoutService('proxyUrl', 'apiKey', '', () => Promise.resolve(new Response()), new ConsoleGeneratorLogger())).to.throw('appName');
    });

    it('should throw an error when fetch null', () => {
        expect(() => new ConnectedLayoutService('proxyUrl', 'apiKey', 'appName', undefined, new ConsoleGeneratorLogger())).to.throw('fetch');
    });

    it('should throw an error when logger null', () => {
        expect(() => new ConnectedLayoutService('proxyUrl', 'apiKey', 'appName', () => Promise.resolve(new Response()), undefined)).to.throw('logger');
    });

});

describe('ConnectedLayoutService buildLayoutUrl', () => {

    it('should build url with parameters', () => {
        const expectedUrl = `http://proxyUrl/sitecore/api/layout/render/jss?item=/&sc_lang=en&sc_apikey=apiKey`;
        const connectedService = new ConnectedLayoutService(
            'http://proxyUrl', 'apiKey', 'appName', () => Promise.resolve(new Response()), new ConsoleGeneratorLogger()
            );
        const layoutUrl = connectedService.buildLayoutUrl('/', 'en');
        expect(layoutUrl).to.eq(expectedUrl);
    });

});

describe('ConnectedLayoutService buildDictionaryUrl', () => {

    it('should build url with parameters', () => {
        const expectedUrl = `http://proxyUrl/sitecore/api/jss/dictionary/appName/en?sc_apikey=apiKey`;
        const connectedService = new ConnectedLayoutService(
            'http://proxyUrl', 'apiKey', 'appName', () => Promise.resolve(new Response()), new ConsoleGeneratorLogger()
            );
        const dictionaryUrl = connectedService.buildDictionaryUrl('en');
        expect(dictionaryUrl).to.eq(expectedUrl);
    });

});

describe('LayoutSerivce fetchLayoutData', () => {

    it('should call fetch', () => {
        let isCalled = false;
        const fetchCallback = (_input: any, _info: any) => { 
            isCalled = true;
            return Promise.resolve({ json: () => {} } as Response);
        };
        const layoutService = new ConnectedLayoutService(
            "proxyUrl", "apiKey", "appName", fetchCallback, new ConsoleGeneratorLogger()
            );
        layoutService.fetchLayoutData("route", "en").then(() => {
            expect(isCalled).to.equal(true);
        });
    });

});

describe('LayoutSerivce fetchDictionary', () => {

    it('should call fetch', () => {
        let isCalled = false;
        const fetchCallback = (_input: any, _info: any) => { 
            isCalled = true;
            return Promise.resolve({ json: () => {} } as Response);
        };
        const layoutService = new ConnectedLayoutService(
            "proxyUrl", "apiKey", "appName", fetchCallback, new ConsoleGeneratorLogger()
            );
        layoutService.fetchDictionary("en").then(() => {
            expect(isCalled).to.equal(true);
        });
    });

});
