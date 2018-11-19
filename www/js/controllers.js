angular.module('starter.controllers', [])


// Authentication controller
// Put your login, register functions here
        .controller('AuthCtrl', function ($scope, $rootScope, $ionicHistory, sharedUtils, $state, $stateParams, $ionicSideMenuDelegate, auth, credenciales, $filter) {
            $scope.selectedCountry = {}
            $scope.countries = [{
                    name: "United States",
                    dial_code: "+1",
                    code: "US"
                }, {
                    name: "Israel",
                    dial_code: "+972",
                    code: "IL"
                }, {
                    name: "Afghanistan",
                    dial_code: "+93",
                    code: "AF"
                }, {
                    name: "Albania",
                    dial_code: "+355",
                    code: "AL"
                }, {
                    name: "Algeria",
                    dial_code: "+213",
                    code: "DZ"
                }, {
                    name: "AmericanSamoa",
                    dial_code: "+1 684",
                    code: "AS"
                }, {
                    name: "Andorra",
                    dial_code: "+376",
                    code: "AD"
                }, {
                    name: "Angola",
                    dial_code: "+244",
                    code: "AO"
                }, {
                    name: "Anguilla",
                    dial_code: "+1 264",
                    code: "AI"
                }, {
                    name: "Antigua and Barbuda",
                    dial_code: "+1268",
                    code: "AG"
                }, {
                    name: "Argentina",
                    dial_code: "+54",
                    code: "AR"
                }, {
                    name: "Armenia",
                    dial_code: "+374",
                    code: "AM"
                }, {
                    name: "Aruba",
                    dial_code: "+297",
                    code: "AW"
                }, {
                    name: "Australia",
                    dial_code: "+61",
                    code: "AU"
                }, {
                    name: "Austria",
                    dial_code: "+43",
                    code: "AT"
                }, {
                    name: "Azerbaijan",
                    dial_code: "+994",
                    code: "AZ"
                }, {
                    name: "Bahamas",
                    dial_code: "+1 242",
                    code: "BS"
                }, {
                    name: "Bahrain",
                    dial_code: "+973",
                    code: "BH"
                }, {
                    name: "Bangladesh",
                    dial_code: "+880",
                    code: "BD"
                }, {
                    name: "Barbados",
                    dial_code: "+1 246",
                    code: "BB"
                }, {
                    name: "Belarus",
                    dial_code: "+375",
                    code: "BY"
                }, {
                    name: "Belgium",
                    dial_code: "+32",
                    code: "BE"
                }, {
                    name: "Belize",
                    dial_code: "+501",
                    code: "BZ"
                }, {
                    name: "Benin",
                    dial_code: "+229",
                    code: "BJ"
                }, {
                    name: "Bermuda",
                    dial_code: "+1 441",
                    code: "BM"
                }, {
                    name: "Bhutan",
                    dial_code: "+975",
                    code: "BT"
                }, {
                    name: "Bosnia and Herzegovina",
                    dial_code: "+387",
                    code: "BA"
                }, {
                    name: "Botswana",
                    dial_code: "+267",
                    code: "BW"
                }, {
                    name: "Brazil",
                    dial_code: "+55",
                    code: "BR"
                }, {
                    name: "British Indian Ocean Territory",
                    dial_code: "+246",
                    code: "IO"
                }, {
                    name: "Bulgaria",
                    dial_code: "+359",
                    code: "BG"
                }, {
                    name: "Burkina Faso",
                    dial_code: "+226",
                    code: "BF"
                }, {
                    name: "Burundi",
                    dial_code: "+257",
                    code: "BI"
                }, {
                    name: "Cambodia",
                    dial_code: "+855",
                    code: "KH"
                }, {
                    name: "Cameroon",
                    dial_code: "+237",
                    code: "CM"
                }, {
                    name: "Canada",
                    dial_code: "+1",
                    code: "CA"
                }, {
                    name: "Cape Verde",
                    dial_code: "+238",
                    code: "CV"
                }, {
                    name: "Cayman Islands",
                    dial_code: "+ 345",
                    code: "KY"
                }, {
                    name: "Central African Republic",
                    dial_code: "+236",
                    code: "CF"
                }, {
                    name: "Chad",
                    dial_code: "+235",
                    code: "TD"
                }, {
                    name: "Chile",
                    dial_code: "+56",
                    code: "CL"
                }, {
                    name: "China",
                    dial_code: "+86",
                    code: "CN"
                }, {
                    name: "Christmas Island",
                    dial_code: "+61",
                    code: "CX"
                }, {
                    name: "Colombia",
                    dial_code: "+57",
                    code: "CO"
                }, {
                    name: "Comoros",
                    dial_code: "+269",
                    code: "KM"
                }, {
                    name: "Congo",
                    dial_code: "+242",
                    code: "CG"
                }, {
                    name: "Cook Islands",
                    dial_code: "+682",
                    code: "CK"
                }, {
                    name: "Costa Rica",
                    dial_code: "+506",
                    code: "CR"
                }, {
                    name: "Croatia",
                    dial_code: "+385",
                    code: "HR"
                }, {
                    name: "Cuba",
                    dial_code: "+53",
                    code: "CU"
                }, {
                    name: "Cyprus",
                    dial_code: "+537",
                    code: "CY"
                }, {
                    name: "Czech Republic",
                    dial_code: "+420",
                    code: "CZ"
                }, {
                    name: "Denmark",
                    dial_code: "+45",
                    code: "DK"
                }, {
                    name: "Djibouti",
                    dial_code: "+253",
                    code: "DJ"
                }, {
                    name: "Dominica",
                    dial_code: "+1 767",
                    code: "DM"
                }, {
                    name: "Dominican Republic",
                    dial_code: "+1 849",
                    code: "DO"
                }, {
                    name: "Ecuador",
                    dial_code: "+593",
                    code: "EC"
                }, {
                    name: "Egypt",
                    dial_code: "+20",
                    code: "EG"
                }, {
                    name: "El Salvador",
                    dial_code: "+503",
                    code: "SV"
                }, {
                    name: "Equatorial Guinea",
                    dial_code: "+240",
                    code: "GQ"
                }, {
                    name: "Eritrea",
                    dial_code: "+291",
                    code: "ER"
                }, {
                    name: "Estonia",
                    dial_code: "+372",
                    code: "EE"
                }, {
                    name: "Ethiopia",
                    dial_code: "+251",
                    code: "ET"
                }, {
                    name: "Faroe Islands",
                    dial_code: "+298",
                    code: "FO"
                }, {
                    name: "Fiji",
                    dial_code: "+679",
                    code: "FJ"
                }, {
                    name: "Finland",
                    dial_code: "+358",
                    code: "FI"
                }, {
                    name: "France",
                    dial_code: "+33",
                    code: "FR"
                }, {
                    name: "French Guiana",
                    dial_code: "+594",
                    code: "GF"
                }, {
                    name: "French Polynesia",
                    dial_code: "+689",
                    code: "PF"
                }, {
                    name: "Gabon",
                    dial_code: "+241",
                    code: "GA"
                }, {
                    name: "Gambia",
                    dial_code: "+220",
                    code: "GM"
                }, {
                    name: "Georgia",
                    dial_code: "+995",
                    code: "GE"
                }, {
                    name: "Germany",
                    dial_code: "+49",
                    code: "DE"
                }, {
                    name: "Ghana",
                    dial_code: "+233",
                    code: "GH"
                }, {
                    name: "Gibraltar",
                    dial_code: "+350",
                    code: "GI"
                }, {
                    name: "Greece",
                    dial_code: "+30",
                    code: "GR"
                }, {
                    name: "Greenland",
                    dial_code: "+299",
                    code: "GL"
                }, {
                    name: "Grenada",
                    dial_code: "+1 473",
                    code: "GD"
                }, {
                    name: "Guadeloupe",
                    dial_code: "+590",
                    code: "GP"
                }, {
                    name: "Guam",
                    dial_code: "+1 671",
                    code: "GU"
                }, {
                    name: "Guatemala",
                    dial_code: "+502",
                    code: "GT"
                }, {
                    name: "Guinea",
                    dial_code: "+224",
                    code: "GN"
                }, {
                    name: "Guinea-Bissau",
                    dial_code: "+245",
                    code: "GW"
                }, {
                    name: "Guyana",
                    dial_code: "+595",
                    code: "GY"
                }, {
                    name: "Haiti",
                    dial_code: "+509",
                    code: "HT"
                }, {
                    name: "Honduras",
                    dial_code: "+504",
                    code: "HN"
                }, {
                    name: "Hungary",
                    dial_code: "+36",
                    code: "HU"
                }, {
                    name: "Iceland",
                    dial_code: "+354",
                    code: "IS"
                }, {
                    name: "India",
                    dial_code: "+91",
                    code: "IN"
                }, {
                    name: "Indonesia",
                    dial_code: "+62",
                    code: "ID"
                }, {
                    name: "Iraq",
                    dial_code: "+964",
                    code: "IQ"
                }, {
                    name: "Ireland",
                    dial_code: "+353",
                    code: "IE"
                }, {
                    name: "Israel",
                    dial_code: "+972",
                    code: "IL"
                }, {
                    name: "Italy",
                    dial_code: "+39",
                    code: "IT"
                }, {
                    name: "Jamaica",
                    dial_code: "+1 876",
                    code: "JM"
                }, {
                    name: "Japan",
                    dial_code: "+81",
                    code: "JP"
                }, {
                    name: "Jordan",
                    dial_code: "+962",
                    code: "JO"
                }, {
                    name: "Kazakhstan",
                    dial_code: "+7 7",
                    code: "KZ"
                }, {
                    name: "Kenya",
                    dial_code: "+254",
                    code: "KE"
                }, {
                    name: "Kiribati",
                    dial_code: "+686",
                    code: "KI"
                }, {
                    name: "Kuwait",
                    dial_code: "+965",
                    code: "KW"
                }, {
                    name: "Kyrgyzstan",
                    dial_code: "+996",
                    code: "KG"
                }, {
                    name: "Latvia",
                    dial_code: "+371",
                    code: "LV"
                }, {
                    name: "Lebanon",
                    dial_code: "+961",
                    code: "LB"
                }, {
                    name: "Lesotho",
                    dial_code: "+266",
                    code: "LS"
                }, {
                    name: "Liberia",
                    dial_code: "+231",
                    code: "LR"
                }, {
                    name: "Liechtenstein",
                    dial_code: "+423",
                    code: "LI"
                }, {
                    name: "Lithuania",
                    dial_code: "+370",
                    code: "LT"
                }, {
                    name: "Luxembourg",
                    dial_code: "+352",
                    code: "LU"
                }, {
                    name: "Madagascar",
                    dial_code: "+261",
                    code: "MG"
                }, {
                    name: "Malawi",
                    dial_code: "+265",
                    code: "MW"
                }, {
                    name: "Malaysia",
                    dial_code: "+60",
                    code: "MY"
                }, {
                    name: "Maldives",
                    dial_code: "+960",
                    code: "MV"
                }, {
                    name: "Mali",
                    dial_code: "+223",
                    code: "ML"
                }, {
                    name: "Malta",
                    dial_code: "+356",
                    code: "MT"
                }, {
                    name: "Marshall Islands",
                    dial_code: "+692",
                    code: "MH"
                }, {
                    name: "Martinique",
                    dial_code: "+596",
                    code: "MQ"
                }, {
                    name: "Mauritania",
                    dial_code: "+222",
                    code: "MR"
                }, {
                    name: "Mauritius",
                    dial_code: "+230",
                    code: "MU"
                }, {
                    name: "Mayotte",
                    dial_code: "+262",
                    code: "YT"
                }, {
                    name: "Mexico",
                    dial_code: "+52",
                    code: "MX"
                }, {
                    name: "Monaco",
                    dial_code: "+377",
                    code: "MC"
                }, {
                    name: "Mongolia",
                    dial_code: "+976",
                    code: "MN"
                }, {
                    name: "Montenegro",
                    dial_code: "+382",
                    code: "ME"
                }, {
                    name: "Montserrat",
                    dial_code: "+1664",
                    code: "MS"
                }, {
                    name: "Morocco",
                    dial_code: "+212",
                    code: "MA"
                }, {
                    name: "Myanmar",
                    dial_code: "+95",
                    code: "MM"
                }, {
                    name: "Namibia",
                    dial_code: "+264",
                    code: "NA"
                }, {
                    name: "Nauru",
                    dial_code: "+674",
                    code: "NR"
                }, {
                    name: "Nepal",
                    dial_code: "+977",
                    code: "NP"
                }, {
                    name: "Netherlands",
                    dial_code: "+31",
                    code: "NL"
                }, {
                    name: "Netherlands Antilles",
                    dial_code: "+599",
                    code: "AN"
                }, {
                    name: "New Caledonia",
                    dial_code: "+687",
                    code: "NC"
                }, {
                    name: "New Zealand",
                    dial_code: "+64",
                    code: "NZ"
                }, {
                    name: "Nicaragua",
                    dial_code: "+505",
                    code: "NI"
                }, {
                    name: "Niger",
                    dial_code: "+227",
                    code: "NE"
                }, {
                    name: "Nigeria",
                    dial_code: "+234",
                    code: "NG"
                }, {
                    name: "Niue",
                    dial_code: "+683",
                    code: "NU"
                }, {
                    name: "Norfolk Island",
                    dial_code: "+672",
                    code: "NF"
                }, {
                    name: "Northern Mariana Islands",
                    dial_code: "+1 670",
                    code: "MP"
                }, {
                    name: "Norway",
                    dial_code: "+47",
                    code: "NO"
                }, {
                    name: "Oman",
                    dial_code: "+968",
                    code: "OM"
                }, {
                    name: "Pakistan",
                    dial_code: "+92",
                    code: "PK"
                }, {
                    name: "Palau",
                    dial_code: "+680",
                    code: "PW"
                }, {
                    name: "Panama",
                    dial_code: "+507",
                    code: "PA"
                }, {
                    name: "Papua New Guinea",
                    dial_code: "+675",
                    code: "PG"
                }, {
                    name: "Paraguay",
                    dial_code: "+595",
                    code: "PY"
                }, {
                    name: "Peru",
                    dial_code: "+51",
                    code: "PE"
                }, {
                    name: "Philippines",
                    dial_code: "+63",
                    code: "PH"
                }, {
                    name: "Poland",
                    dial_code: "+48",
                    code: "PL"
                }, {
                    name: "Portugal",
                    dial_code: "+351",
                    code: "PT"
                }, {
                    name: "Puerto Rico",
                    dial_code: "+1 939",
                    code: "PR"
                }, {
                    name: "Qatar",
                    dial_code: "+974",
                    code: "QA"
                }, {
                    name: "Romania",
                    dial_code: "+40",
                    code: "RO"
                }, {
                    name: "Rwanda",
                    dial_code: "+250",
                    code: "RW"
                }, {
                    name: "Samoa",
                    dial_code: "+685",
                    code: "WS"
                }, {
                    name: "San Marino",
                    dial_code: "+378",
                    code: "SM"
                }, {
                    name: "Saudi Arabia",
                    dial_code: "+966",
                    code: "SA"
                }, {
                    name: "Senegal",
                    dial_code: "+221",
                    code: "SN"
                }, {
                    name: "Serbia",
                    dial_code: "+381",
                    code: "RS"
                }, {
                    name: "Seychelles",
                    dial_code: "+248",
                    code: "SC"
                }, {
                    name: "Sierra Leone",
                    dial_code: "+232",
                    code: "SL"
                }, {
                    name: "Singapore",
                    dial_code: "+65",
                    code: "SG"
                }, {
                    name: "Slovakia",
                    dial_code: "+421",
                    code: "SK"
                }, {
                    name: "Slovenia",
                    dial_code: "+386",
                    code: "SI"
                }, {
                    name: "Solomon Islands",
                    dial_code: "+677",
                    code: "SB"
                }, {
                    name: "South Africa",
                    dial_code: "+27",
                    code: "ZA"
                }, {
                    name: "South Georgia and the South Sandwich Islands",
                    dial_code: "+500",
                    code: "GS"
                }, {
                    name: "Spain",
                    dial_code: "+34",
                    code: "ES"
                }, {
                    name: "Sri Lanka",
                    dial_code: "+94",
                    code: "LK"
                }, {
                    name: "Sudan",
                    dial_code: "+249",
                    code: "SD"
                }, {
                    name: "Suriname",
                    dial_code: "+597",
                    code: "SR"
                }, {
                    name: "Swaziland",
                    dial_code: "+268",
                    code: "SZ"
                }, {
                    name: "Sweden",
                    dial_code: "+46",
                    code: "SE"
                }, {
                    name: "Switzerland",
                    dial_code: "+41",
                    code: "CH"
                }, {
                    name: "Tajikistan",
                    dial_code: "+992",
                    code: "TJ"
                }, {
                    name: "Thailand",
                    dial_code: "+66",
                    code: "TH"
                }, {
                    name: "Togo",
                    dial_code: "+228",
                    code: "TG"
                }, {
                    name: "Tokelau",
                    dial_code: "+690",
                    code: "TK"
                }, {
                    name: "Tonga",
                    dial_code: "+676",
                    code: "TO"
                }, {
                    name: "Trinidad and Tobago",
                    dial_code: "+1 868",
                    code: "TT"
                }, {
                    name: "Tunisia",
                    dial_code: "+216",
                    code: "TN"
                }, {
                    name: "Turkey",
                    dial_code: "+90",
                    code: "TR"
                }, {
                    name: "Turkmenistan",
                    dial_code: "+993",
                    code: "TM"
                }, {
                    name: "Turks and Caicos Islands",
                    dial_code: "+1 649",
                    code: "TC"
                }, {
                    name: "Tuvalu",
                    dial_code: "+688",
                    code: "TV"
                }, {
                    name: "Uganda",
                    dial_code: "+256",
                    code: "UG"
                }, {
                    name: "Ukraine",
                    dial_code: "+380",
                    code: "UA"
                }, {
                    name: "United Arab Emirates",
                    dial_code: "+971",
                    code: "AE"
                }, {
                    name: "United Kingdom",
                    dial_code: "+44",
                    code: "GB"
                }, {
                    name: "Uruguay",
                    dial_code: "+598",
                    code: "UY"
                }, {
                    name: "Uzbekistan",
                    dial_code: "+998",
                    code: "UZ"
                }, {
                    name: "Vanuatu",
                    dial_code: "+678",
                    code: "VU"
                }, {
                    name: "Wallis and Futuna",
                    dial_code: "+681",
                    code: "WF"
                }, {
                    name: "Yemen",
                    dial_code: "+967",
                    code: "YE"
                }, {
                    name: "Zambia",
                    dial_code: "+260",
                    code: "ZM"
                }, {
                    name: "Zimbabwe",
                    dial_code: "+263",
                    code: "ZW"
                }, {
                    name: "land Islands",
                    dial_code: "",
                    code: "AX"
                }, {
                    name: "Antarctica",
                    dial_code: null,
                    code: "AQ"
                }, {
                    name: "Bolivia, Plurinational State of",
                    dial_code: "+591",
                    code: "BO"
                }, {
                    name: "Brunei Darussalam",
                    dial_code: "+673",
                    code: "BN"
                }, {
                    name: "Cocos (Keeling) Islands",
                    dial_code: "+61",
                    code: "CC"
                }, {
                    name: "Congo, The Democratic Republic of the",
                    dial_code: "+243",
                    code: "CD"
                }, {
                    name: "Cote d'Ivoire",
                    dial_code: "+225",
                    code: "CI"
                }, {
                    name: "Falkland Islands (Malvinas)",
                    dial_code: "+500",
                    code: "FK"
                }, {
                    name: "Guernsey",
                    dial_code: "+44",
                    code: "GG"
                }, {
                    name: "Holy See (Vatican City State)",
                    dial_code: "+379",
                    code: "VA"
                }, {
                    name: "Hong Kong",
                    dial_code: "+852",
                    code: "HK"
                }, {
                    name: "Iran, Islamic Republic of",
                    dial_code: "+98",
                    code: "IR"
                }, {
                    name: "Isle of Man",
                    dial_code: "+44",
                    code: "IM"
                }, {
                    name: "Jersey",
                    dial_code: "+44",
                    code: "JE"
                }, {
                    name: "Korea, Democratic People's Republic of",
                    dial_code: "+850",
                    code: "KP"
                }, {
                    name: "Korea, Republic of",
                    dial_code: "+82",
                    code: "KR"
                }, {
                    name: "Lao People's Democratic Republic",
                    dial_code: "+856",
                    code: "LA"
                }, {
                    name: "Libyan Arab Jamahiriya",
                    dial_code: "+218",
                    code: "LY"
                }, {
                    name: "Macao",
                    dial_code: "+853",
                    code: "MO"
                }, {
                    name: "Macedonia, The Former Yugoslav Republic of",
                    dial_code: "+389",
                    code: "MK"
                }, {
                    name: "Micronesia, Federated States of",
                    dial_code: "+691",
                    code: "FM"
                }, {
                    name: "Moldova, Republic of",
                    dial_code: "+373",
                    code: "MD"
                }, {
                    name: "Mozambique",
                    dial_code: "+258",
                    code: "MZ"
                }, {
                    name: "Palestinian Territory, Occupied",
                    dial_code: "+970",
                    code: "PS"
                }, {
                    name: "Pitcairn",
                    dial_code: "+872",
                    code: "PN"
                }, {
                    name: "Réunion",
                    dial_code: "+262",
                    code: "RE"
                }, {
                    name: "Russia",
                    dial_code: "+7",
                    code: "RU"
                }, {
                    name: "Saint Barthélemy",
                    dial_code: "+590",
                    code: "BL"
                }, {
                    name: "Saint Helena, Ascension and Tristan Da Cunha",
                    dial_code: "+290",
                    code: "SH"
                }, {
                    name: "Saint Kitts and Nevis",
                    dial_code: "+1 869",
                    code: "KN"
                }, {
                    name: "Saint Lucia",
                    dial_code: "+1 758",
                    code: "LC"
                }, {
                    name: "Saint Martin",
                    dial_code: "+590",
                    code: "MF"
                }, {
                    name: "Saint Pierre and Miquelon",
                    dial_code: "+508",
                    code: "PM"
                }, {
                    name: "Saint Vincent and the Grenadines",
                    dial_code: "+1 784",
                    code: "VC"
                }, {
                    name: "Sao Tome and Principe",
                    dial_code: "+239",
                    code: "ST"
                }, {
                    name: "Somalia",
                    dial_code: "+252",
                    code: "SO"
                }, {
                    name: "Svalbard and Jan Mayen",
                    dial_code: "+47",
                    code: "SJ"
                }, {
                    name: "Syrian Arab Republic",
                    dial_code: "+963",
                    code: "SY"
                }, {
                    name: "Taiwan, Province of China",
                    dial_code: "+886",
                    code: "TW"
                }, {
                    name: "Tanzania, United Republic of",
                    dial_code: "+255",
                    code: "TZ"
                }, {
                    name: "Timor-Leste",
                    dial_code: "+670",
                    code: "TL"
                }, {
                    name: "Venezuela, Bolivarian Republic of",
                    dial_code: "+58",
                    code: "VE"
                }, {
                    name: "Viet Nam",
                    dial_code: "+84",
                    code: "VN"
                }, {
                    name: "Virgin Islands, British",
                    dial_code: "+1 284",
                    code: "VG"
                }, {
                    name: "Virgin Islands, U.S.",
                    dial_code: "+1 340",
                    code: "VI"
                }]
            // hide back butotn in next view
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            if (auth.hasToken()) {
                $state.go('home', {}, {location: "replace"});
            }

            $scope.user = {
                email: $stateParams.correo,
                password: $stateParams.password
            }




            //chekear si ya esta logeado

            $scope.login = function (formName, cred) {

                if (formName.$valid)

                {  // Check if the form data is valid or not
                    var data = {
                        Correo: cred.email,
                        Password: cred.password
                    };
                    sharedUtils.showLoading();
                    credenciales.login(data).success(function (r) {

                        if (r.response)
                        {
                            auth.setToken(r.result);
                            $ionicHistory.nextViewOptions({
                                historyRoot: true
                            });
                            $ionicSideMenuDelegate.canDragContent(true); // Sets up the sideMenu dragable
                            sharedUtils.hideLoading();
                            $state.go('home', {}, {location: "replace"});
                        } else
                        {
                            sharedUtils.hideLoading();
                            sharedUtils.showAlert("Atencion", r.message);
                        }
                    }).error(function (err) {

                        sharedUtils.hideLoading();
                        sharedUtils.showAlert("Atencion", err.message);
                    });
                } else {
                    sharedUtils.showAlert("Atencion", "Los datos no son validos");
                }



            }

            $scope.sigup = function (formName, user, passwordValidator) {
                if (formName.$valid)

                {  // Check if the form data is valid or not

                    if (passwordValidator == $scope.user.per_password) {
                        sharedUtils.showLoading();
                        credenciales.sigup(user).success(function (r) {


                            if (r.response)
                            {

                                $ionicHistory.nextViewOptions({
                                    historyRoot: true
                                });
                                $ionicSideMenuDelegate.canDragContent(true); // Sets up the sideMenu dragable
                                sharedUtils.hideLoading();
                                $state.go('login', {"correo": user.per_email, "password": user.per_password}, {location: "replace"});
                            } else
                            {
                                sharedUtils.hideLoading();
                                sharedUtils.showAlert("Atención", r.message);
                            }
                        }).error(function (err) {

                            sharedUtils.hideLoading();
                            sharedUtils.showAlert("Atención", err.message);
                        });
                    } else {
                        sharedUtils.showAlert("Atencion", "El password no coincide ingrese nuevamente");
                    }
                } else {
                    sharedUtils.showAlert("Atención", "Los datos no son validos");
                }

            }



            $scope.loginFb = function () {
                //Facebook Login
            };
            $scope.loginGmail = function () {
                //Gmail Login
            };
        })

// Home controller
        .controller('HomeCtrl', function ($scope, $ionicPopup, $ionicSlideBoxDelegate, $ionicSideMenuDelegate, $state, $rootScope, promo, categoria, empresa, openHours, sharedUtils) {
            // get all categories from service
//            $scope.categories = Menu.all();


            empresa.getHorarios().success(function (response) {

                $scope.days = response.data;
                var respuesta = openHours.isOpen($scope.days);
                $rootScope.open = respuesta.valor;
                $scope.message = respuesta.message;
            });
            incialite = function () {


//                window.plugins.sim.requestReadPermission();
//                window.plugins.sim.getSimInfo(
//                        function (result) {
//                            var alertPopup = $ionicPopup.alert({
//                                title: 'Atencion',
//                                template: 'Provedor : ' + result.carrierName + ' Telefono: ' + result.phoneNumber +
//                                        'IME: ' + result.deviceId
//
//                            });
//
//                        },
//                        function (error) {
//                            var alertPopup = $ionicPopup.alert({
//                                title: 'Atencion',
//                                template: "me dio error"
//                            });
//                        }
//                );

                sharedUtils.showLoading();
                categoria.getCategorias().success(function (response) {

                    $scope.categories = response.data;
                    promo.getPromos().success(function (response) {
                        $scope.promos = response.data;
                        sharedUtils.hideLoading();
                    });
                });
            }

//            $scope.slides = [];
            incialite();
            //actualizar slider
            $scope.updateSlider = function () {
                $ionicSlideBoxDelegate.update(); //or just return the function
            }



        })

// Categories controller
        .controller('CategoriesCtrl', function ($scope, $state, $stateParams, sharedUtils, categoria) {

            var initialice = function () {
                sharedUtils.showLoading();
                categoria.getCategorias().success(function (response) {
                    $scope.categories = response.data;
                    sharedUtils.hideLoading();
                }).error(function (err) {
                    sharedUtils.hideLoading();
                });
            }

            initialice();
        })


// Category controller
        .controller('CategoryCtrl', function ($scope, $state, $stateParams, producto, categoria, sharedUtils) {


            var id = $stateParams.id;
            $scope.products = {};
            $scope.category = {};
            var initialice = function () {
                sharedUtils.showLoading();
                producto.getProductoCat(id).success(function (response) {
                    $scope.products = response.data;
                    categoria.getCategoria(id).success(function (response) {
                        $scope.category = response;
                        sharedUtils.hideLoading();
                    }).error(function (err) {
                        sharedUtils.hideLoading();
                    });
                }).error(function (err) {
                    sharedUtils.hideLoading();
                });
                ;
            }

            initialice();
            // get all items from service by category id
//            $scope.category = Categories.get(1);
        })

// Item controller
        .controller('ItemCtrl', function ($scope, $state, $stateParams, $ionicPopup, $ionicNavBarDelegate, sharedUtils, producto, sharedCartService) {
            var id = $stateParams.id;
            var initialice = function () {
                sharedUtils.showLoading();
                producto.getProducto(id).success(function (response) {

                    $scope.item = response;
                    sharedUtils.hideLoading();
                }).error(function (err) {
                    sharedUtils.hideLoading();
                });
            }

            initialice();
//            $scope.item = Items.get(1);

            // toggle favorite
            $scope.toggleFav = function () {
                $scope.item.faved = !$scope.item.faved;
            }

            // Show note popup when click to 'Notes to driver'
            $scope.addCart = function (item) {

                $scope.data = {
                    quantity: "1"
                }

                if (item.variedades.length > 0 && (typeof item.selectedVariedad === 'undefined')) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Atencion',
                        template: 'Seleccione una Variedad'
                    });
                } else {
                    $scope.item;
                    if ($scope.item.producto.prod_unidad == 2) {
                        $scope.data.quantity = "0.5"
                        var myPopup = $ionicPopup.show({
                            templateUrl: 'templates/popup-quantityMitad.html',
                            title: 'Cantidad',
                            scope: $scope,
                            buttons: [
                                {text: 'Cancelar'},
                                {
                                    text: '<b>Guardar</b>',
                                    type: 'button-assertive',
                                    onTap: function (e) {
                                        if (!$scope.data.quantity) {
                                            //don't allow the user to close unless he enters note
                                            e.preventDefault();
                                        } else {

                                            return $scope.data.quantity;
                                        }
                                    }
                                },
                            ]
                        });
                    } else {
                        var myPopup = $ionicPopup.show({
                            templateUrl: 'templates/popup-quantity2.html',
                            title: 'Cantidad',
                            scope: $scope,
                            buttons: [
                                {text: 'Cancelar'},
                                {
                                    text: '<b>Guardar</b>',
                                    type: 'button-assertive',
                                    onTap: function (e) {
                                        if (!$scope.data.quantity) {
                                            //don't allow the user to close unless he enters note
                                            e.preventDefault();

                                        } else {

                                            return $scope.data.quantity;
                                        }
                                    }
                                },
                            ]
                        });
                    }



                    myPopup.then(function (res) {

                        if (res) {
                            sharedUtils.showLoading();
                            $scope.data.quantity = res;
                            var productoPedido = {};
                            var detalle = {};
                            productoPedido.precioBase = ((typeof item.selectedVariedad === 'undefined') ? item.producto.prod_precioBase : item.selectedVariedad.var_precio);
                            productoPedido.idProducto = item.producto.prod_id;
                            productoPedido.idVariedad = ((typeof item.selectedVariedad === 'undefined') ? -1 : item.selectedVariedad.var_id);
                            productoPedido.nombreVariedad = ((typeof item.selectedVariedad === 'undefined') ? '' : item.selectedVariedad.var_nombre);
                            productoPedido.nombre = item.producto.prod_nombre;
                            productoPedido.idCategoria = item.producto.prod_idCategoria;
                            productoPedido.img = item.producto.slider;
                            productoPedido.descripcion = item.producto.prod_descripcionProducto;
                            productoPedido.aclaracion = item.aclaracion || "Sin Aclaracion";
                            productoPedido.componentestxt = '';
                            productoPedido.componentes = [];
                            productoPedido.aderezo = parseInt(item.producto.prod_isAderezo);
                            detalle.productoP = productoPedido;
                            detalle.cantidad = parseFloat(res);
                            sharedCartService.cart.add(detalle);
                            if (detalle.cantidad == 0.5) {

                                item = {
                                    variedad: productoPedido.nombreVariedad,
                                    categoria: productoPedido.idCategoria
                                }
                                sharedCartService.cartMitad.add(item);
                            }


                            sharedUtils.hideLoading();
                            $ionicNavBarDelegate.back();
                        }


                    });
                }




                // An elaborate, custom popup

            };
            $scope.addAclaracion = function (item) {
                var myPopup2 = $ionicPopup.show({
                    templateUrl: 'templates/popup-aclaracion.html',
                    title: 'Aclaracion',
                    scope: $scope,
                    buttons: [
                        {text: 'Cancelar'},
                        {
                            text: '<b>Aceptar</b>',
                            type: 'button-assertive',
                            onTap: function (e) {
                                return item.aclaracion;
                            }
                        },
                    ]
                });
                myPopup2.then(function (res) {
                    item.aclaracion = res;
                });
            };
        })

// LastOrder controller
        .controller('LastoCtrl', function ($scope, $state, usuario, auth) {

            $scope.usuario = {};
            $scope.pedidos = {};
            $scope.refresh = function () {
                $state.reload(true);
            };
            isLogged = function () {

                if (auth.hasToken())

                {
                    $scope.usuario = auth.datosUsuario();
                } else {

                    $state.go('login', {}, {location: "replace"});
                }
            };
            //inicilizacion
            isLogged();
            usuario.getPedidos($scope.usuario.id).success(function (response) {



                $scope.pedidos = response;
            });
            // get all favorite items

        })
// Favorite controller
        .controller('FavoriteCtrl', function ($scope, $state) {

//            // get all favorite items
//            $scope.items = Items.all()
//
//            // remove item from favorite
//            $scope.remove = function (index) {
//
//
//                $scope.items.splice(index, 1);
//
//            }
        })

// Cart controller
        .controller('CartCtrl', function ($scope, $rootScope, $ionicPopup, $ionicHistory, $ionicSideMenuDelegate, $state, sharedCartService, openHours, empresa) {

            $scope.cart = sharedCartService.cart;
            $scope.promos = sharedCartService.cartPromo;
            $scope.total = sharedCartService.total_amount;
            $scope.vacio = !(sharedCartService.total_qty > 0);
            $scope.llevaAderezo = (sharedCartService.qtyAderezo > 0)
            $scope.parametros = {};
            $scope.aderezos = {};

            $scope.item = {
                aclaracion: sharedCartService.aclaraciones,
                aderezos: sharedCartService.aderezos,
            };
            empresa.getParametros().success(function (response) {

                $scope.parametros = response;
            });
            empresa.getHorarios().success(function (response) {

                $scope.days = response.data;
                var respuesta = openHours.isOpen($scope.days);
                $rootScope.open = respuesta.valor;
                $scope.message = respuesta.message;
            });
            empresa.getAderezos().success(function (response) {

                $scope.aderezos = response.data;
            });
            // plus quantity
            $scope.addAclaracion = function (item) {
                var myPopup2 = $ionicPopup.show({
                    templateUrl: 'templates/popup-aclaracion.html',
                    title: 'Aclaracion',
                    scope: $scope,
                    buttons: [
                        {text: 'Cancelar'},
                        {
                            text: '<b>Aceptar</b>',
                            type: 'button-assertive',
                            onTap: function (e) {
                                return item.aclaracion;
                            }
                        },
                    ]
                });
                myPopup2.then(function (res) {
                    item.aclaracion = res;
                    sharedCartService.aclaraciones = item.aclaracion;
                });
            };
            $scope.selAderezos = function (item) {
                if ($scope.aderezos.length > 0) {
                    var myPopup = $ionicPopup.show({
                        templateUrl: 'templates/popup-aderezos.html',
                        title: 'Elija sus Aderezos',
                        scope: $scope,
                        buttons: [
                            {text: 'Cancelar'},
                            {
                                text: '<b>Guardar</b>',
                                type: 'button-assertive',
                                onTap: function (e) {

                                    var texAde = '';
                                    angular.forEach($scope.aderezos, function (aderezo) {
                                        if (aderezo.selected) {

                                            texAde += aderezo.ade_nombre + ' ';
                                        }
                                    })

                                    return texAde;
                                }
                            },
                        ]
                    });
                    myPopup.then(function (res) {

                        if (res) {

                            item.aderezos = res;
                            sharedCartService.aderezos = item.aderezos;
                        } else {
                            item.aderezos = 'Sin Aderezos'
                            sharedCartService.aderezos = item.aderezos;
                        }
                    });
                }








                // An elaborate, custom popup

            };
            // remove item from cart
            $scope.removeProd = function (index) {

                sharedCartService.cart.drop(index);
                $scope.total = sharedCartService.total_amount;
                $scope.cart = sharedCartService.cart;
            }
            $scope.removePro = function (index) {

                sharedCartService.cartPromo.drop(index);
                $scope.total = sharedCartService.total_amount;
                $scope.promos = sharedCartService.cartPromo;
            }

            $scope.checkOut = function () {

                $scope.total = sharedCartService.total_amount;

                if (!($rootScope.open && ($scope.parametros.par_habilitado == 1))) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Atencion',
                        template: "Por el momento no podemos recibir Pedidos por este Medio"
                    });
                    alertPopup.then(function (res) {
                        $state.go('home', {}, {});
                    })

                } else {
                    if ($scope.total >= $scope.parametros.par_pedidoMinimo) {
                        if (sharedCartService.cartMitad.isEmpty()) {
                            $state.go('checkout', {}, {});
                        } else
                        {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Atencion',
                                template: "Falta Pedir Otra Media Pizza " + sharedCartService.cartMitad[0].variedad
                            });
                        }

                    } else {

                        var alertPopup = $ionicPopup.alert({
                            title: 'Atencion',
                            template: "Debe completar el Pedido Minimo"
                        });
                    }
                }

            }

            $scope.pedirComida = function () {

                $ionicHistory.nextViewOptions({
                    historyRoot: true
                });
                $ionicSideMenuDelegate.canDragContent(true); // Sets up the sideMenu dragable      
                $state.go('home', {}, {location: "replace"})

            }
        })

// Offer controller
        .controller('OfferCtrl', function ($scope, $state, $ionicSideMenuDelegate, sharedUtils, $ionicSlideBoxDelegate, promo) {
            // get all items form Items model
//            $scope.items = Items.all();
            var initialice = function () {
                sharedUtils.showLoading();
                promo.getPromos().success(function (response) {
                    $scope.promos = response.data;
                    sharedUtils.hideLoading();
                }).error(function (err) {
                    sharedUtils.hideLoading();
                });
                ;
            }

            initialice();
            promo.getPromos().success(function (response) {
                $scope.promos = response.data;
            });
            //actualizar slider
            $scope.updateSlider = function () {
                $ionicSlideBoxDelegate.update(); //or just return the function
            }

            // toggle favorite
            $scope.toggleFav = function () {
                $scope.item.faved = !$scope.item.faved;
            }

            // disabled swipe menu
            $ionicSideMenuDelegate.canDragContent(false);
        })
        .controller('ItemOfferCtrl', function ($scope, $state, $stateParams, $ionicPopup, $ionicNavBarDelegate, producto, promo, sharedCartService, sharedUtils) {
            var id = $stateParams.id;
            var cantidadVariedadesSel = 0;
            var checkVar = function (item) {
                return item.cantVar > 0;
            }
            // get item from service by item id

            var initialice = function () {
                sharedUtils.showLoading();
                promo.getPromo(id).success(function (response) {

                    $scope.promo = response;
                    promo.getProductoPromo(id).success(function (response) {
                        $scope.items = response;
                        sharedUtils.hideLoading();
                    }).error(function (err) {
                        sharedUtils.hideLoading();
                    })

                }).error(function (err) {
                    sharedUtils.hideLoading();
                });
                ;
            }

            initialice();
            $scope.toggleFav = function () {
                $scope.item.faved = !$scope.item.faved;
            }
            $scope.selOptions = function (optionO) {
                $scope.options = [];
                var idProd = optionO.prod_id;
                producto.getProducto(idProd).success(function (response) {
                    $scope.options = response.variedades;
                    if ($scope.options.length > 0) {
                        var myPopup = $ionicPopup.show({
                            templateUrl: 'templates/popup-prodOption.html',
                            title: 'Seleccione',
                            scope: $scope,
                            buttons: [
                                {text: 'Cancelar'},
                                {
                                    text: '<b>Guardar</b>',
                                    type: 'button-assertive',
                                    onTap: function (e) {

                                        if (!$scope.selectedVariedad) {
                                            //don't allow the user to close unless he enters note
                                            e.preventDefault();
                                        } else {
                                            return $scope.selectedVariedad;
//                                    return $scope.data.quantity;
                                        }
                                    }
                                },
                            ]
                        });
                        myPopup.then(function (res) {

                            if (res) {
                                if ((typeof optionO.selectedVariedad === 'undefined')) {
                                    optionO.selectedVariedad = res;
                                    cantidadVariedadesSel += 1;
                                } else {
                                    optionO.selectedVariedad = res;
                                }
                            }
                        });
                    }
                });
                $scope.SelectedVariedadChange = function (variedad) {

                    $scope.selectedVariedad = variedad;
                };
                // An elaborate, custom popup

            };
            // Show note popup when click to 'Notes to driver'


            $scope.addCart = function (promo, items) {
                if (cantidadVariedadesSel >= items.filter(checkVar).length) {
                    $scope.data = {
                        quantity: "1"
                    }
                    var promoPedido = {};
                    promoPedido.productosP = []
                    promoPedido.nombre = promo.pro_nombre;
                    promoPedido.precioUnitario = promo.pro_precio;
                    promoPedido.cantidad = 1;
                    promoPedido.idPromo = promo.pro_id;
                    promoPedido.detallePp = promo.pro_descripcion;
                    promoPedido.aclaracion = '';
                    promoPedido.aderezos = 0;
                    angular.forEach(items, function (value, key) {
                        var prodPedido = {};
                        prodPedido.precioBase = value.prod_precioBase;
                        prodPedido.idProducto = value.prod_id;
                        prodPedido.idVariedad = ((typeof value.selectedVariedad === 'undefined') ? -1 : value.selectedVariedad.var_id);
                        prodPedido.precioCalc = 0;
                        prodPedido.nombreVariedad = ((typeof value.selectedVariedad === 'undefined') ? '' : value.selectedVariedad.var_nombre);
                        prodPedido.aclaracion = '';
                        promoPedido.productosP.push(prodPedido);
                        promoPedido.aderezos += parseInt(value.prod_isAderezo);
                    });
                    //promoPedido.aclaracion= 
                    // An elaborate, custom popup
                    var myPopup = $ionicPopup.show({
                        templateUrl: 'templates/popup-quantity2.html',
                        title: 'Cantidad',
                        scope: $scope,
                        buttons: [
                            {text: 'Cancelar'},
                            {
                                text: '<b>Guardar</b>',
                                type: 'button-assertive',
                                onTap: function (e) {
                                    if (!$scope.data.quantity) {
                                        //don't allow the user to close unless he enters note
                                        e.preventDefault();
                                    } else {
                                        return $scope.data.quantity;
                                    }
                                }
                            },
                        ]
                    });
                    myPopup.then(function (res) {
                        if (res) {
                            sharedUtils.showLoading();
                            $scope.data.quantity = parseFloat(res);
                            promoPedido.cantidad = parseFloat(res);
                            sharedCartService.cartPromo.add(promoPedido);
                            sharedUtils.hideLoading();
                            $ionicNavBarDelegate.back();
                        }


                    });
                } else {

                    var alertPopup = $ionicPopup.alert({
                        title: 'Atencion',
                        template: 'Falta Seleccionar algo'
                    });
                }

            }
            ;
        }
        )

// Checkout controller
        .controller('CheckoutCtrl', function ($scope, $state, $ionicPopup, $window, $ionicSideMenuDelegate, $ionicHistory, $ionicModal, auth, usuario, sharedCartService, pedido, empresa, sharedUtils, hotel) {
            $scope.addresses = [];
            $scope.usuario = {};
            $scope.parametros = {};
            $scope.data = {
                payment: 'Efectivo'
            };
            $scope.newHotel = {};
            $scope.editHotel = {
                hoteles: [{hotel_id: "0", hotel_nombre: "Ninguno de la lista", selected: false}],
                hotel: null
            };
            isLogged = function () {

                if (auth.hasToken())

                {
                    $scope.usuario = auth.datosUsuario();
                } else {

                    $ionicHistory.nextViewOptions({
                        historyRoot: true
                    });
                    $ionicSideMenuDelegate.canDragContent(true); // Sets up the sideMenu dragable
                    $state.go('login', {}, {location: "replace"});
                }
            };
            //inicilizacion
            isLogged();

            $ionicModal.fromTemplateUrl('templates/modaladresshotel.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                debugger;
            });
            $scope.openModal = function () {
                $scope.modal.show();
            };

            $scope.closeModal = function () {
                $scope.modal.hide();
                $scope.editHotel.hotel = null;
            };
            hotel.getHoteles().success(function (response) {
                debugger;
                $scope.editHotel.hoteles = $scope.editHotel.hoteles.concat(response.data);

                debugger;

                sharedUtils.hideLoading();
            }).error(function (err) {
                sharedUtils.hideLoading();
            });
            empresa.getParametros().success(function (response) {

                $scope.parametros = response;
            });
            usuario.getDirecciones($scope.usuario.id).success(function (response) {
                $scope.addresses = response;
            });
            $scope.payments = [
                {id: 'Debito', name: 'Tarjeta Debito/Credito'},
                {id: 'Efectivo', name: 'Efectivo '}
            ];
            $scope.total = sharedCartService.total_amount;
            $scope.addManipulation = function () {  // Takes care of address add and edit ie Address Manipulator


                // For adding new address
                var title = "Agregar Domicilio";
                var sub_title = "Agregar un nuevo Domicilio";
                // An elaborate, custom popup
                var addressPopup = $ionicPopup.show({
                    template: '<input type="text"   placeholder="Nombre Lugar"  ng-model="data.dir_nombre"> <br/> ' +
                            '<input type="text"   placeholder="Direccion" ng-model="data.dir_direccion"> <br/> ' +
                            '<textarea placeholder="Aclaraciones" cols="40" rows="3" ng-model="data.dir_aclaracion"></textarea> <br/> ' +
                            '<input type="number" placeholder="Telefono Fijo (Opcional)" ng-model="data.dir_telefonoFijo">',
                    title: title,
                    subTitle: sub_title,
                    scope: $scope,
                    buttons: [
                        {text: 'Cerrar'},
                        {
                            text: '<b>Guardar</b>',
                            type: 'button-positive',
                            onTap: function (e) {

                                if (!$scope.data.dir_nombre || !$scope.data.dir_direccion) {
                                    e.preventDefault(); //don't allow the user to close unless he enters full details
                                } else {
                                    return $scope.data;
                                }
                            }
                        }
                    ]
                });
                addressPopup.then(function (res) {
                    createAdress(res);
                });
            };
            $scope.addManipulation2 = function (edit_val) {

// Takes care of address add and edit ie Address Manipulator

                $scope.openModal();
            };
            $scope.addAdressHotel = function (formName, res) {
                debugger;

                var direccion = {};
                if (res.id) {
                    if (formName.$valid) {
                        if (res.id == 0) {
                            direccion.dir_nombre = res.dir_nombre;
                            direccion.dir_telefonoFijo = 0;
                            direccion.dir_direccion = res.dir_direccion;
                            direccion.dir_idHotel = res.id;
                            direccion.dir_aclaracion = res.dir_aclaracion;
                            direccion.dir_nombreHotel = res.dir_nombre;
                            direccion.dir_habitacion = res.dir_habitacion;
                            direccion.dir_tipodireccion = 2;//tipo 2 Hotel 1 Particular  
                            direccion.dir_idPersona = $scope.usuario.id;
                        }
                        if (res.id != 0) {
                            direccion.dir_nombre = $scope.editHotel.hotel.hotel_nombre;
                            direccion.dir_telefonoFijo = $scope.editHotel.hotel.hotel_telefono;
                            direccion.dir_direccion = $scope.editHotel.hotel.hotel_direccion;
                            direccion.dir_idHotel = $scope.editHotel.hotel.hotel_id;
                            direccion.dir_aclaracion = res.dir_aclaracion;
                            direccion.dir_nombreHotel = $scope.editHotel.hotel.hotel_nombre;
                            direccion.dir_habitacion = res.dir_habitacion;
                            direccion.dir_tipoDireccion = 2;//tipo 2 Hotel 1 Particular
                            direccion.dir_idPersona = $scope.usuario.id;
                        }


                        debugger;
                        direccion;

                        debugger;
                        usuario.addDireccion(direccion).success(function (res) {
                            if (res.response) {
                                debugger;

                                usuario.getDirecciones($scope.usuario.id).success(function (response) {
                                    $scope.addresses = response;
                                });
                                $scope.closeModal();
                            } else {
                                debugger;
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Atencion',
                                    template: res.message
                                });
                            }
                        }).error(function (err) {

                            debugger;

                            var alertPopup = $ionicPopup.alert({
                                title: 'Atencion',
                                template: err.message
                            });
                        });

                    } else {
                        sharedUtils.showAlert("Atencion", "Debe completar los campos obligatorios");

                    }

                } else {
                    sharedUtils.showAlert("Atencion", "Debe Seleccionar una Opcion");

                }


            };
            createAdress = function (res) {

                var direccion = {};
                if (res != null) {
                    direccion.dir_nombre = res.dir_nombre;
                    direccion.dir_telefonoFijo = res.dir_telefonoFijo;
                    direccion.dir_direccion = res.dir_direccion;
                    direccion.dir_aclaracion = res.dir_aclaracion;
                    if (res.dir_idPersona) {
                        //par actualizar

                    } else {
                        direccion.dir_idPersona = $scope.usuario.id;
                        usuario.addDireccion(direccion).success(function (res) {

                            if (res.response) {
                                usuario.getDirecciones($scope.usuario.id).success(function (response) {

                                    $scope.addresses = response;
                                    $scope.data.address = $scope.addresses[0];
                                });
                            } else {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Atencion',
                                    template: res.message
                                });
                            }
                        }).error(function (err) {

                            var alertPopup = $ionicPopup.alert({
                                title: 'Atencion',
                                template: err.message
                            });
                        });
                    }
                }

            };
            $scope.pay = function () {
                var payment = $scope.data.payment;
                var address = $scope.data.address;
                if (sharedCartService.total_qty < 1 && sharedCartService.total_qty < 1) {
                    $ionicHistory.nextViewOptions({
                        historyRoot: true
                    });
                    $ionicSideMenuDelegate.canDragContent(true); // Sets up the sideMenu dragable
                    $state.go('home', {}, {location: "replace"});
                } else {
                    if (!(typeof payment === 'undefined') && !(typeof address === 'undefined'))
                    {

                        var pedidoEncabezado = {};
                        pedidoEncabezado.pe_idCliente = address.dir_idPersona
                        pedidoEncabezado.pe_aclaraciones = sharedCartService.aclaraciones;
                        pedidoEncabezado.pe_total = sharedCartService.total_amount;
                        pedidoEncabezado.pe_idPersona = address.dir_idPersona;
                        pedidoEncabezado.pe_cli_tel = $scope.usuario.celular;
                        pedidoEncabezado.pe_idDireccion = address.dir_id;
                        pedidoEncabezado.pe_medioPago = payment;
                        pedidoEncabezado.pe_idEstado = 1;
                        pedidoEncabezado.pe_resumen = sharedCartService.generarResumen();
                        pedidoEncabezado.pe_aderezos = sharedCartService.aderezos;
                        pedidoEncabezado.pe_cantAderezos = sharedCartService.qtyAderezo;

                        sharedUtils.showLoading();
                        pedido.setEncabezado(pedidoEncabezado).success(function (res) {
                            if (res.response) {

                                var idencabezado = res.result;
                                var detalle = {};
                                detalle.idPedidoEncabezado = res.result;
                                detalle.cart = sharedCartService.cart;
                                var promoPedido = {};
                                promoPedido.idPedidoEncabezado = res.result;
                                promoPedido.cart = sharedCartService.cartPromo;
                                pedido.addDetallePedido(detalle).success(function (res) {
                                    if (res.response) {
                                        sharedCartService.cleanCart();
                                        sharedCartService.recalcularTotales();
                                        pedido.addPromoPedido(promoPedido).success(function (res) {
                                            if (res.response) {
                                                sharedCartService.cleanCartPromo();
                                                sharedCartService.recalcularTotales();
                                                sharedUtils.hideLoading();
                                                var alertPopup = $ionicPopup.alert({
                                                    title: 'Atencion',
                                                    template: 'El pedido se genero correctamente'
                                                });
                                                $ionicHistory.nextViewOptions({
                                                    historyRoot: true
                                                });
                                                $ionicSideMenuDelegate.canDragContent(true); // Sets up the sideMenu dragable
                                                $state.go('last_orders', {}, {location: "replace"});
                                            } else {
                                                sharedUtils.hideLoading();
                                            }
//      

                                        })
                                                .error(function (err) {
                                                    sharedUtils.hideLoading();
                                                    var alertPopup = $ionicPopup.alert({
                                                        title: 'Atencion',
                                                        template: 'No se pudo pedir algunas promos intente mas tarde nuevamente'
                                                    });
                                                })
                                    } else {
                                        sharedUtils.hideLoading();
                                    }
                                }).error(function (err) {
                                    sharedUtils.hideLoading();
                                    var alertPopup = $ionicPopup.alert({
                                        title: 'Atencion',
                                        template: 'No se pudo pedir algunos productos intente mas tarde nuevamente'
                                    });
                                })
                            } else
                            {

                                sharedUtils.hideLoading();
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Atencion',
                                    template: res.message
                                });
                            }
                        }).error(function (err) {

                            sharedUtils.hideLoading();
                            var alertPopup = $ionicPopup.alert({
                                title: 'Atencion',
                                template: err.message
                            });
                        });
                    } else
                    {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Atencion',
                            template: 'Debe elegir una Direccion y un Medio de Pago'
                        });
                    }
                }



            }

        }
        )

// Address controller
        .controller('AddressCtrl', function ($scope, $state, $ionicPopup, externalAppsService, sharedCartService) {

            function initialize() {
                // set up begining position
                var myLatlng = new google.maps.LatLng(-25.5984759, -54.5749279);
                var image = 'img/marker.jpg';
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    title: "Pizza Color Delivery!",
                    icon: image
                });
                // set option for map
                var mapOptions = {
                    center: myLatlng,
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP

                };
                // init map
                var map = new google.maps.Map(document.getElementById("map"),
                        mapOptions);
                marker.setMap(map);
                // assign to stop
                $scope.map = map;
            }
            $scope.openMaps = function () {
                externalAppsService.openExternalUrl("geo:#{-25.5984759},#{-54.5749279}?q=#Gustavo Eppens 258, Puerto Iguazú, Misiónes")

            }
            // load map when the ui is loaded
            $scope.init = function () {
                initialize();
            }
        })

// Setting Controller
        .controller('SettingCtrl', function ($scope, $ionicPopup, $ionicModal, $state, auth, usuario, sharedUtils, $window, hotel) {
            //$scope.usuario = {};
            $scope.addresses = [];
            $scope.passwordValidator = '';
            $scope.usuario = {};
            $scope.direccion = {};
            $scope.newHotel = {};

            $scope.editHotel = {
                hoteles: [{hotel_id: "0", hotel_nombre: "Ninguno de la lista", selected: false}],
                hotel: null
            };


            debugger;
            $ionicModal.fromTemplateUrl('templates/modaladresshotel.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                debugger;
            });
            $scope.openModal = function () {
                $scope.modal.show();
            };

            $scope.closeModal = function () {
                $scope.modal.hide();
                $scope.editHotel.hotel = null;


            };
            isLogged = function () {

                if (auth.hasToken())
                {
                    debugger;
                    sharedUtils.showLoading();
                    $scope.usuario = auth.datosUsuario();
                    usuario.getDirecciones($scope.usuario.id).success(function (response) {
                        $scope.addresses = response;
                        debugger;
                        sharedUtils.hideLoading();
                    }).error(function (err) {
                        sharedUtils.hideLoading();
                    });

                    hotel.getHoteles().success(function (response) {
                        debugger;
                        $scope.editHotel.hoteles = $scope.editHotel.hoteles.concat(response.data);

                        debugger;

                        sharedUtils.hideLoading();
                    }).error(function (err) {
                        sharedUtils.hideLoading();
                    });
                } else {
                    $state.go('login', {}, {location: "replace"});
                }
            };
            //inicilizacion
            isLogged();


            $scope.addAdressHotel = function (formName, res) {
                debugger;

                var direccion = {};
                if (res.id) {
                    if (formName.$valid) {
                        if (res.id == 0) {
                            direccion.dir_nombre = res.dir_nombre;
                            direccion.dir_telefonoFijo = 0;
                            direccion.dir_direccion = res.dir_direccion;
                            direccion.dir_idHotel = res.id;
                            direccion.dir_aclaracion = res.dir_aclaracion;
                            direccion.dir_nombreHotel = res.dir_nombre;
                            direccion.dir_habitacion = res.dir_habitacion;
                            direccion.dir_tipodireccion = 2;//tipo 2 Hotel 1 Particular  
                            direccion.dir_idPersona = $scope.usuario.id;
                        }
                        if (res.id != 0) {
                            direccion.dir_nombre = $scope.editHotel.hotel.hotel_nombre;
                            direccion.dir_telefonoFijo = $scope.editHotel.hotel.hotel_telefono;
                            direccion.dir_direccion = $scope.editHotel.hotel.hotel_direccion;
                            direccion.dir_idHotel = $scope.editHotel.hotel.hotel_id;
                            direccion.dir_aclaracion = res.dir_aclaracion;
                            direccion.dir_nombreHotel = $scope.editHotel.hotel.hotel_nombre;
                            direccion.dir_habitacion = res.dir_habitacion;
                            direccion.dir_tipoDireccion = 2;//tipo 2 Hotel 1 Particular
                            direccion.dir_idPersona = $scope.usuario.id;
                        }


                        debugger;
                        direccion;

                        debugger;
                        usuario.addDireccion(direccion).success(function (res) {
                            if (res.response) {
                                debugger;

                                usuario.getDirecciones($scope.usuario.id).success(function (response) {
                                    $scope.addresses = response;
                                });
                                $scope.closeModal();
                            } else {
                                debugger;
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Atencion',
                                    template: res.message
                                });
                            }
                        }).error(function (err) {

                            debugger;

                            var alertPopup = $ionicPopup.alert({
                                title: 'Atencion',
                                template: err.message
                            });
                        });

                    } else {
                        sharedUtils.showAlert("Atencion", "Debe completar los campos obligatorios");

                    }

                } else {
                    sharedUtils.showAlert("Atencion", "Debe Seleccionar una Opcion");

                }


            };

            createAdress = function (res) {

                var direccion = {};
                if (res != null) {
                    direccion.dir_nombre = res.dir_nombre;
                    direccion.dir_telefonoFijo = res.dir_telefonoFijo;
                    direccion.dir_direccion = res.dir_direccion;
                    direccion.dir_aclaracion = res.dir_aclaracion;
                    if (res.dir_idPersona) {
                        usuario.updateDireccion(res).success(function (res) {
                            if (res.response) {
                                usuario.getDirecciones($scope.usuario.id).success(function (response) {
                                    $scope.addresses = response;
                                });
                            } else {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Atencion',
                                    template: res.message
                                });
                            }
                        }).error(function (err) {

                            var alertPopup = $ionicPopup.alert({
                                title: 'Atencion',
                                template: err.message
                            });
                        });
                    } else {
                        direccion.dir_idPersona = $scope.usuario.id;
                        usuario.addDireccion(direccion)
                                .success(function (res) {

                                    if (res.response) {

                                        usuario.getDirecciones($scope.usuario.id).success(function (response) {
                                            $scope.addresses = response;
                                        });
                                    } else {
                                        var alertPopup = $ionicPopup.alert({
                                            title: 'Atencion',
                                            template: res.message
                                        });
                                    }
                                })
                                .error(function (err) {

                                    var alertPopup = $ionicPopup.alert({
                                        title: 'Atencion',
                                        template: err.message
                                    });
                                });
                    }
                }

            };

            $scope.addManipulation = function (edit_val) {  // Takes care of address add and edit ie Address Manipulator
                if (edit_val != null) {

                    $scope.data = edit_val; // For editing address 
                    // poner al telefono como un numero.
                    var title = "Editar Direccion";
                    var sub_title = "Editar su Domicilio";
                } else {
                    $scope.data = {}; // For adding new address
                    var title = "Agregar Domicilio";
                    var sub_title = "Agregar un nuevo Domicilio";
                }
                // An elaborate, custom popup
                var addressPopup = $ionicPopup.show({
                    template: '<input type="text"   placeholder="Nombre Lugar"  ng-model="data.dir_nombre"> <br/> ' +
                            '<input type="text"   placeholder="Direccion" ng-model="data.dir_direccion"> <br/> ' +
                            '<textarea placeholder="Aclaraciones" cols="40" rows="3" ng-model="data.dir_aclaracion"></textarea> <br/> ' +
                            '<input type="text" placeholder="Telefono Fijo (Opcional)" ng-model="data.dir_telefonoFijo">',
                    title: title,
                    subTitle: sub_title,
                    scope: $scope,
                    buttons: [
                        {text: 'Cancelar'},
                        {
                            text: '<b>Guardar</b>',
                            type: 'button-positive',
                            onTap: function (e) {


                                if (!$scope.data.dir_nombre || !$scope.data.dir_direccion) {
                                    e.preventDefault(); //don't allow the user to close unless he enters full details
                                } else {
                                    return $scope.data;
                                }
                            }
                        }
                    ]
                });


                addressPopup.then(function (res) {
                    createAdress(res);
                });
            };
            $scope.addManipulation2 = function (edit_val) {

// Takes care of address add and edit ie Address Manipulator

                $scope.openModal();
            };
            $scope.addManipulation3 = function (edit_val) {


                var title = "Editar hotel";
                var sub_title = "Editar su hotel";
                $scope.data = edit_val; // For editing address 
                // An elaborate, custom popup
                var addressPopup = $ionicPopup.show({
                    template: '<input type="text"   placeholder="Nombre Lugar"  ng-model="data.dir_nombre" ng-disabled="true"> <br/> ' +
                            '<input type="text"   placeholder="Direccion" ng-model="data.dir_direccion" ng-disabled="true"> <br/> ' +
                            '<input type="text"   placeholder="Habitacion o Departamento" ng-model="data.dir_habitacion" > <br/>' +
                            '<textarea placeholder="Aclaraciones" cols="40" rows="3" ng-model="data.dir_aclaracion"></textarea> <br/> ',
                    title: title,
                    subTitle: sub_title,
                    scope: $scope,
                    buttons: [
                        {text: 'Cancelar'},
                        {
                            text: '<b>Guardar</b>',
                            type: 'button-positive',
                            onTap: function (e) {


                                if (!$scope.data.dir_nombre || !$scope.data.dir_direccion || !$scope.data.dir_habitacion) {
                                    e.preventDefault(); //don't allow the user to close unless he enters full details
                                } else {
                                    return $scope.data;
                                }
                            }
                        }
                    ]
                });




            };


            $scope.deleteAddress = function (del_id) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Eliminar Domicilio',
                    template: 'Esta seguro de eliminar este domicilio',
                    buttons: [
                        {text: 'No', type: 'button-stable'},
                        {text: 'Si', type: 'button-assertive', onTap: function () {
                                return del_id;
                            }}
                    ]
                });
                confirmPopup.then(function (res) {
                    if (res) {

                        usuario.deleteDireccion(res).success(function (r) {
                            if (r.response) {

                                usuario.getDirecciones($scope.usuario.id).success(function (response) {
                                    $scope.addresses = response;
                                });
                            }
                        });
                        //eliminar direccion de la base

                    }
                });
            };
            $scope.guardar = function () {

                var data = {}
                var id = $scope.usuario.id;
                data.per_celular = $scope.usuario.celular;
                if ((typeof $scope.usuario.password === 'undefined')) {

                } else {

                    if ($scope.usuario.password == $scope.usuario.passwordValidator) {

                        data.per_password = $scope.usuario.password;
                        usuario.save(id, data).success(function (res) {

                            if (res.response) {
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Informacion',
                                    template: 'Los cambio se Guardaron Correctamente'
                                });
                            }
                        });
                    } else {
                        sharedUtils.showAlert("Atencion", "Los Password no coinciden ingrese nuevamente");
                    }

                }



            }

        })



// News controller
        .controller('NewsCtrl', function ($scope, $state, Posts) {
            // get all posts from services
            $scope.posts = Posts.all();
        })

// About controller
        .controller('AboutCtrl', function ($scope, $state, empresa, openHours, externalAppsService) {
            // working hours
            $scope.dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
//            $scope.days = [
//                {
//                    'name': 'Monday',
//                    'hours': '02:00pm - 10:00pm'
//                },
//                {
//                    'name': 'Tuesday',
//                    'hours': '02:00pm - 10:00pm'
//                },
//                {
//                    'name': 'Wednesday',
//                    'hours': '02:00pm - 10:00pm'
//                },
//                {
//                    'name': 'Thursday',
//                    'hours': '02:00pm - 10:00pm'
//                },
//                {
//                    'name': 'Friday',
//                    'hours': '02:00pm - 10:00pm'
//                },
//                {
//                    'name': 'Saturday',
//                    'hours': '05:00pm - 10:00pm'
//                },
//                {
//                    'name': 'Sunday',
//                    'hours': '05:00pm - 10:00pm'
//                }
//            ];



            empresa.getHorarios().success(function (response) {
                $scope.days = response.data;
            });
            empresa.getTelefonos().success(function (response) {
                $scope.tel = response;
            });
            empresa.getDatosContacto().success(function (response) {
                $scope.contac = response;
            });
            $scope.openFacebookPage = function () {
                externalAppsService.openExternalUrl($scope.contac.dcon_facebook);
            }

            $scope.openPage = function () {
                externalAppsService.openExternalUrl($scope.contac.dcon_website);
            }

            $scope.openTwitterPage = function () {
                externalAppsService.openExternalUrl($scope.contac.dcon_twitter);
            }





        })
// Logout controller
        .controller('LogoutCtrl', function ($scope, $state, auth) {
            // get all posts from services
            auth.logout();
            $state.go('login', {}, {location: "replace"})

        })

        