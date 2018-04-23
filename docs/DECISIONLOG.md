# Decision Log

The purpose of this document is a record decisions that we have consciously made.

---


|   Date          |  Num   |  Title      | Description | Decision | Related Parties |
| :-------------: | :----: | :---------: | ----------- | -------- | --------------- |
| 2018/02/01 |   1    | Decision Log     | Many important decisions have been made but have been lost as there is no record kept.  |    Create this document to keep track of those decisions in SCM | Brodie McIntyre, James Nash  |
|            |   2    | HTTP Headers     | The Buildit website is made up of (intentionally) static assets.  One of the most cost effective ways to host this is to serve them from an AWS S3 bucket.  Hosting assets on S3 presents problems with HTTP headers as it does not allow for certain headers to be applied without using a Lambda@Edge interception to place the missing headers on requests (e.g. Strict-Transport-Security, x-content-type-options) | The decision was made to not invest in adding these headers and not creating a lambda function as it would incur further costs.  We have full control of the content hosted, so some security concerns with not using these headers can be circumvented through design and due diligence.  For Content-type charset, because it does not automatically set this when S3 guesses/applies its content types, the deployment will be separated out to specify the charset for CSS, HTML and JavaScript |  Brodie McIntyre, James Nash |
|  |
| 2018/02/19 |   1    |  Consuming Logs  | Currently AWS S3 logs are split into small log files containing 1-5 entries. We wanted a cost effective way of making logs more accessible without incurring additional charges. | The solution was to combine the logs for a day that would be under analysis.  A script should be created that can do this.  The view is to revisit this decision when we are at a maturity level, which requires us to use the statistics for A/B testing of changes | Team |
|  |
| 2018/03/01 | 1 | Website engine - static website generator | It's has been already been decided that for the sake of creating the MVP, we're going to use a static website generator. We have very few and basic requirements that can be easily satisfied by the use of a static website generator.  | The solution was to use [Metalsmith](http://metalsmith.io), since it's possibly one of the most flexible and easy static website generator available, also Matteo's previous work with it would help get us to a starting point quite easily | James Nash, Matteo Pescarin |
| 2018/03/29 | 2 | Javascript | We need to decide some basic things regarding how we write JS code | We agreed that we're going to write directly in ES6, using ES6 modules. The only thing is that before launch we would need to write a fallback `nomodule` bundle. | Team |
|  |
| 2018/00/00 | 1 |   |   |   |
|   |   |   |   |   |