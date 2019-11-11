import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CustomHttpService } from './custamHTTP';
// const fake = [{ "count": 13815, "name": "JAN", "list": [{ "count": 8392, "name": "Retail", "percentage": 4.06 }, { "count": 5423, "name": "Corporate", "percentage": 14.87 }], "percentage": 4.06 }, { "count": 19222, "name": "FEB", "list": [{ "count": 10379, "name": "Retail", "percentage": 5.02 }, { "count": 8843, "name": "Corporate", "percentage": 24.24 }], "percentage": 5.02 }, { "count": 27519, "name": "MAR", "list": [{ "count": 15505, "name": "Retail", "percentage": 7.49 }, { "count": 12014, "name": "Corporate", "percentage": 32.93 }], "percentage": 7.49 }, { "count": 35224, "name": "APR", "list": [{ "count": 21757, "name": "Retail", "percentage": 10.51 }, { "count": 13467, "name": "Corporate", "percentage": 36.91 }], "percentage": 10.51 }, { "count": 40597, "name": "MAY", "list": [{ "count": 26935, "name": "Retail", "percentage": 13.01 }, { "count": 13662, "name": "Corporate", "percentage": 37.45 }], "percentage": 13.01 }, { "count": 47006, "name": "JUN", "list": [{ "count": 31993, "name": "Retail", "percentage": 15.45 }, { "count": 15013, "name": "Corporate", "percentage": 41.15 }], "percentage": 15.45 }, { "count": 52162, "name": "JUL", "list": [{ "count": 34504, "name": "Retail", "percentage": 16.67 }, { "count": 17658, "name": "Corporate", "percentage": 48.4 }], "percentage": 16.67 }, { "count": 56155, "name": "AUG", "list": [{ "count": 36960, "name": "Retail", "percentage": 17.85 }, { "count": 19195, "name": "Corporate", "percentage": 52.61 }], "percentage": 17.85 }, { "count": 61204, "name": "SEP", "list": [{ "count": 38477, "name": "Retail", "percentage": 18.58 }, { "count": 22727, "name": "Corporate", "percentage": 62.29 }], "percentage": 18.58 }, { "count": 67130, "name": "OCT", "list": [{ "count": 42025, "name": "Retail", "percentage": 20.3 }, { "count": 25105, "name": "Corporate", "percentage": 68.81 }], "percentage": 20.3 }, { "count": 73668, "name": "NOV", "list": [{ "count": 48077, "name": "Retail", "percentage": 23.22 }, { "count": 25591, "name": "Corporate", "percentage": 70.14 }], "percentage": 23.22 }, { "count": 77260, "name": "DEC", "list": [{ "count": 50724, "name": "Retail", "percentage": 24.5 }, { "count": 26536, "name": "Corporate", "percentage": 72.73 }], "percentage": 24.5 }];

// const fakeMonthlyTxn =
//   [{
//     "count": 127479, "name": "JAN",
//     "list": [{ "count": 78474, "name": "Retail" }, { "count": 49005, "name": "Corporate" }]
//   }, { "count": 276432, "name": "FEB", "list": [{ "count": 94742, "name": "Retail" }, { "count": 181690, "name": "Corporate" }] }, { "count": 446826, "name": "MAR", "list": [{ "count": 148520, "name": "Retail" }, { "count": 298306, "name": "Corporate" }] }, { "count": 525869, "name": "APR", "list": [{ "count": 188479, "name": "Retail" }, { "count": 337390, "name": "Corporate" }] }, { "count": 657246, "name": "MAY", "list": [{ "count": 248722, "name": "Retail" }, { "count": 408524, "name": "Corporate" }] }, { "count": 685079, "name": "JUN", "list": [{ "count": 281657, "name": "Retail" }, { "count": 403422, "name": "Corporate" }] }, { "count": 778013, "name": "JUL", "list": [{ "count": 296544, "name": "Retail" }, { "count": 481469, "name": "Corporate" }] }, { "count": 869112, "name": "AUG", "list": [{ "count": 339152, "name": "Retail" }, { "count": 529960, "name": "Corporate" }] }, { "count": 866441, "name": "SEP", "list": [{ "count": 335004, "name": "Retail" }, { "count": 531437, "name": "Corporate" }] }, { "count": 910788, "name": "OCT", "list": [{ "count": 377651, "name": "Retail" }, { "count": 533137, "name": "Corporate" }] }, { "count": 1001023, "name": "NOV", "list": [{ "count": 386887, "name": "Retail" }, { "count": 614136, "name": "Corporate" }] }, { "count": 1155036, "name": "DEC", "list": [{ "count": 445596, "name": "Retail" }, { "count": 709440, "name": "Corporate" }] }];

// const fakeRechargeRetail = [{ "name": "JAN", "list": [{ "count": 4224, "name": "Retail", "recharge": 1913766, "paymentType": "Cash" }, { "count": 7693, "name": "Retail", "recharge": 553664, "paymentType": "MANUAL CREDIT" }, { "count": 6126, "name": "Retail", "recharge": 9819166, "paymentType": "Payment Gateway" }], "revenue": 12286596 }, { "name": "FEB", "list": [{ "count": 4431, "name": "Retail", "recharge": 1544239, "paymentType": "Cash" }, { "count": 8308, "name": "Retail", "recharge": 954530, "paymentType": "MANUAL CREDIT" }, { "count": 7517, "name": "Retail", "recharge": 13709437, "paymentType": "Payment Gateway" }], "revenue": 16208206 }, { "name": "MAR", "list": [{ "count": 13627, "name": "Retail", "recharge": 2501274, "paymentType": "Cash" }, { "count": 7846, "name": "Retail", "recharge": 933220, "paymentType": "MANUAL CREDIT" }, { "count": 11258, "name": "Retail", "recharge": 21058549, "paymentType": "Payment Gateway" }], "revenue": 24493043 }, { "name": "APR", "list": [{ "count": 16460, "name": "Retail", "recharge": 2588090, "paymentType": "Cash" }, { "count": 13518, "name": "Retail", "recharge": 1567164, "paymentType": "MANUAL CREDIT" }, { "count": 12215, "name": "Retail", "recharge": 24050956, "paymentType": "Payment Gateway" }], "revenue": 28206210 }, { "name": "MAY", "list": [{ "count": 18461, "name": "Retail", "recharge": 4071877, "paymentType": "Cash" }, { "count": 18903, "name": "Retail", "recharge": 1324681, "paymentType": "MANUAL CREDIT" }, { "count": 16164, "name": "Retail", "recharge": 34205371, "paymentType": "Payment Gateway" }], "revenue": 39601929 }, { "name": "JUN", "list": [{ "count": 18924, "name": "Retail", "recharge": 4244961, "paymentType": "Cash" }, { "count": 21605, "name": "Retail", "recharge": 1559472, "paymentType": "MANUAL CREDIT" }, { "count": 16391, "name": "Retail", "recharge": 36246048, "paymentType": "Payment Gateway" }], "revenue": 42050481 }, { "name": "JUL", "list": [{ "count": 17341, "name": "Retail", "recharge": 4032026, "paymentType": "Cash" }, { "count": 25304, "name": "Retail", "recharge": 1778684, "paymentType": "MANUAL CREDIT" }, { "count": 17748, "name": "Retail", "recharge": 36735671, "paymentType": "Payment Gateway" }], "revenue": 42546381 }, { "name": "AUG", "list": [{ "count": 18275, "name": "Retail", "recharge": 4106191, "paymentType": "Cash" }, { "count": 1566, "name": "Retail", "recharge": 143305, "paymentType": "MANUAL CREDIT" }, { "count": 20033, "name": "Retail", "recharge": 44009011, "paymentType": "Payment Gateway" }], "revenue": 48258507 }, { "name": "SEP", "list": [{ "count": 16506, "name": "Retail", "recharge": 4098831, "paymentType": "Cash" }, { "count": 27469, "name": "Retail", "recharge": 1859169, "paymentType": "MANUAL CREDIT" }, { "count": 19153, "name": "Retail", "recharge": 42193151, "paymentType": "Payment Gateway" }], "revenue": 48151151 }, { "name": "OCT", "list": [{ "count": 20343, "name": "Retail", "recharge": 4811133, "paymentType": "Cash" }, { "count": 38784, "name": "Retail", "recharge": 4268220, "paymentType": "MANUAL CREDIT" }, { "count": 22560, "name": "Retail", "recharge": 48454910, "paymentType": "Payment Gateway" }], "revenue": 57534263 }, { "name": "NOV", "list": [{ "count": 22211, "name": "Retail", "recharge": 5226962, "paymentType": "Cash" }, { "count": 29569, "name": "Retail", "recharge": 2095025, "paymentType": "MANUAL CREDIT" }, { "count": 23052, "name": "Retail", "recharge": 46419460, "paymentType": "Payment Gateway" }], "revenue": 53741447 }, { "name": "DEC", "list": [{ "count": 23427, "name": "Retail", "recharge": 5740716, "paymentType": "Cash" }, { "count": 33405, "name": "Retail", "recharge": 3043002, "paymentType": "MANUAL CREDIT" }, { "count": 24664, "name": "Retail", "recharge": 51070602, "paymentType": "Payment Gateway" }], "revenue": 59854320 }];

// const shgsu = [{ "name": "JAN", "list": [{ "name": "Retail", "revenue": 9161267.29 }, { "name": "Corporate", "revenue": 16129244.46 }], "revenue": 25290511.75 }, { "name": "FEB", "list": [{ "name": "Retail", "revenue": 12610226.81 }, { "name": "Corporate", "revenue": 41977460.76 }], "revenue": 54587687.57 }, { "name": "MAR", "list": [{ "name": "Retail", "revenue": 19027718.59 }, { "name": "Corporate", "revenue": 67339549.28 }], "revenue": 86367267.87 }, { "name": "APR", "list": [{ "name": "Retail", "revenue": 23029361.91 }, { "name": "Corporate", "revenue": 77658538.52 }], "revenue": 100687900.43 }, { "name": "MAY", "list": [{ "name": "Retail", "revenue": 30634928.26 }, { "name": "Corporate", "revenue": 91325327.02 }], "revenue": 121960255.28 }, { "name": "JUN", "list": [{ "name": "Retail", "revenue": 35369241.10 }, { "name": "Corporate", "revenue": 94990429.81 }], "revenue": 130359670.91 }, { "name": "JUL", "list": [{ "name": "Retail", "revenue": 35716896.48 }, { "name": "Corporate", "revenue": 110621976.39 }], "revenue": 146338872.87 }, { "name": "AUG", "list": [{ "name": "Retail", "revenue": 41965066.08 }, { "name": "Corporate", "revenue": 127023894.83 }], "revenue": 168988960.91 }, { "name": "SEP", "list": [{ "name": "Retail", "revenue": 41554537.35 }, { "name": "Corporate", "revenue": 130538850.63 }], "revenue": 172093387.98 }, { "name": "OCT", "list": [{ "name": "Retail", "revenue": 47073047.81 }, { "name": "Corporate", "revenue": 136797217.55 }], "revenue": 183870265.36 }, { "name": "NOV", "list": [{ "name": "Retail", "revenue": 45963748.52 }, { "name": "Corporate", "revenue": 157197034.45 }], "revenue": 203160782.97 }, { "name": "DEC", "list": [{ "name": "Retail", "revenue": 53914416.18 }, { "name": "Corporate", "revenue": 185093213.42 }], "revenue": 239007629.60 }]

// const monthlySetting = [{ "name": "JAN", "list": [{ "name": "Retail", "revenue": 8889511.00 }, { "name": "Corporate", "revenue": 15490637.00 }], "revenue": 24380148.00 }, { "name": "FEB", "list": [{ "name": "Retail", "revenue": 12425123.00 }, { "name": "Corporate", "revenue": 41450657.00 }], "revenue": 53875780.00 }, { "name": "MAR", "list": [{ "name": "Retail", "revenue": 18787434.00 }, { "name": "Corporate", "revenue": 66066178.00 }], "revenue": 84853612.00 }, { "name": "APR", "list": [{ "name": "Retail", "revenue": 22593338.00 }, { "name": "Corporate", "revenue": 76435224.00 }], "revenue": 99028562.00 }, { "name": "MAY", "list": [{ "name": "Retail", "revenue": 30348302.00 }, { "name": "Corporate", "revenue": 90902357.00 }], "revenue": 121250659.00 }, { "name": "JUN", "list": [{ "name": "Retail", "revenue": 34869541.00 }, { "name": "Corporate", "revenue": 94293678.00 }], "revenue": 129163219.00 }, { "name": "JUL", "list": [{ "name": "Retail", "revenue": 35212433.00 }, { "name": "Corporate", "revenue": 109621641.00 }], "revenue": 144834074.00 }, { "name": "AUG", "list": [{ "name": "Retail", "revenue": 41422500.00 }, { "name": "Corporate", "revenue": 126315447.00 }], "revenue": 167737947.00 }, { "name": "SEP", "list": [{ "name": "Retail", "revenue": 41046700.00 }, { "name": "Corporate", "revenue": 129673265.00 }], "revenue": 170719965.00 }, { "name": "OCT", "list": [{ "name": "Retail", "revenue": 45779831.00 }, { "name": "Corporate", "revenue": 136168813.00 }], "revenue": 181948644.00 }, { "name": "NOV", "list": [{ "name": "Retail", "revenue": 44951736.00 }, { "name": "Corporate", "revenue": 155873960.00 }], "revenue": 200825696.00 }, { "name": "DEC", "list": [{ "name": "Retail", "revenue": 52462963.00 }, { "name": "Corporate", "revenue": 184371615.00 }], "revenue": 236834578.00 }]

// const inactiveTag = [{ "count": 47323, "name": "JAN", "list": [{ "count": 39725, "name": "Retail" }, { "count": 7598, "name": "Corporate" }], "rateOfChange": 0 }, { "count": 45858, "name": "FEB", "list": [{ "count": 39584, "name": "Retail" }, { "count": 6274, "name": "Corporate" }], "rateOfChange": -3.100 }, { "count": 17721, "name": "MAR", "list": [{ "count": 16132, "name": "Retail" }, { "count": 1589, "name": "Corporate" }], "rateOfChange": -61.400 }, { "count": 6840, "name": "APR", "list": [{ "count": 6551, "name": "Retail" }, { "count": 289, "name": "Corporate" }], "rateOfChange": -61.400 }, { "count": 7696, "name": "MAY", "list": [{ "count": 6677, "name": "Retail" }, { "count": 1019, "name": "Corporate" }], "rateOfChange": 12.500 }, { "count": 6542, "name": "JUN", "list": [{ "count": 5622, "name": "Retail" }, { "count": 920, "name": "Corporate" }], "rateOfChange": -15.000 }, { "count": 7245, "name": "JUL", "list": [{ "count": 5826, "name": "Retail" }, { "count": 1419, "name": "Corporate" }], "rateOfChange": 10.700 }, { "count": 10213, "name": "AUG", "list": [{ "count": 6631, "name": "Retail" }, { "count": 3582, "name": "Corporate" }], "rateOfChange": 41.000 }, { "count": 11098, "name": "SEP", "list": [{ "count": 6928, "name": "Retail" }, { "count": 4170, "name": "Corporate" }], "rateOfChange": 8.700 }, { "count": 14553, "name": "OCT", "list": [{ "count": 9649, "name": "Retail" }, { "count": 4904, "name": "Corporate" }], "rateOfChange": 31.100 }, { "count": 15095, "name": "NOV", "list": [{ "count": 11651, "name": "Retail" }, { "count": 3444, "name": "Corporate" }], "rateOfChange": 3.700 }, { "count": 22224, "name": "DEC", "list": [{ "count": 20050, "name": "Retail" }, { "count": 2174, "name": "Corporate" }], "rateOfChange": 47.200 }]

// const tagIssuMonthlyTrend = [{ "count": 16238, "name": "JAN", "list": [{ "count": 13117, "name": "Retail" }, { "count": 3121, "name": "Corporate" }], "rateOfChange": 0 }, { "count": 15441, "name": "FEB", "list": [{ "count": 12355, "name": "Retail" }, { "count": 3086, "name": "Corporate" }], "rateOfChange": -4.900 }, { "count": 17877, "name": "MAR", "list": [{ "count": 15801, "name": "Retail" }, { "count": 2076, "name": "Corporate" }], "rateOfChange": 15.800 }, { "count": 18550, "name": "APR", "list": [{ "count": 17586, "name": "Retail" }, { "count": 964, "name": "Corporate" }], "rateOfChange": 3.800 }, { "count": 21570, "name": "MAY", "list": [{ "count": 19214, "name": "Retail" }, { "count": 2356, "name": "Corporate" }], "rateOfChange": 16.300 }, { "count": 20315, "name": "JUN", "list": [{ "count": 17911, "name": "Retail" }, { "count": 2404, "name": "Corporate" }], "rateOfChange": -5.800 }, { "count": 19316, "name": "JUL", "list": [{ "count": 16381, "name": "Retail" }, { "count": 2935, "name": "Corporate" }], "rateOfChange": -4.900 }, { "count": 21165, "name": "AUG", "list": [{ "count": 16610, "name": "Retail" }, { "count": 4555, "name": "Corporate" }], "rateOfChange": 9.600 }, { "count": 19439, "name": "SEP", "list": [{ "count": 15074, "name": "Retail" }, { "count": 4365, "name": "Corporate" }], "rateOfChange": -8.200 }, { "count": 24899, "name": "OCT", "list": [{ "count": 19606, "name": "Retail" }, { "count": 5293, "name": "Corporate" }], "rateOfChange": 28.100 }, { "count": 25260, "name": "NOV", "list": [{ "count": 21184, "name": "Retail" }, { "count": 4076, "name": "Corporate" }], "rateOfChange": 1.400 }, { "count": 24761, "name": "DEC", "list": [{ "count": 22367, "name": "Retail" }, { "count": 2394, "name": "Corporate" }], "rateOfChange": -2.000 }]

const ttttt = [{ "count": 8024, "name": "JAN", "list": [{ "count": 6782, "name": "Retail", "percentage": 25.95 }, { "count": 1242, "name": "Corporate", "percentage": 14.27 }] }, { "count": 10885, "name": "FEB", "list": [{ "count": 8274, "name": "Retail", "percentage": 21.53 }, { "count": 2611, "name": "Corporate", "percentage": 22.59 }] }, { "count": 16547, "name": "MAR", "list": [{ "count": 12578, "name": "Retail", "percentage": 23.27 }, { "count": 3969, "name": "Corporate", "percentage": 30.29 }] }, { "count": 22628, "name": "APR", "list": [{ "count": 18206, "name": "Retail", "percentage": 25.4 }, { "count": 4422, "name": "Corporate", "percentage": 31.6 }] }, { "count": 28235, "name": "MAY", "list": [{ "count": 22901, "name": "Retail", "percentage": 25.19 }, { "count": 5334, "name": "Corporate", "percentage": 32.45 }] }, { "count": 33523, "name": "JUN", "list": [{ "count": 27388, "name": "Retail", "percentage": 25.18 }, { "count": 6135, "name": "Corporate", "percentage": 33.04 }] }, { "count": 37075, "name": "JUL", "list": [{ "count": 29592, "name": "Retail", "percentage": 23.74 }, { "count": 7483, "name": "Corporate", "percentage": 35.85 }] }, { "count": 40438, "name": "AUG", "list": [{ "count": 32378, "name": "Retail", "percentage": 22.82 }, { "count": 8060, "name": "Corporate", "percentage": 31.54 }] }, { "count": 42491, "name": "SEP", "list": [{ "count": 33604, "name": "Retail", "percentage": 21.44 }, { "count": 8887, "name": "Corporate", "percentage": 31.44 }] }, { "count": 47410, "name": "OCT", "list": [{ "count": 36907, "name": "Retail", "percentage": 20.91 }, { "count": 10503, "name": "Corporate", "percentage": 29.59 }] }, { "count": 54490, "name": "NOV", "list": [{ "count": 42831, "name": "Retail", "percentage": 21.66 }, { "count": 11659, "name": "Corporate", "percentage": 29.88 }] }, { "count": 57663, "name": "DEC", "list": [{ "count": 44826, "name": "Retail", "percentage": 20.37 }, { "count": 12837, "name": "Corporate", "percentage": 30.54 }] }];

const monthEndWalletBalance = [{ "name": "JAN", "list": [{ "name": "Retail", "recharge": 6357824.52 }, { "name": "Corporate", "recharge": 1487105.05 }], "recharge": 7844929.57 }, { "name": "FEB", "list": [{ "name": "Retail", "recharge": 8976004.43 }, { "name": "Corporate", "recharge": 3281796.41 }], "recharge": 12257800.84 }, { "name": "MAR", "list": [{ "name": "Retail", "recharge": 12398255.19 }, { "name": "Corporate", "recharge": 4251444.67 }], "recharge": 16649699.86 }, { "name": "APR", "list": [{ "name": "Retail", "recharge": 15458692.02 }, { "name": "Corporate", "recharge": 5262931.14 }], "recharge": 20721623.16 }, { "name": "MAY", "list": [{ "name": "Retail", "recharge": 20801034.63 }, { "name": "Corporate", "recharge": 6000915.28 }], "recharge": 26801949.91 }, { "name": "JUN", "list": [{ "name": "Retail", "recharge": 24328758.58 }, { "name": "Corporate", "recharge": 8235633.96 }], "recharge": 32564392.54 }, { "name": "JUL", "list": [{ "name": "Retail", "recharge": 27484650.90 }, { "name": "Corporate", "recharge": 8839108.49 }], "recharge": 36323759.39 }, { "name": "AUG", "list": [{ "name": "Retail", "recharge": 29900033.87 }, { "name": "Corporate", "recharge": 9955382.39 }], "recharge": 39855416.26 }, { "name": "SEP", "list": [{ "name": "Retail", "recharge": 32586002.36 }, { "name": "Corporate", "recharge": 9696629.81 }], "recharge": 42282632.17 }, { "name": "OCT", "list": [{ "name": "Retail", "recharge": 38594772.36 }, { "name": "Corporate", "recharge": 12404017.93 }], "recharge": 50998790.29 }, { "name": "NOV", "list": [{ "name": "Retail", "recharge": 42645707.81 }, { "name": "Corporate", "recharge": 13126908.05 }], "recharge": 55772615.86 }, { "name": "DEC", "list": [{ "name": "Retail", "recharge": 48832488.93 }, { "name": "Corporate", "recharge": 15671403.07 }], "recharge": 64503892.00 }];
const active90 = [{ "count": 27527, "name": "JAN", "list": [{ "count": 23064, "name": "Retail", "percentage": 35.501213 }, { "count": 4463, "name": "Corporate", "percentage": 27.851221 }] }, { "count": 40025, "name": "FEB", "list": [{ "count": 33214, "name": "Retail", "percentage": 34.56675 }, { "count": 6811, "name": "Corporate", "percentage": 41.917484 }] }, { "count": 48550, "name": "MAR", "list": [{ "count": 41003, "name": "Retail", "percentage": 35.36083 }, { "count": 7547, "name": "Corporate", "percentage": 69.81582 }] }, { "count": 50829, "name": "APR", "list": [{ "count": 45537, "name": "Retail", "percentage": 42.148144 }, { "count": 5292, "name": "Corporate", "percentage": 71.12623 }] }, { "count": 57360, "name": "MAY", "list": [{ "count": 52484, "name": "Retail", "percentage": 53.145718 }, { "count": 4876, "name": "Corporate", "percentage": 51.086956 }] }, { "count": 60171, "name": "JUN", "list": [{ "count": 54708, "name": "Retail", "percentage": 58.82869 }, { "count": 5463, "name": "Corporate", "percentage": 56.85521 }] }, { "count": 59868, "name": "JUL", "list": [{ "count": 52991, "name": "Retail", "percentage": 65.26014 }, { "count": 6877, "name": "Corporate", "percentage": 68.44555 }] }, { "count": 60099, "name": "AUG", "list": [{ "count": 50976, "name": "Retail", "percentage": 63.669174 }, { "count": 9123, "name": "Corporate", "percentage": 54.98191 }] }, { "count": 57700, "name": "SEP", "list": [{ "count": 47999, "name": "Retail", "percentage": 57.557453 }, { "count": 9701, "name": "Corporate", "percentage": 45.34584 }] }, { "count": 66503, "name": "OCT", "list": [{ "count": 51877, "name": "Retail", "percentage": 50.480946 }, { "count": 14626, "name": "Corporate", "percentage": 30.705591 }] }, { "count": 69318, "name": "NOV", "list": [{ "count": 55849, "name": "Retail", "percentage": 48.811974 }, { "count": 13469, "name": "Corporate", "percentage": 46.88544 }] }, { "count": 77159, "name": "DEC", "list": [{ "count": 63388, "name": "Retail", "percentage": 51.722725 }, { "count": 13771, "name": "Corporate", "percentage": 59.923027 }] }];
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private api: CustomHttpService
  ) { }
  script = {
    name: 'GoogleCharts',
    src: 'https://www.gstatic.com/charts/loader.js'
  };

  loadScript(): any {
    return Observable.create((observer) => {
      if (document.getElementById(this.script.name) == null) {
        const node = document.createElement('script');
        node.src = this.script.src;
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        node.id = this.script.name;
        document.getElementsByTagName('head')[0].appendChild(node);
        node.onload = () => {
          observer.complete();
        };
      } else {
        observer.complete();
      }
    });
  }

  getMinYear() {
    return this.api.get('api/dashboard/MinYear');

  }

  getLocations() {
    return this.api.get('api/metrics/locations');
  }

  getYearlyTrips() {
    return this.api.get('api/metrics/trips');
  }

  getMonthlyTrips(year) {
    return this.api.get('api/metrics/trips?year=' + year);
  }

  getDayWiseTrips(year, month) {
    return this.api.get('api/metrics/trips?year=' + year + '&month=' + month);
  }

  getTripsByYear(year) {
    return this.api.get('api/metrics/tripsMonthly?year=' + year + '&month=0');
  }

  getVehicleAvailablity(locCode) {
    return this.api.get('api/metrics/vehicleAvailability/' + locCode);
  }

  getTransporters() {
    return this.api.get('api/metrics/transporters');
  }

  getViolations() {
    return this.api.get('api/metrics/violations');
  }

  getViolationsByCustomerId(custId) {
    return this.api.get('api/metrics/violations/' + custId);
  }

  getViolationsByCustomerIdAndYear(year, custId) {
    return this.api.get('api/metrics/violations/' + custId + '?year=' + year);
  }

  getViolationsByCustomerIdAndYearAndMonth(year, month, custId) {
    return this.api.get('api/metrics/violations/' + custId + '?year=' + year + '&month=' + month);
  }

  getFleetUtilizationByCustId(custId) {
    return this.api.get(`api/metrics/fleetUtilization?custId=${custId}`);
  }

  getFleetUtilizationByCustIdAndYear(year, custId) {
    return this.api.get(`api/metrics/fleetUtilization?year=${year}&custId=${custId}`);
  }

  getFleetUtilizationByCustIdYearAndMonth(year, month, custId) {
    return this.api.get(`api/metrics/fleetUtilization?month=${month}&year=${year}&custId=${custId}`);
  }
}
