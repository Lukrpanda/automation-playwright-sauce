module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    paths: ['tests/Features/**/*.feature'],  
    require: ['tests/Steps/**/*.ts'],        
    formatOptions: {
      snippetInterface: 'async-await',
    },
    format: [
      'html:cucumber-report.html',
      'summary',
      'progress'
    ]
  }
}