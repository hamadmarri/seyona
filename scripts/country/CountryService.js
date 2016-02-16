angular.module('phonertcdemo')
  .factory('CountryService', function () {
    
    var myCountry = {};

    var callingCountryCode = '';
    
    var service = {};

    var countris = [
      {name: 'Afghanistan', code: 'AF', flag: '0035', online: 0, welcome: "Wow! you're from Afghanistan!"},
      {name: 'Albania', code: 'AL', flag: '0038', online: 0, welcome: "Wow! you're from Albania!"},
      {name: 'Algeria', code: 'DZ', flag: '0096', online: 0, welcome: "Wow! you're from Algeria!"},
      {name: 'Andorra', code: 'AD', flag: '0033', online: 0, welcome: "Wow! you're from Andorra!"},
      {name: 'Angola', code: 'AO', flag: '0040', online: 0, welcome: "Wow! you're from Angola!"},
      {name: 'Antigua and Barbuda', code: 'AG', flag: '0036', online: 0, welcome: "Wow! you're from Antigua and Barbuda!"},
      {name: 'Argentina', code: 'AR', flag: '0042', online: 0, welcome: "Wow! you're from Argentina!"},
      {name: 'Armenia', code: 'AM', flag: '0039', online: 0, welcome: "Wow! you're from Armenia!"},
      {name: 'Australia', code: 'AU', flag: '0045', online: 0, welcome: "Wow! you're from Australia!"},
      {name: 'Austria', code: 'AT', flag: '0044', online: 0, welcome: "Wow! you're from Austria!"},
      {name: 'Azerbaijan', code: 'AZ', flag: '0048', online: 0, welcome: "Wow! you're from Azerbaijan!"},
      {name: 'Bahamas', code: 'BS', flag: '0064', online: 0, welcome: "Wow! you're from Bahamas!"},
      {name: 'Bahrain', code: 'BH', flag: '0055', online: 0, welcome: "Wow! you're from Bahrain!"},
      {name: 'Bangladesh', code: 'BD', flag: '0051', online: 0, welcome: "Wow! you're from Bangladesh!"},
      {name: 'Barbados', code: 'BB', flag: '0050', online: 0, welcome: "Wow! you're from Barbados!"},
      {name: 'Belarus', code: 'BY', flag: '0068', online: 0, welcome: "Wow! you're from Belarus!"},
      {name: 'Belgium', code: 'BE', flag: '0052', online: 0, welcome: "Wow! you're from Belgium!"},
      {name: 'Belize', code: 'BZ', flag: '0069', online: 0, welcome: "Wow! you're from Belize!"},
      {name: 'Benin', code: 'BJ', flag: '0057', online: 0, welcome: "Wow! you're from Benin!"},
      {name: 'Bhutan', code: 'BT', flag: '0065', online: 0, welcome: "Wow! you're from Bhutan!"},
      {name: 'Bolivia', code: 'BO', flag: '0061', online: 0, welcome: "Wow! you're from Bolivia!"},
      {name: 'Bosnia and Herzegovina', code: 'BA', flag: '0049', online: 0, welcome: "Wow! you're from Bosnia and Herzegovina!"},
      {name: 'Botswana', code: 'BW', flag: '0067', online: 0, welcome: "Wow! you're from Botswana!"},
      {name: 'Brazil', code: 'BR', flag: '0063', online: 0, welcome: "Fique tranquilo!"},
      {name: 'Brunei', code: 'BN', flag: '0060', online: 0, welcome: "Wow! you're from Brunei!"},
      {name: 'Bulgaria', code: 'BG', flag: '0054', online: 0, welcome: "Wow! you're from Bulgaria!"},
      {name: 'Burkina Faso', code: 'BF', flag: '0053', online: 0, welcome: "Wow! you're from Burkina Faso!"},
      {name: 'Burundi', code: 'BI', flag: '0056', online: 0, welcome: "Wow! you're from Burundi!"},
      {name: 'Cambodia', code: 'KH', flag: '0154', online: 0, welcome: "Wow! you're from Cambodia!"},
      {name: 'Cameroon', code: 'CM', flag: '0079', online: 0, welcome: "Wow! you're from Cameroon!"},
      {name: 'Canada', code: 'CA', flag: '0070', online: 0, welcome: "Nice weather today, eh!"},
      {name: 'Cape Verde', code: 'CV', flag: '0085', online: 0, welcome: "Wow! you're from Cape Verde!"},
      {name: 'Central African Republic', code: 'CF', flag: '0073', online: 0, welcome: "Wow! you're from Central African Republic!"},
      {name: 'Chad', code: 'TD', flag: '0226', online: 0, welcome: "Wow! you're from Chad!"},
      {name: 'Chile', code: 'CL', flag: '0078', online: 0, welcome: "Wow! you're from Chile!"},
      {name: 'China', code: 'CN', flag: '0080', online: 0, welcome: "Wow! you're from China!"},
      {name: 'Colombia', code: 'CO', flag: '0081', online: 0, welcome: "Wow! you're from Colombia!"},
      {name: 'Comoros', code: 'KM', flag: '0156', online: 0, welcome: "Wow! you're from Comoros!"},
      {name: 'Congo Democratic Republic', code: 'CD', flag: '0072', online: 0, welcome: "Wow! you're from Congo Democratic Republic!"},
      {name: 'Costa Rica', code: 'CR', flag: '0083', online: 0, welcome: "Wow! you're from Costa Rica!"},
      {name: "Cote D'Ivoire", code: 'CI', flag: '0076', online: 0, welcome: "Wow! you're from Cote D'Ivoire!"},
      {name: 'Croatia', code: 'HR', flag: '0134', online: 0, welcome: "Wow! you're from Croatia!"},
      {name: 'Cuba', code: 'CU', flag: '0084', online: 0, welcome: "Wow! you're from Cuba!"},
      {name: 'Cyprus', code: 'CY', flag: '0088', online: 0, welcome: "Wow! you're from Cyprus!"},
     {name: 'Czech Republic', code: 'CZ', flag: '0089', online: 0, welcome: "Wow! you're from Czech Republic!"},
     {name: 'Denmark', code: 'DK', flag: '0093', online: 0, welcome: "Wow! you're from Denmark!"},
     {name: 'Djibouti', code: 'DJ', flag: '0092', online: 0, welcome: "Wow! you're from Djibouti!"},
     {name: 'Dominica', code: 'DM', flag: '0094', online: 0, welcome: "Wow! you're from Dominica!"},
     {name: 'Dominican Republic', code: 'DO', flag: '0095', online: 0, welcome: "Wow! you're from Dominican Republic!"},
     {name: 'East Timor', code: 'TP', flag: '0259', online: 0, welcome: "Wow! you're from East Timor!"},
     {name: 'Ecuador', code: 'EC', flag: '0098', online: 0, welcome: "Wow! you're from Ecuador!"},
     {name: 'Egypt', code: 'EG', flag: '0100', online: 0, welcome: "Wow! you're from Egypt!"},
     {name: 'El Salvador', code: 'SV', flag: '0247', online: 0, welcome: "Wow! you're from El Salvador!"},
     {name: 'Equatorial Guinea', code: 'GQ', flag: '0124', online: 0, welcome: "Wow! you're from Equatorial Guinea!"},
     {name: 'Eritrea', code: 'ER', flag: '0102', online: 0, welcome: "Wow! you're from Eritrea!"},
     {name: 'Estonia', code: 'EE', flag: '0099', online: 0, welcome: "Wow! you're from Estonia!"},
     {name: 'Ethiopia', code: 'ET', flag: '0104', online: 0, welcome: "Wow! you're from Ethiopia!"},
     {name: 'Fiji', code: 'FJ', flag: '0107', online: 0, welcome: "Wow! you're from Fiji!"},
     {name: 'Finland', code: 'FI', flag: '0106', online: 0, welcome: "Wow! you're from Finland!"},
     {name: 'France', code: 'FR', flag: '0111', online: 0, welcome: "Coup de foudre!"},
     {name: 'French Polynesia', code: 'PF', flag: '0111', online: 0, welcome: "Wow! you're from French Polynesia!"},
     {name: 'Gabon', code: 'GA', flag: '0112', online: 0, welcome: "Wow! you're from Gabon!"},
     {name: 'Gambia', code: 'GM', flag: '0121', online: 0, welcome: "Wow! you're from Gambia!"},
     {name: 'Georgia', code: 'GE', flag: '0115', online: 0, welcome: "Wow! you're from Georgia!"},
     {name: 'Germany', code: 'DE', flag: '0090', online: 0, welcome: "Wow! you're from Germany!"},
     {name: 'Ghana', code: 'GH', flag: '0118', online: 0, welcome: "Wow! you're from Ghana!"},
     {name: 'Gibraltar', code: 'GI', flag: '0119', online: 0, welcome: "Wow! you're from Gibraltar!"},
     {name: 'Greece', code: 'GR', flag: '0125', online: 0, welcome: "Wow! you're from Greece!"},
     {name: 'Greenland', code: 'GL', flag: '0120', online: 0, welcome: "Wow! you're from Greenland!"},
     {name: 'Grenada', code: 'GD', flag: '0114', online: 0, welcome: "Wow! you're from Grenada!"},
     {name: 'Guadeloupe', code: 'GP', flag: '0178', online: 0, welcome: "Wow! you're from Guadeloupe!"},
     {name: 'Guatemala', code: 'GT', flag: '0127', online: 0, welcome: "Wow! you're from Guatemala!"},
     {name: 'Guinea', code: 'GN', flag: '0122', online: 0, welcome: "Wow! you're from Guinea!"},
     {name: 'Guinea-Bissau', code: 'GW', flag: '0129', online: 0, welcome: "Wow! you're from Guinea-Bissau!"},
     {name: 'Guyana', code: 'GY', flag: '0130', online: 0, welcome: "Wow! you're from Guyana!"},
     {name: 'Haiti', code: 'HT', flag: '0135', online: 0, welcome: "Wow! you're from Haiti!"},
     {name: 'Honduras', code: 'HN', flag: '0133', online: 0, welcome: "Wow! you're from Honduras!"},
     {name: 'Hong Kong', code: 'HK', flag: '0131', online: 0, welcome: "Wow! you're from Hong Kong!"},
     {name: 'Hungary', code: 'HU', flag: '0136', online: 0, welcome: "Wow! you're from Hungary!"},
     {name: 'Iceland', code: 'IS', flag: '0146', online: 0, welcome: "Wow! you're from Iceland!"},
     {name: 'India', code: 'IN', flag: '0142', online: 0, welcome: "अच्छी सेहत के लिए!"},
     {name: 'Indonesia', code: 'ID', flag: '0138', online: 0, welcome: "Ada kabar baru?"},
     {name: 'Iran', code: 'IR', flag: '0145', online: 0, welcome: "Wow! you're from Iran!"},
     {name: 'Iraq', code: 'IQ', flag: '0144', online: 0, welcome: "Wow! you're from Iraq!"},
     {name: 'Ireland', code: 'IE', flag: '0139', online: 0, welcome: "Wow! you're from Ireland!"},
     {name: 'Israel', code: 'IL', flag: '0140', online: 0, welcome: "Wow! you're from Israel!"},
     {name: 'Italy', code: 'IT', flag: '0147', online: 0, welcome: "Wow! you're from Italy!"},
     {name: 'Jamaica', code: 'JM', flag: '0149', online: 0, welcome: "Wow! you're from Jamaica!"},
     {name: 'Japan', code: 'JP', flag: '0151', online: 0, welcome: "Wow! you're from Japan!"},
     {name: 'Jordan', code: 'JO', flag: '0150', online: 0, welcome: "Wow! you're from Jordan!"},
     {name: 'Kazakhstan', code: 'KZ', flag: '0162', online: 0, welcome: "Wow! you're from Kazakhstan!"},
     {name: 'Kenya', code: 'KE', flag: '0152', online: 0, welcome: "Wow! you're from Kenya!"},
     {name: 'Kiribati', code: 'KI', flag: '0155', online: 0, welcome: "Wow! you're from Kiribati!"},
     {name: 'North Korea', code: 'KP', flag: '0158', online: 0, welcome: "Wow! you're from North Korea!"},
     {name: 'South Korea', code: 'KR', flag: '0159', online: 0, welcome: "Wow! you're from South Korea!"},
     {name: 'Kuwait', code: 'KW', flag: '0160', online: 0, welcome: "Wow! you're from Kuwait!"},
     {name: 'Kyrgyzstan', code: 'KG', flag: '0153', online: 0, welcome: "Wow! you're from Kyrgyzstan!"},
     {name: 'Laos', code: 'LA', flag: '0163', online: 0, welcome: "Wow! you're from Laos!"},
     {name: 'Latvia', code: 'LV', flag: '0172', online: 0, welcome: "Wow! you're from Latvia!"},
     {name: 'Lebanon', code: 'LB', flag: '0164', online: 0, welcome: "Wow! you're from Lebanon!"},
     {name: 'Lesotho', code: 'LS', flag: '0169', online: 0, welcome: "Wow! you're from Lesotho!"},
     {name: 'Liberia', code: 'LR', flag: '0168', online: 0, welcome: "Wow! you're from Liberia!"},
     {name: 'Libya', code: 'LY', flag: '0173', online: 0, welcome: "Wow! you're from Libya!"},
     {name: 'Liechtenstein', code: 'LI', flag: '0166', online: 0, welcome: "Wow! you're from Liechtenstein!"},
     {name: 'Lithuania', code: 'LT', flag: '0170', online: 0, welcome: "Wow! you're from Lithuania!"},
     {name: 'Luxembourg', code: 'LU', flag: '0171', online: 0, welcome: "Wow! you're from Luxembourg!"},
     {name: 'Macau', code: 'MO', flag: '0185', online: 0, welcome: "Wow! you're from Macau!"},
     {name: 'Macedonia', code: 'MK', flag: '0181', online: 0, welcome: "Wow! you're from Macedonia!"},
     {name: 'Madagascar', code: 'MG', flag: '0179', online: 0, welcome: "Wow! you're from Madagascar!"},
     {name: 'Malawi', code: 'MW', flag: '0193', online: 0, welcome: "Wow! you're from Malawi!"},
     {name: 'Malaysia', code: 'MY', flag: '0195', online: 0, welcome: "Wow! you're from Malaysia!"},
     {name: 'Maldives', code: 'MV', flag: '0192', online: 0, welcome: "Wow! you're from Maldives!"},
     {name: 'Mali', code: 'ML', flag: '0182', online: 0, welcome: "Wow! you're from Mali!"},
     {name: 'Malta', code: 'MT', flag: '0190', online: 0, welcome: "Wow! you're from Malta!"},
     {name: 'Marshall Islands', code: 'MH', flag: '0180', online: 0, welcome: "Wow! you're from Marshall Islands!"},
     {name: 'Martinique', code: 'MQ', flag: '0187', online: 0, welcome: "Wow! you're from Martinique!"},
     {name: 'Mauritania', code: 'MR', flag: '0188', online: 0, welcome: "Wow! you're from Mauritania!"},
     {name: 'Mauritius', code: 'MU', flag: '0191', online: 0, welcome: "Wow! you're from Mauritius!"},
     {name: 'Mexico', code: 'MX', flag: '0194', online: 0, welcome: "Wow! you're from Mexico!"},
     {name: 'Federated States of Micronesia', code: 'FM', flag: '0109', online: 0, welcome: "Wow! you're from Federated States of Micronesia!"},
     {name: 'Moldova', code: 'MD', flag: '0176', online: 0, welcome: "Wow! you're from Moldova!"},
     {name: 'Monaco', code: 'MC', flag: '0175', online: 0, welcome: "Wow! you're from Monaco!"},
     {name: 'Mongolia', code: 'MN', flag: '0184', online: 0, welcome: "Wow! you're from Mongolia!"},
     {name: 'Montenegro', code: 'ME', flag: '0177', online: 0, welcome: "Wow! you're from Montenegro!"},
     {name: 'Morocco', code: 'MA', flag: '0174', online: 0, welcome: "Wow! you're from Morocco!"},
     {name: 'Mozambique', code: 'MZ', flag: '0196', online: 0, welcome: "Wow! you're from Mozambique!"},
     {name: 'Myanmar', code: 'MM', flag: '0183', online: 0, welcome: "Wow! you're from Myanmar!"},
     {name: 'Namibia', code: 'NA', flag: '0197', online: 0, welcome: "Wow! you're from Namibia!"},
     {name: 'Nauru', code: 'NR', flag: '0206', online: 0, welcome: "Wow! you're from Nauru!"},
     {name: 'Nepal', code: 'NP', flag: '0205', online: 0, welcome: "Wow! you're from Nepal!"},
     {name: 'Netherlands', code: 'NL', flag: '0203', online: 0, welcome: "Wow! you're from Netherlands!"},
     {name: 'New Caledonia', code: 'NC', flag: '0281', online: 0, welcome: "Wow! you're from New Caledonia!"},
     {name: 'New Zealand', code: 'NZ', flag: '0208', online: 0, welcome: "Wow! you're from New Zealand!"},
     {name: 'Nicaragua', code: 'NI', flag: '0202', online: 0, welcome: "Wow! you're from Nicaragua!"},
     {name: 'Niger', code: 'NE', flag: '0199', online: 0, welcome: "Wow! you're from Niger!"},
     {name: 'Nigeria', code: 'NG', flag: '0201', online: 0, welcome: "Wow! you're from Nigeria!"},
     {name: 'Northern Mariana Islands', code: 'MP', flag: '0186', online: 0, welcome: "Wow! you're from Northern Mariana Islands!"},
     {name: 'Norway', code: 'NO', flag: '0066', online: 0, welcome: "Wow! you're from Norway!"},
     {name: 'Oman', code: 'OM', flag: '0209', online: 0, welcome: "Wow! you're from Oman!"},
     {name: 'Pakistan', code: 'PK', flag: '0215', online: 0, welcome: "اچھی صہت کۓ لی‍ۓ!"},
     {name: 'Palau', code: 'PW', flag: '0222', online: 0, welcome: "Wow! you're from Palau!"},
     {name: 'Palestine', code: 'PS', flag: '0220', online: 0, welcome: "Wow! you're from Palestine!"},
     {name: 'Panama', code: 'PA', flag: '0210', online: 0, welcome: "Wow! you're from Panama!"},
     {name: 'Papua New Guinea', code: 'PG', flag: '0213', online: 0, welcome: "Wow! you're from Papua New Guinea!"},
     {name: 'Paraguay', code: 'PY', flag: '0223', online: 0, welcome: "Wow! you're from Paraguay!"},
     {name: 'Peru', code: 'PE', flag: '0211', online: 0, welcome: "Wow! you're from Peru!"},
     {name: 'Philippines', code: 'PH', flag: '0214', online: 0, welcome: "Wow! you're from Philippines!"},
     {name: 'Poland', code: 'PL', flag: '0216', online: 0, welcome: "Wow! you're from Poland!"},
     {name: 'Portugal', code: 'PT', flag: '0221', online: 0, welcome: "Wow! you're from Portugal!"},
     {name: 'Puerto Rico', code: 'PR', flag: '0219', online: 0, welcome: "Wow! you're from Puerto Rico!"},
     {name: 'Qatar', code: 'QA', flag: '0224', online: 0, welcome: "Wow! you're from Qatar!"},
     {name: 'Reunion', code: 'RE', flag: '0111', online: 0, welcome: "Wow! you're from Reunion!"},
     {name: 'Romania', code: 'RO', flag: '0253', online: 0, welcome: "Wow! you're from Romania!"},
     {name: 'Russia', code: 'RU', flag: '0228', online: 0, welcome: "Wow! you're from Russia!"},
     {name: 'Rwanda', code: 'RW', flag: '0229', online: 0, welcome: "Wow! you're from Rwanda!"},
     {name: 'Saint Kitts and Nevis', code: 'KN', flag: '0157', online: 0, welcome: "Wow! you're from Saint Kitts and Nevis!"},
     {name: 'Saint Lucia', code: 'LC', flag: '0165', online: 0, welcome: "Wow! you're from Saint Lucia!"},
     {name: 'Samoa', code: 'WS', flag: '0282', online: 0, welcome: "Wow! you're from Samoa!"},
     {name: 'San Marino', code: 'SM', flag: '0241', online: 0, welcome: "Wow! you're from San Marino!"},
     {name: 'Sao Tome and Princ.', code: 'ST', flag: '0246', online: 0, welcome: "Wow! you're from Sao Tome and Princ.!"},
     {name: 'Saudi Arabia', code: 'SA', flag: '0230', online: 0, welcome: "احلى يا سعودي! منور والله"},
     {name: 'Senegal', code: 'SN', flag: '0242', online: 0, welcome: "Wow! you're from Senegal!"},
     {name: 'Serbia', code: 'RS', flag: '0227', online: 0, welcome: "Wow! you're from Serbia!"},
     {name: 'Seychelles', code: 'SC', flag: '0232', online: 0, welcome: "Wow! you're from Seychelles!"},
     {name: 'Sierra Leone', code: 'SL', flag: '0240', online: 0, welcome: "Wow! you're from Sierra Leone!"},
     {name: 'Singapore', code: 'SG', flag: '0235', online: 0, welcome: "Wow! you're from Singapore!"},
     {name: 'Slovakia', code: 'SK', flag: '0239', online: 0, welcome: "Wow! you're from Slovakia!"},
     {name: 'Slovenia', code: 'SI', flag: '0237', online: 0, welcome: "Wow! you're from Slovenia!"},
     {name: 'Solomon Islands', code: 'SB', flag: '0231', online: 0, welcome: "Wow! you're from Solomon Islands!"},
     {name: 'Somalia', code: 'SO', flag: '0243', online: 0, welcome: "Wow! you're from Somalia!"},
     {name: 'South Africa', code: 'ZA', flag: '0286', online: 0, welcome: "Wow! you're from South Africa!"},
     {name: 'Spain', code: 'ES', flag: '0103', online: 0, welcome: "Wow! you're from Spain!"},
     {name: 'Sri Lanka', code: 'LK', flag: '0167', online: 0, welcome: "Wow! you're from Sri Lanka!"},
     {name: 'St Vincent and Green.', code: 'VC', flag: '0275', online: 0, welcome: "Wow! you're from St Vincent and Green.!"},
     {name: 'Sudan', code: 'SD', flag: '0233', online: 0, welcome: "Wow! you're from Sudan!"},
     {name: 'Suriname', code: 'SR', flag: '0244', online: 0, welcome: "Wow! you're from Suriname!"},
     {name: 'Swaziland', code: 'SZ', flag: '0250', online: 0, welcome: "Wow! you're from Swaziland!"},
     {name: 'Sweden', code: 'SE', flag: '0234', online: 0, welcome: "Wow! you're from Sweden!"},
     {name: 'Switzerland', code: 'CH', flag: '0075', online: 0, welcome: "Wow! you're from Switzerland!"},
     {name: 'Syria', code: 'SY', flag: '0249', online: 0, welcome: "Wow! you're from Syria!"},
     {name: 'Taiwan', code: 'TW', flag: '0266', online: 0, welcome: "Wow! you're from Taiwan!"},
     {name: 'Tajikistan', code: 'TJ', flag: '0257', online: 0, welcome: "Wow! you're from Tajikistan!"},
     {name: 'Tanzania', code: 'TZ', flag: '0267', online: 0, welcome: "Wow! you're from Tanzania!"},
     {name: 'Thailand', code: 'TH', flag: '0256', online: 0, welcome: "Wow! you're from Thailand!"},
     {name: 'Togo', code: 'TG', flag: '0255', online: 0, welcome: "Wow! you're from Togo!"},
     {name: 'Tonga', code: 'TO', flag: '0262', online: 0, welcome: "Wow! you're from Tonga!"},
     {name: 'Trinidad and Tobago', code: 'TT', flag: '0264', online: 0, welcome: "Wow! you're from Trinidad and Tobago!"},
     {name: 'Tunisia', code: 'TN', flag: '0261', online: 0, welcome: "Wow! you're from Tunisia!"},
     {name: 'Turkey', code: 'TR', flag: '0263', online: 0, welcome: "Boşver!"},
     {name: 'Turkmenistan', code: 'TM', flag: '0260', online: 0, welcome: "Wow! you're from Turkmenistan!"},
     {name: 'Tuvalu', code: 'TV', flag: '0265', online: 0, welcome: "Wow! you're from Tuvalu!"},
     {name: 'Uganda', code: 'UG', flag: '0269', online: 0, welcome: "Wow! you're from Uganda!"},
     {name: 'Ukraine', code: 'UA', flag: '0268', online: 0, welcome: "Wow! you're from Ukraine!"},
     {name: 'United Arab Emirates', code: 'AE', flag: '0034', online: 0, welcome: "احلى رمسة"},
     {name: 'United Kingdom', code: 'GB', flag: '0113', online: 0, welcome: "Bob’s your uncle!"},
     {name: 'United States', code: 'US', flag: '0270', online: 0, welcome: "It is the time to blow off steam!"},
     {name: 'Uruguay', code: 'UY', flag: '0272', online: 0, welcome: "Wow! you're from Uruguay!"},
     {name: 'Uzbekistan', code: 'UZ', flag: '0273', online: 0, welcome: "Wow! you're from Uzbekistan!"},
     {name: 'Vanuatu', code: 'VU', flag: '0280', online: 0, welcome: "Wow! you're from Vanuatu!"},
     {name: 'Vatican City', code: 'VA', flag: '0274', online: 0, welcome: "Wow! you're from Vatican City!"},
     {name: 'Venezuela', code: 'VE', flag: '0276', online: 0, welcome: "Wow! you're from Venezuela!"},
     {name: 'Vietnam', code: 'VN', flag: '0279', online: 0, welcome: "Wow! you're from Vietnam!"},
     {name: 'British Virgin Islands', code: 'VG', flag: '0277', online: 0, welcome: "Wow! you're from British Virgin Islands!"},
     {name: 'United States Virgin Islands', code: 'VI', flag: '0278', online: 0, welcome: "Wow! you're from United States Virgin Islands!"},
     {name: 'Western Sahara', code: 'EH', flag: '0101', online: 0, welcome: "Wow! you're from Western Sahara!"},
     {name: 'Yemen', code: 'YE', flag: '0284', online: 0, welcome: "Wow! you're from Yemen!"},
     {name: 'Zambia', code: 'ZM', flag: '0287', online: 0, welcome: "Wow! you're from Zambia!"},
     {name: 'Zimbabwe', code: 'ZW', flag: '0288', online: 0, welcome: "Wow! you're fro Zimbabwem!"}
       
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


    service.incrementCountry = function(code) {
      var country = service.find(code);

      country.online++;
      // alert(country.code + " " + country.online);
    };


    service.decrementCountry = function(code) {
      var country = service.find(code);

      country.online--;
      if (country.online < 0) {
        country.online = 0;
      }

      // alert(country.code + " " + country.online);
    };


    service.clearCountryCounters = function() {
      for (var i = 0; i < countris.length; i++) {
        countris[i].online = 0;
      }
    };


    service.setMyCountry = function(c) {
      myCountry = c;
    };

    service.getMyCountry = function() {
      return myCountry;
    };


    service.setCallingCountryCode = function(code) {
      callingCountryCode = code;
    };


    service.getCallingCountryCode = function() {
      return callingCountryCode;
    };

    return service;
  });