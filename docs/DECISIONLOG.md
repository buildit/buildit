# Decision Log

The purpose of this document is a record decisions that we have consciously made.

---


|   Date          |  Num   |  Title      | Description | Decision | Related Parties |
| :-------------: | :----: | :---------: | ----------- | -------- | --------------- |
| 2018/02/01 |   1    | Decision Log     | Many important decisions have been made but have been lost as there is no record kept.  |    Create this document to keep track of those decisions in SCM | Brodie McIntyre, James Nash  |
|            |   2    | HTTP Headers     | The Buildit website is made up of (intentionally) static assets.  One of the most cost effective ways to host this is to serve them from an AWS S3 bucket.  Hosting assets on S3 presents problems with HTTP headers as it does not allow for certain headers to be applied without using a Lambda@Edge interception to place the missing headers on requests (e.g. Strict-Transport-Security, x-content-type-options) | The decision was made to not invest in adding these headers and not creating a lambda function as it would incur further costs.  We have full control of the content hosted, so some security concerns with not using these headers can be circumvented through design and due diligence.  For Content-type charset, because it does not automatically set this when S3 guesses/applies its content types, the deployment will be separated out to specify the charset for CSS, HTML and JavaScript |  Brodie McIntyre, James Nash |
|  |
| 2018/00/00 |   1    |        |       |       |
|       |       |       |       |       |