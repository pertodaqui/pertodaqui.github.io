const parks = [
  {
    "id": "1",
    "title": "Parque da Cidade de Pindamonhangaba",
    "meta": "Ampla área de lazer com lagos, pistas de caminhada, ciclovia e espaços para eventos, ideal para famílias.",
    "location": "Pindamonhangaba - SP",
    "image": "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSz_gFMHJyocEl8jaOtgnUs5vfAInUNnWxG1roGR2l20Wm26d8DgZSDrgUXpE-ZGZvhvkcCvkv8nYdyNjhhfnRIRIxwF51FMlUGH_0m2-g2OadOQ35CJ9pTWYRdCnH_cipm07km5Vw=w572-h385-n-k-no",
    "lat": -22.935631946507378, 
    "lng": -45.4463731367728
  },
  {
    "id": "2",
    "title": "Bosque da Princesa",
    "meta": "Um refúgio histórico e arborizado às margens do Rio Paraíba do Sul, com árvores centenárias e ambiente relaxante.",
    "location": "Pindamonhangaba - SP",
    "image": "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyrU99sgUD3lQaWiHF2oeuc6sgXRN4WPc8QfycugDNAKkEubkA39FgbBz8jVLb7Gk87j_phnd5GWQQmKcx5QatY1WHH5JxfqptpIIt5HE1VNImhsGXftWEwDrDLcqNuabcerRY-ZA=s1360-w1360-h1020-rw",
    "lat": -22.920213066691026, 
    "lng": -45.46264497707749
  },
  {
    "id": "3",
    "title": "Parque Natural Municipal do Trabiju",
    "meta": "Reserva de Mata Atlântica focada em ecoturismo, com trilhas, biodiversidade rica e educação ambiental.",
    "location": "Pindamonhangaba - SP",
    "image": "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwZB12SEcwLrh0X7_R-P4OMae746O4R1ty_35ZVuNlHwg2fiPpleeOaC0WhnnMmc8XFognsJtbYI3E9eIDiIK9fpSxO1NtDfryt39DwLvOuiX9wyqy12cPTirzg3g_AdnJQrks=w270-h312-n-k-no",
    "lat": -22.844926026393985, 
    "lng": -45.51778843583688
  },
  {
    "id": "4",
    "title": "Parque Pico do Itapeva",
    "meta": "Localizado na divisa, oferece uma das vistas mais espetaculares da Serra da Mantiqueira, avistando-se várias cidades do Vale.",
    "location": "Pindamonhangaba - SP",
    "image": "https://upload.wikimedia.org/wikipedia/commons/e/e8/Vista_do_Pico_do_Itapeva_SP.jpg",
    "lat": -22.760875453995965, 
    "lng": -45.530120790954534
  },
  {
    "id": "5",
    "title": "Fazenda Nova Gokula",
    "meta": "Maior comunidade Hare Krishna da América Latina, turismo espiritual e ecológico.",
    "location": "Pindamonhangaba - SP",
    "image": "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSycQyfR-x6q4V66NqPWtcC-l8waE3-u7F98Il6Jyw7Wgauk-LylGsREfQUfe1lcSjXmQmBe5vgaDAlhUF7dPFDfDqkTbUhN1J8iqAt47EAU_cywV_rJtznqAmRaDJptZRITDSes=w408-h272-k-no",
    "lat": -22.770809743377704,
    "lng": -45.46375931680147
  },
  {
    "id": "7",
    "title": "Praça Monsenhor Marcondes",
    "meta": "Praça central com áreas de descanso, eventos culturais e convivência.",
    "location": "Pindamonhangaba - SP",
    "image": "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepbWnIkqPz0D42fQT5wtAv0AJwpPWwlZ6-WAP2l9iDn_hp89SDZSZ3FoQpf4tQdTU538jEF5MI9x-si5stLQ0lvmb7kfoDlZ-js7uzRfSsTSYbEUUADsgwYAGHk083VDj_otmpA=w426-h240-k-no",
    "lat": -22.92552666034673, 
    "lng": -45.461817257143686
  },
  {
    "id": "8",
    "title": "Pórtico de Pindamonhangaba",
    "meta": "Portal de entrada da cidade, símbolo de boas-vindas e identidade local.",
    "location": "Pindamonhangaba - SP",
    "image": "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoLb44Imc44gswIoNPcVlfeHCO6coKOWMdSc61OgjShI6skYzK5y4ymOEHKVGQyxxLBF11en_wZCuEaXui3L9xX3DRUGQzskoPqssfgY1x2ID8886mkW67PkXvLADp1hqEUMfPUuoE6GXxK=w408-h306-k-no",
    "lat": -22.97707455825562, 
    "lng": -45.46205807740587
  },
  {
    "id": "9",
    "title": "Praça do Quartel",
    "meta": "Praça pública revitalizada no centro de Pindamonhangaba, ideal para passeios, eventos, atividades esportivas e culturais.",
    "location": "Pindamonhangaba - SP",
    "image": "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepyPEseEfQAze9BZjKf0ukXp1qo_l9cITURShR0WuNETZI0MO72TBXNAMURuSMAKCiKPVgel2K7mo96TU0TrGqU46r70ex_gjOFb064hc8-41NwfZ7RtwyK65e7DqFpBDKt1w5M=w408-h288-k-no",
    "lat": -22.92315476562744, 
    "lng": -45.46490299097322
  },
  {
    "id": "portal-lagoinha",
    "title": "Portal de Lagoinha",
    "meta": "Ponto de entrada na cidade, símbolo de boas-vindas e identidade local.",
    "location": "Lagoinha - SP",
    "image": "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqStHfgT3rvdxqdWCj5lS6QExf85l2D-N3TZblfQvxpsNM3476lXNGLab9VrjvIU_KSsfTwzJ7y35nIzNR7tbjgsF0SlUzpXe8vL_PyeHvH6MgXB3FiGygxHuQdOPqewdxP_J_9Rg=w413-h240-k-no",
    "lat": -23.10005924440595, 
    "lng": -45.196849462204675
  },
  {
    "id": "parque-municipal-itaim-taubate",
    "title": "Parque Municipal do Itaim",
    "meta": "Vasta área verde que abriga o casarão de Bento do Amaral Gurgel e trilhas de Mata Atlântica preservada.",
    "location": "Taubaté - SP",
    "image": "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqlfdAJ3yaFbnOhHNjX1up9IemyVfgeJN70vkYv_vxZsIYOWrmijsbW101Q5_XH2h2vO6DR_a5CC5-KQCdWP-mpHkJOaPDg2AgMJn2CIMEZCGTpRxGjVOKCoLlt9YdMwN2N9tDV=w408-h306-k-no",
    "lat": -23.037097822577824, 
    "lng": -45.53384617888919
  },
  {
    "id": "horto-municipal-taubate",
    "title": "Horto Municipal de Taubaté",
    "meta": "Espaço de lazer e educação ambiental com trilhas leves e grande diversidade de espécies arbóreas.",
    "location": "Taubaté - SP",
    "image": "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqewGACwTPFM0svORkJBFswpbc26-v6SwwJP6mUR6WSAmI5k2n7w-ux9dU5GWp4KLhPn12ktzGrnmpznSC37GgY285fMaxFjGKoZtRtmTIHvcBOLkYnAMWZt3X4k5CRuZ2jofr8Pg=w576-h229-p-k-no",
    "lat": -23.017945653974884, 
    "lng": -45.53568793060793
  },
  {
    "id": "parque-do-sedes",
    "title": "Parque SEDES",
    "meta": "Complexo com grandes lagos e extensas áreas gramadas, funcionando como um importante pulmão verde urbano.",
    "location": "Taubaté - SP",
    "image": "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepyhbAtjGoC-DiQ_iL_iXxuwhYU-f-c6y8ukRl91oSR7Oc6hsTRT0kjUv-2PQNMOyQBx1qOUG1rE8bAwELUiQCYmX9HAZR_ZqtwZ4wrE4NHAPSMD-_v3wSjKUOVshWlZJd-jg-j=w426-h240-k-no",
    "lat": -23.009256083039443, 
    "lng": -45.545157624309624
  }
];



export default parks;
