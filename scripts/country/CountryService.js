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


      {name: 'Botswana', code: 'BW', flag: '0000', online: 0},
      {name: 'Brazil', code: 'BR', flag: '0000', online: 0},
      {name: 'Brunei', code: 'BN', flag: '0000', online: 0},
      {name: 'Bulgaria', code: 'BG', flag: '0000', online: 0},
      {name: 'Burkina Faso', code: 'BF', flag: '0000', online: 0},
      {name: 'Burundi', code: 'BI', flag: '0000', online: 0},
      {name: 'Cambodia', code: 'KH', flag: '0000', online: 0},
      {name: 'Cameroon', code: 'CM', flag: '0000', online: 0},
      {name: 'Canada', code: 'CA', flag: '0000', online: 0},
      {name: 'Cape Verde', code: 'CV', flag: '0000', online: 0},
      {name: 'Central African Republic', code: 'CF', flag: '0000', online: 0},
      {name: 'Chad', code: 'TD', flag: '0000', online: 0},
      {name: 'Chile', code: 'CL', flag: '0000', online: 0},
      {name: 'China', code: 'CN', flag: '0000', online: 0},
      {name: 'Colombia', code: 'CO', flag: '0000', online: 0},
      {name: 'Comoros', code: 'KM', flag: '0000', online: 0},
      {name: 'Congo Democratic Republic', code: 'CD', flag: '0000', online: 0},
      {name: 'Costa Rica', code: 'CR', flag: '0000', online: 0},
      {name: "Cote D'Ivoire", code: 'CI', flag: '0000', online: 0},
      {name: 'Croatia', code: 'HR', flag: '0000', online: 0},
      {name: 'Cuba', code: 'CU', flag: '0000', online: 0},
      {name: 'Cyprus', code: 'CY', flag: '0000', online: 0},
      


       {name: 'Czech Republic', code: 'CZ', flag: '0000', online: 0},
       {name: 'Denmark', code: 'DK', flag: '0000', online: 0},
       {name: 'Djibouti', code: 'DJ', flag: '0000', online: 0},
       {name: 'Dominica', code: 'DM', flag: '0000', online: 0},
       {name: 'Dominican Republic', code: 'DO', flag: '0000', online: 0},
       {name: 'East', code: 'TP', flag: '0000', online: 0},
       {name: 'Ecuador', code: 'EC', flag: '0000', online: 0},
       {name: 'Egypt', code: 'EG', flag: '0000', online: 0},
       {name: 'El Salvador', code: 'SV', flag: '0000', online: 0},
       {name: 'Equatorial Guinea', code: 'GQ', flag: '0000', online: 0},
       {name: 'Eritrea', code: 'ER', flag: '0000', online: 0},
       {name: 'Estonia', code: 'EE', flag: '0000', online: 0},
       {name: 'Ethiopia', code: 'ET', flag: '0000', online: 0},
       {name: 'Fiji', code: 'FJ', flag: '0000', online: 0},
       {name: 'Finland', code: 'FI', flag: '0000', online: 0},
       {name: 'France', code: 'FR', flag: '0000', online: 0},



       {name: 'French Polynesia', code: 'PF', flag: '0000', online: 0},
       {name: 'Gabon', code: 'GA', flag: '0000', online: 0},
       {name: 'Gambia', code: 'GM', flag: '0000', online: 0},
       {name: 'Georgia', code: 'GE', flag: '0000', online: 0},
       {name: 'Germany', code: 'DE', flag: '0000', online: 0},
       {name: 'Ghana', code: 'GH', flag: '0000', online: 0},
       {name: 'Gibraltar', code: 'GI', flag: '0000', online: 0},
       {name: 'Greece', code: 'GR', flag: '0000', online: 0},
       {name: 'Greenland', code: 'GL', flag: '0000', online: 0},
       {name: 'Grenada', code: 'GD', flag: '0000', online: 0},
       {name: 'Guadeloupe', code: 'GP', flag: '0000', online: 0},
       {name: 'Guatemala', code: 'GT', flag: '0000', online: 0},
       {name: 'Guinea', code: 'GN', flag: '0000', online: 0},
       {name: 'Guinea-Bissau', code: 'GW', flag: '0000', online: 0},
       {name: 'Guyana', code: 'GY', flag: '0000', online: 0},
       {name: 'Haiti', code: 'HT', flag: '0000', online: 0},
       {name: 'Honduras', code: 'HN', flag: '0000', online: 0},
       {name: 'Hong', code: 'HK', flag: '0000', online: 0},
       {name: 'Hungary', code: 'HU', flag: '0000', online: 0},
       {name: 'Iceland', code: 'IS', flag: '0000', online: 0},
       {name: 'India', code: 'IN', flag: '0000', online: 0},
       {name: 'Indonesia', code: 'ID', flag: '0000', online: 0},
       {name: 'Iran', code: 'IR', flag: '0000', online: 0},
       {name: 'Iraq', code: 'IQ', flag: '0000', online: 0},
       {name: 'Ireland', code: 'IE', flag: '0000', online: 0},
       {name: 'Israel', code: 'IL', flag: '0000', online: 0},
       {name: 'Italy', code: 'IT', flag: '0000', online: 0},
       {name: 'Jamaica', code: 'JM', flag: '0000', online: 0},
       {name: 'Japan', code: 'JP', flag: '0000', online: 0},
       {name: 'Jordan', code: 'JO', flag: '0000', online: 0},
       {name: 'Kazakhstan', code: 'KZ', flag: '0000', online: 0},
       {name: 'Kenya', code: 'KE', flag: '0000', online: 0},
       {name: 'Kiribati', code: 'KI', flag: '0000', online: 0},
       {name: 'North Korea', code: 'KP', flag: '0000', online: 0},
       {name: 'South Korea', code: 'KR', flag: '0000', online: 0},
       {name: 'Kuwait', code: 'KW', flag: '0000', online: 0},
       


    ];




    service.getCountries = function() {
      return countris;
    };

    return service;
  });