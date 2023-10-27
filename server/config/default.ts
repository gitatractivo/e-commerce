export default {
  port: 5000,
  dbUri: process.env.DATABASE_URL,
  logLevel: "info",
  accessTokenPrivateKey: "",
  refreshTokenPrivateKey: "",
  smtp: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    host: process.env.MAIL_SERVER,
    port: 587,
    secure: false,
  },
  saltWorkFactor: 10,
  accessTokenTtl: "15d",
  refreshTokenTtl: "1y",
  publicKey: `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAx4RPL42UETv/KRl8pt5I
YLlNgxou2FSDk9FT7PrD0Mbhbh2eyd8q+Az52Nx6ee02PhA6ONyMTzQS+Mn4cExx
4dfVLDjvAGctFWc2zoYJNehYvqTyiYdUcFhPEZnZ2OkttsJ46F/eMer41fxw1qUX
Cn722fed14Sxf/kFkbSB6IrDmnKKvW+RID+PddLpjlxzoXt5CZaK05YjxRk8S6qu
BqEuC3Y+l8/zHsnmX5hS+z0GXr2Z4XWysUOQ80fi7zCXoHLM+/y0t71j1Dk5W5qJ
LzkA4JpwjWV0cMDNzpFNbljM6SdafIYKJB87Ci6TXnKBh1ATckkVjxgVCsYyK9ec
tZoVQeZONGnh49PlJgn/nthSnfFjj8NfD7QjD8oBO5d8S1jvtgz0e21eX2SQkB2E
dn9f7Y+5DekC9Es9wo1AHMs/z+iXdJ3e5TrOvJhpWR349jn2IE3zrDAM2Tqk6lUg
hghmPlsbG/1jJ5pniGCenMOpraJXMUzOLdJh8VzWdoTNw1T6CwWkwr8/PGgmyPy8
v+PJ3dip8Nxn7fdRcb1FKA+eeQKi8PM7uo9+DK93IIdp+Fh8RfjFe9M/ik3I0py4
AjzdnXRLLtq/oTI9PCO37AEbLFExc+IDvPABi0EnjJEVH8x3J0GVD6cnQPYdw5Q+
KL58Y0KZm4Dl/runxZruQVkCAwEAAQ==
-----END PUBLIC KEY-----
`,
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----
`,
};
