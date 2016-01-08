angular.module('phonertcdemo')
  .factory('CountryService', function () {
    
    var myCountry = {};
    
    var service = {};

    var countris = [
      {name: 'Saudi Arabia', code: 'SA', flag: '0230', online: 0},
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
      {name: 'Cuba', code: 'CU', flag: '0084', online: 0},
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
     {name: 'Kyrgyzstan', code: 'KG', flag: '0153', online: 0},
     {name: 'Laos', code: 'LA', flag: '0163', online: 0},
     {name: 'Latvia', code: 'LV', flag: '0172', online: 0},
     {name: 'Lebanon', code: 'LB', flag: '0164', online: 0},
     {name: 'Lesotho', code: 'LS', flag: '0169', online: 0},
     {name: 'Liberia', code: 'LR', flag: '0168', online: 0},
     {name: 'Libya', code: 'LY', flag: '0173', online: 0},
     {name: 'Liechtenstein', code: 'LI', flag: '0166', online: 0},
     {name: 'Lithuania', code: 'LT', flag: '0170', online: 0},
     {name: 'Luxembourg', code: 'LU', flag: '0171', online: 0},
     {name: 'Macau', code: 'MO', flag: '0185', online: 0},
     {name: 'Macedonia', code: 'MK', flag: '0181', online: 0},
     {name: 'Madagascar', code: 'MG', flag: '0179', online: 0},
     {name: 'Malawi', code: 'MW', flag: '0193', online: 0},
     {name: 'Malaysia', code: 'MY', flag: '0195', online: 0},
     {name: 'Maldives', code: 'MV', flag: '0192', online: 0},
     {name: 'Mali', code: 'ML', flag: '0182', online: 0},
     {name: 'Malta', code: 'MT', flag: '0190', online: 0},
     {name: 'Marshall Islands', code: 'MH', flag: '0180', online: 0},
     {name: 'Martinique', code: 'MQ', flag: '0187', online: 0},
     {name: 'Mauritania', code: 'MR', flag: '0188', online: 0},
     {name: 'Mauritius', code: 'MU', flag: '0191', online: 0},
     {name: 'Mexico', code: 'MX', flag: '0194', online: 0},
     {name: 'Federated States of Micronesia', code: 'FM', flag: '0109', online: 0},
     {name: 'Moldova', code: 'MD', flag: '0176', online: 0},
     {name: 'Monaco', code: 'MC', flag: '0175', online: 0},
     {name: 'Mongolia', code: 'MN', flag: '0184', online: 0},
     {name: 'Montenegro', code: 'ME', flag: '0177', online: 0},
     {name: 'Morocco', code: 'MA', flag: '0174', online: 0},
     {name: 'Mozambique', code: 'MZ', flag: '0196', online: 0},
     {name: 'Myanmar', code: 'MM', flag: '0183', online: 0},
     {name: 'Namibia', code: 'NA', flag: '0197', online: 0},
     {name: 'Nauru', code: 'NR', flag: '0206', online: 0},
     {name: 'Nepal', code: 'NP', flag: '0205', online: 0},
     {name: 'Netherlands', code: 'NL', flag: '0203', online: 0},
     {name: 'New Caledonia', code: 'NC', flag: '0281', online: 0},
     {name: 'New Zealand', code: 'NZ', flag: '0208', online: 0},
     {name: 'Nicaragua', code: 'NI', flag: '0202', online: 0},
     {name: 'Niger', code: 'NE', flag: '0199', online: 0},
     {name: 'Nigeria', code: 'NG', flag: '0201', online: 0},
     {name: 'Northern Mariana Islands', code: 'MP', flag: '0186', online: 0},
     {name: 'Norway', code: 'NO', flag: '0066', online: 0},
     {name: 'Oman', code: 'OM', flag: '0209', online: 0},
     {name: 'Pakistan', code: 'PK', flag: '0215', online: 0},
     {name: 'Palau', code: 'PW', flag: '0222', online: 0},
     {name: 'Palestine', code: 'PS', flag: '0220', online: 0},
     {name: 'Panama', code: 'PA', flag: '0210', online: 0},
     {name: 'Papua New Guinea', code: 'PG', flag: '0213', online: 0},
     {name: 'Paraguay', code: 'PY', flag: '0223', online: 0},
     {name: 'Peru', code: 'PE', flag: '0211', online: 0},
     {name: 'Philippines', code: 'PH', flag: '0214', online: 0},
     {name: 'Poland', code: 'PL', flag: '0216', online: 0},
     {name: 'Portugal', code: 'PT', flag: '0221', online: 0},
     {name: 'Puerto Rico', code: 'PR', flag: '0219', online: 0},
     {name: 'Qatar', code: 'QA', flag: '0224', online: 0},
     {name: 'Reunion', code: 'RE', flag: '0111', online: 0},
     {name: 'Romania', code: 'RO', flag: '0253', online: 0},
     {name: 'Russia', code: 'RU', flag: '0228', online: 0},
     {name: 'Rwanda', code: 'RW', flag: '0229', online: 0},
     {name: 'Saint Kitts and Nevis', code: 'KN', flag: '0157', online: 0},
     {name: 'Saint Lucia', code: 'LC', flag: '0165', online: 0},
     {name: 'Samoa', code: 'WS', flag: '0282', online: 0},
     {name: 'San Marino', code: 'SM', flag: '0241', online: 0},
     {name: 'Sao Tome and Princ.', code: 'ST', flag: '0246', online: 0},
     {name: 'Senegal', code: 'SN', flag: '0242', online: 0},
     {name: 'Serbia', code: 'RS', flag: '0227', online: 0},
     {name: 'Seychelles', code: 'SC', flag: '0232', online: 0},
     {name: 'Sierra Leone', code: 'SL', flag: '0240', online: 0},
     {name: 'Singapore', code: 'SG', flag: '0235', online: 0},
     {name: 'Slovakia', code: 'SK', flag: '0239', online: 0},
     {name: 'Slovenia', code: 'SI', flag: '0237', online: 0},
     {name: 'Solomon Islands', code: 'SB', flag: '0231', online: 0},
     {name: 'Somalia', code: 'SO', flag: '0243', online: 0},
     {name: 'South Africa', code: 'ZA', flag: '0286', online: 0},
     {name: 'Spain', code: 'ES', flag: '0103', online: 0},
     {name: 'Sri Lanka', code: 'LK', flag: '0167', online: 0},
     {name: 'St Vincent and Green.', code: 'VC', flag: '0275', online: 0},
     {name: 'Sudan', code: 'SD', flag: '0233', online: 0},
     {name: 'Suriname', code: 'SR', flag: '0244', online: 0},
     {name: 'Swaziland', code: 'SZ', flag: '0250', online: 0},
     {name: 'Sweden', code: 'SE', flag: '0234', online: 0},
     {name: 'Switzerland', code: 'CH', flag: '0075', online: 0},
     {name: 'Syria', code: 'SY', flag: '0249', online: 0},
     {name: 'Taiwan', code: 'TW', flag: '0266', online: 0},
     {name: 'Tajikistan', code: 'TJ', flag: '0257', online: 0},
     {name: 'Tanzania', code: 'TZ', flag: '0267', online: 0},
     {name: 'Thailand', code: 'TH', flag: '0256', online: 0},
     {name: 'Togo', code: 'TG', flag: '0255', online: 0},
     {name: 'Tonga', code: 'TO', flag: '0262', online: 0},
     {name: 'Trinidad and Tobago', code: 'TT', flag: '0264', online: 0},
     {name: 'Tunisia', code: 'TN', flag: '0261', online: 0},
     {name: 'Turkey', code: 'TR', flag: '0263', online: 0},
     {name: 'Turkmenistan', code: 'TM', flag: '0260', online: 0},
     {name: 'Tuvalu', code: 'TV', flag: '0265', online: 0},
     {name: 'Uganda', code: 'UG', flag: '0269', online: 0},
     {name: 'Ukraine', code: 'UA', flag: '0268', online: 0},
     {name: 'United Arab Emirates', code: 'AE', flag: '0034', online: 0},
     {name: 'United Kingdom', code: 'GB', flag: '0113', online: 0},
     {name: 'United States', code: 'US', flag: '0270', online: 0},
     {name: 'Uruguay', code: 'UY', flag: '0272', online: 0},
     {name: 'Uzbekistan', code: 'UZ', flag: '0273', online: 0},
     {name: 'Vanuatu', code: 'VU', flag: '0280', online: 0},
     {name: 'Vatican City', code: 'VA', flag: '0274', online: 0},
     {name: 'Venezuela', code: 'VE', flag: '0276', online: 0},
     {name: 'Vietnam', code: 'VN', flag: '0279', online: 0},
     {name: 'British Virgin Islands', code: 'VG', flag: '0277', online: 0},
     {name: 'United States Virgin Islands', code: 'VI', flag: '0278', online: 0},
     {name: 'Western Sahara', code: 'EH', flag: '0101', online: 0},
     {name: 'Yemen', code: 'YE', flag: '0284', online: 0},
     {name: 'Zambia', code: 'ZM', flag: '0287', online: 0},
     {name: 'Zimbabwe', code: 'ZW', flag: '0288', online: 0}
       
    ];




    service.getCountries = function() {
      return countris;
    };


    service.find = function(code) {
      for (var i = 0; i < countris.length; i++) {
        if (countris[i].code == code) {
          return countris[i];
        }
      }
    };


    service.incrementCountry = function(c) {
      var country = service.find(c.code);

      country.online++;
      // alert(country.code + " " + country.online);
    };


    service.decrementCountry = function(c) {
      var country = service.find(c.code);

      country.online--;
      if (country.online < 0) {
        country.online = 0;
      }

      // alert(country.code + " " + country.online);
    };


    service.setMyCountry = function(c) {
      myCountry = c;
      // service.incrementCountry(c);
    };

    service.getMyCountry = function() {
      return myCountry;
    };

    return service;
  });