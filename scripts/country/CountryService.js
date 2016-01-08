angular.module('phonertcdemo')
  .factory('CountryService', function () {
    
    var service = {};
    var countris = [
      {name: 'Saudi Arabia', code: 'SA', flag: '0230', online: 0},
      {name: 'United States', code: 'US', flag: '0270', online: 0},
      

      {name: 'Afghanistan', code: 'AF', flag: '0035', online: 0},
      {name: 'Albania', code: 'AL', flag: '0038', online: 0},
      {name: 'Algeria', code: 'DZ', flag: '0096', online: 0},
      {name: 'Andorra', code: 'AD', flag: '0033', online: 0},
      {name: 'Angola', code: 'AO', flag: '0040', online: 0},
      {name: 'Antigua and Barbuda', code: 'AG', flag: '0036', online: 0},
      {name: 'Argentina', code: 'AR', flag: '0042', online: 0},
      {name: 'Armenia', code: 'AM', flag: '0039', online: 0},
      {name: 'Australia', code: 'AU', flag: '0045', online: 0},
      {name: 'Austria', code: 'AT', flag: '0044', online: 0},
      {name: 'Azerbaijan', code: 'AZ', flag: '0048', online: 0},
      {name: 'Bahamas', code: 'BS', flag: '0064', online: 0},
      {name: 'Bahrain', code: 'BH', flag: '0055', online: 0},
      {name: 'Bangladesh', code: 'BD', flag: '0051', online: 0},
      {name: 'Barbados', code: 'BB', flag: '0050', online: 0},
      {name: 'Belarus', code: 'BY', flag: '0068', online: 0},
      {name: 'Belgium', code: 'BE', flag: '0052', online: 0},
      {name: 'Belize', code: 'BZ', flag: '0069', online: 0},
      {name: 'Benin', code: 'BJ', flag: '0057', online: 0},
      {name: 'Bhutan', code: 'BT', flag: '0065', online: 0},
      {name: 'Bolivia', code: 'BO', flag: '0061', online: 0},
      {name: 'Bosnia and Herzegovina', code: 'BA', flag: '0049', online: 0},


      {name: 'Botswana', code: 'BW', flag: '0067', online: 0},
      {name: 'Brazil', code: 'BR', flag: '0063', online: 0},
      {name: 'Brunei', code: 'BN', flag: '0060', online: 0},
      {name: 'Bulgaria', code: 'BG', flag: '0054', online: 0},
      {name: 'Burkina Faso', code: 'BF', flag: '0053', online: 0},
      {name: 'Burundi', code: 'BI', flag: '0056', online: 0},
      {name: 'Cambodia', code: 'KH', flag: '0154', online: 0},
      {name: 'Cameroon', code: 'CM', flag: '0079', online: 0},
      {name: 'Canada', code: 'CA', flag: '0070', online: 0},
      {name: 'Cape Verde', code: 'CV', flag: '0085', online: 0},
      {name: 'Central African Republic', code: 'CF', flag: '0073', online: 0},
      {name: 'Chad', code: 'TD', flag: '0226', online: 0},
      {name: 'Chile', code: 'CL', flag: '0078', online: 0},
      {name: 'China', code: 'CN', flag: '0080', online: 0},
      {name: 'Colombia', code: 'CO', flag: '0081', online: 0},
      {name: 'Comoros', code: 'KM', flag: '0156', online: 0},
      {name: 'Congo Democratic Republic', code: 'CD', flag: '0072', online: 0},
      {name: 'Costa Rica', code: 'CR', flag: '0083', online: 0},
      {name: "Cote D'Ivoire", code: 'CI', flag: '0076', online: 0},
      {name: 'Croatia', code: 'HR', flag: '0134', online: 0},
      


      {name: 'Cuba', code: 'CU', flag: '0000', online: 0}, ////////////////////
      {name: 'Cyprus', code: 'CY', flag: '0088', online: 0},
      


       {name: 'Czech Republic', code: 'CZ', flag: '0089', online: 0},
       {name: 'Denmark', code: 'DK', flag: '0093', online: 0},
       {name: 'Djibouti', code: 'DJ', flag: '0092', online: 0},
       {name: 'Dominica', code: 'DM', flag: '0094', online: 0},
       {name: 'Dominican Republic', code: 'DO', flag: '0095', online: 0},
       {name: 'East Timor', code: 'TP', flag: '0259', online: 0},
       {name: 'Ecuador', code: 'EC', flag: '0098', online: 0},
       {name: 'Egypt', code: 'EG', flag: '0100', online: 0},
       {name: 'El Salvador', code: 'SV', flag: '0247', online: 0},
       {name: 'Equatorial Guinea', code: 'GQ', flag: '0124', online: 0},
       {name: 'Eritrea', code: 'ER', flag: '0102', online: 0},
       {name: 'Estonia', code: 'EE', flag: '0099', online: 0},
       {name: 'Ethiopia', code: 'ET', flag: '0104', online: 0},
       {name: 'Fiji', code: 'FJ', flag: '0107', online: 0},
       {name: 'Finland', code: 'FI', flag: '0106', online: 0},
       {name: 'France', code: 'FR', flag: '0111', online: 0},



       {name: 'French Polynesia', code: 'PF', flag: '0111', online: 0},
       {name: 'Gabon', code: 'GA', flag: '0112', online: 0},
       {name: 'Gambia', code: 'GM', flag: '0121', online: 0},
       {name: 'Georgia', code: 'GE', flag: '0115', online: 0},
       {name: 'Germany', code: 'DE', flag: '0090', online: 0},
       {name: 'Ghana', code: 'GH', flag: '0118', online: 0},
       {name: 'Gibraltar', code: 'GI', flag: '0119', online: 0},
       {name: 'Greece', code: 'GR', flag: '0125', online: 0},
       {name: 'Greenland', code: 'GL', flag: '0120', online: 0},
       {name: 'Grenada', code: 'GD', flag: '0114', online: 0},
       {name: 'Guadeloupe', code: 'GP', flag: '0178', online: 0},
       {name: 'Guatemala', code: 'GT', flag: '0127', online: 0},
       {name: 'Guinea', code: 'GN', flag: '0122', online: 0},
       {name: 'Guinea-Bissau', code: 'GW', flag: '0129', online: 0},
       {name: 'Guyana', code: 'GY', flag: '0130', online: 0},
       {name: 'Haiti', code: 'HT', flag: '0135', online: 0},
       {name: 'Honduras', code: 'HN', flag: '0133', online: 0},
       {name: 'Hong Kong', code: 'HK', flag: '0131', online: 0},
       {name: 'Hungary', code: 'HU', flag: '0136', online: 0},
       {name: 'Iceland', code: 'IS', flag: '0146', online: 0},
       {name: 'India', code: 'IN', flag: '0142', online: 0},
       {name: 'Indonesia', code: 'ID', flag: '0138', online: 0},
       {name: 'Iran', code: 'IR', flag: '0145', online: 0},
       {name: 'Iraq', code: 'IQ', flag: '0144', online: 0},
       {name: 'Ireland', code: 'IE', flag: '0139', online: 0},
       {name: 'Israel', code: 'IL', flag: '0140', online: 0},
       {name: 'Italy', code: 'IT', flag: '0147', online: 0},
       {name: 'Jamaica', code: 'JM', flag: '0149', online: 0},
       {name: 'Japan', code: 'JP', flag: '0151', online: 0},
       {name: 'Jordan', code: 'JO', flag: '0150', online: 0},
       {name: 'Kazakhstan', code: 'KZ', flag: '0162', online: 0},
       {name: 'Kenya', code: 'KE', flag: '0152', online: 0},
       {name: 'Kiribati', code: 'KI', flag: '0155', online: 0},
       {name: 'North Korea', code: 'KP', flag: '0158', online: 0},
       {name: 'South Korea', code: 'KR', flag: '0159', online: 0},
       {name: 'Kuwait', code: 'KW', flag: '0160', online: 0},
       


    ];





    KG Kyrgyzstan
    LA Laos LA
    LV Latvia
    LB Lebanon  LB
    LS Lesotho
    LR Liberia  LR
    LY Libya
    LI Liechtenstein  LI
    LT Lithuania
    LU Luxembourg LU
    MO Macau SAR
    MK Macedonia  MK
    MG Madagascar
    MW Malawi MW
    MY Malaysia
    MV Maldives MV
    ML Mali
    MT Malta  MT
    MH Marshall Islands
    MQ Martinique MQ
    MR Mauritania
    MU Mauritius  MU
    MX Mexico
    FM Micronesia, Fed. States of FM
    MD Moldova
    MC Monaco MC
    MN Mongolia
    ME Montenegro ME
    MA Morocco
    MZ Mozambique MZ
    MM Myanmar
    NA Namibia  NA
    NR Nauru
    NP Nepal  NP
    NL Netherlands
    NC New Caledonia  NC
    NZ New Zealand  NZ  
    NI Nicaragua  NI
    NE Niger
    NG Nigeria  NG
    MP Northern Mariana Islands
    NO Norway NO
    OM Oman
    PK Pakistan PK
    PW Palau
    PS Palestinian Territories  PS
    PA Panama
    PG Papua New Guinea PG
    PY Paraguay
    PE Peru PE
    PH Philippines
    PL Poland PL
    PT Portugal
    PR Puerto Rico  PR
    QA Qatar
    RE Réunion  RE
    RO Romania
    RU Russian Federation RU
    RW Rwanda
    KN Saint Kitts and Nevis  KN
    LC Saint Lucia
    WS Samoa  WS
    SM San Marino
    ST Sao Tome and Princ.  ST
    SN Senegal  SN
    RS Serbia
    SC Seychelles SC
    SL Sierra Leone
    SG Singapore  SG
    SK Slovakia
    SI Slovenia SI
    SB Solomon Islands
    SO Somalia  SO
    ZA South Africa
    ES Spain  ES
    LK Sri Lanka
    VC St Vincent and Gren. VC
    SD Sudan
    SR Suriname SR
    SZ Swaziland
    SE Sweden SE
    CH Switzerland
    SY Syria  SY
    TW Taiwan
    TJ Tajikistan TJ
    TZ Tanzania
    TH Thailand TH
    TG Togo
    TO Tonga  TO
    TT Trinidad and Tobago
    TN Tunisia  TN
    TR Turkey
    TM Turkmenistan TM
    TV Tuvalu
    UG Uganda UG
    UA Ukraine
    AE United Arab Emirates AE
    GB United Kingdom
    US United States  US
    UY Uruguay
    UZ Uzbekistan UZ
    VU Vanuatu
    VA Vatican City VA
    VE Venezuela
    VN Vietnam  VN
    VG Virgin
     Islands, British  VG  VI Virgin Islands, U.S. VI
    EH Western
     Sahara EH  YE Yemen  YE
    ZM Zambia
     ZM  ZW Zimbabwe ZW



    service.getCountries = function() {
      return countris;
    };

    return service;
  });