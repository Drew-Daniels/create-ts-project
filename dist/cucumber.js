import 'tsx';
/**
 * @type {import("@cucumber/cucumber").IConfiguration}
 */
export default {
    paths: ['./test/features/**/*.feature'],
    import: ['./test/features/**/*.ts'],
    formatOptions: {
        snippetInterface: 'async-await',
    },
    format: [
        'html:reports/report.html',
        'summary',
        '@cucumber/pretty-formatter',
        'cucumber-console-formatter',
    ]
};
