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
  },
  {
    "id": "parque-ecologico-da-mocota-cacapava-sp",
    "title": "Parque Ecológico da Moçota",
    "meta": "Museu em Caçapava, com acervo cultural e histórico da região.",
    "location": "Caçapava - SP",
    "image": "https://lh3.googleusercontent.com/places/ANXAkqFwfrBYKgoeAg-BQeZK8n3YmEofeBSaHaakw5CAV1xlShFmfQXfOKmUyi0nZN3v7hcvsXwCRwdwtfAFlSgPFwk41YBWpcj9Hg=s1600-w1600",
    "lat": -23.0769681,
    "lng": -45.7113004
  },
  {
    "id": "parque-da-cerejeira-de-campos-do-jordao-campos-do-jordao-sp",
    "title": "Parque da Cerejeira de Campos do Jordão",
    "meta": "Área verde em Campos do Jordão, ideal para lazer e contato com a natureza.",
    "location": "Campos do Jordão - SP",
    "image": "https://lh3.googleusercontent.com/places/ANXAkqHw82UPLZWeLM698KY38Co1l-98zbmJHnvoKhLjbGVKcsR_kPlEqF3MalcSaUxDn2laCkj5Ws6cBXcbQKe35J7zdiA8s5QVLRo=s1600-w828",
    "lat": -22.7614598,
    "lng": -45.6208077
  },
  {
    "id": "parque-da-floresta-encantada-campos-do-jordao-sp",
    "title": "Parque da Floresta Encantada",
    "meta": "Área verde em Campos do Jordão, ideal para lazer e contato com a natureza.",
    "location": "Campos do Jordão - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNEAq4zXV-_NU3huQm6iesghp4Tm8wVK8tOx3bEhH717NDHxWfCmBEawoHwCmVhmxGiSYwHN0H1nZVyDTdYkig5ROzqMUGWCIs61Lk8YckaJKartr0OElPx2LD3YqohLoMAM_u1x32WGTrJ5lg=s1600-w1200",
    "lat": -22.7467854,
    "lng": -45.5636509
  },
  {
    "id": "parque-amantikir-campos-do-jordao-sp",
    "title": "Parque Amantikir",
    "meta": "Área verde em Campos do Jordão, ideal para lazer e contato com a natureza.",
    "location": "Campos do Jordão - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNEH2W8_hsMfUR4nkLCW1Zke_4hlKUcCQW3RWHnqAQpATd1I1ji7rY6nNIi8g5OX9-kv81sA6cUEo7px9t0TsRBnEYwxyot9lXV0RhX80WScPFTLZN9AXtDmmeHUpB1KOkhzRbLIXgu3aOYsUg=s1600-w1600",
    "lat": -22.7835819,
    "lng": -45.6028104
  },
  {
    "id": "parque-dos-elefantes-campos-do-jordao-sp",
    "title": "Parque dos Elefantes",
    "meta": "Área verde em Campos do Jordão, ideal para lazer e contato com a natureza.",
    "location": "Campos do Jordão - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNHqVoSnaWDBZoQcwgCRjSaDxKHltVFPLGaLzvvtNmy6_7EPfirBOXepktc2eEsVRlAkdIwNtrh63SzJUhk41kJ8pi8GYs8DMQsgqufotn-_LJlRn15FyZbfDQwo3ZjidbC_Lg6tAtZmsav6FQ=s1600-w1600",
    "lat": -22.713153,
    "lng": -45.5663314
  },
  {
    "id": "parque-da-lagoinha-campos-do-jordao-sp",
    "title": "Parque da Lagoinha",
    "meta": "Área verde em Campos do Jordão, ideal para lazer e contato com a natureza.",
    "location": "Campos do Jordão - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNE7AdNf8-ffyl9Ly8DxcITtWfWFev7-Jz9-Xd6vc3MZQQs4NwulfOHT_taKj0vieS9oT2TeaB-_jjtL5n1vMQkU20ofxLeYnsp1p7K6X_AvQKp0ZpmsHz1WtmlzKhvfXND5_6vglF_LBNFsNy8=s1600-w1600",
    "lat": -22.7094417,
    "lng": -45.5479686
  },
  {
    "id": "parque-capivari-campos-do-jordao-sp",
    "title": "Parque Capivari",
    "meta": "Área verde em Campos do Jordão, ideal para lazer e contato com a natureza.",
    "location": "Campos do Jordão - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNHJXA2Hy0oPxiSaJY_1xDrPDOP7oEAgcJ4rKQano5PzmFxa7c3iF03olFQ9gtEch9SKOiYNuZUB2pjacLsv_XdJ0qDNPR3SysJkQ6n0s-5lkbLUSS_XX-uSrQMAmdIB6WkDX-Mrwy7Uaa4FUw=s1600-w1600",
    "lat": -22.7177723,
    "lng": -45.5661137
  },
  {
    "id": "prana-park-campos-do-jordao-sp",
    "title": "Prana Park",
    "meta": "Área verde em Campos do Jordão, ideal para lazer e contato com a natureza.",
    "location": "Campos do Jordão - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNFkXPXj6dZpJaR7orpt-Jao2enJjAsUT9A-3h7jpY_Xj7ro8OQsQ8NZdkiSHVX5JlrmLEQAojomAzUJQFqnugrjDO-po_RWR8P2D781H8eEPMfdljHJv4GMsdqjFM1T43jMePvl0JqQgxANPsc=s1600-w1600",
    "lat": -22.7646054,
    "lng": -45.5400579
  },
  {
    "id": "fazendinha-toriba-campos-do-jordao-sp",
    "title": "Fazendinha Toriba",
    "meta": "Área verde em Campos do Jordão, ideal para lazer e contato com a natureza.",
    "location": "Campos do Jordão - SP",
    "image": "https://lh3.googleusercontent.com/places/ANXAkqEjx4hZwYNvSOixMvbsvxD_GsOEvzKWjmX_yvFNA7wdQOmk3SndvxIoLPAg2GhEA487Mw6RGQfjpkNdP37Xm1VZFwu7rfOB7dQ=s1600-w1600",
    "lat": -22.7759455,
    "lng": -45.6020248
  },
  {
    "id": "treno-de-montanha-campos-do-jordao-campos-do-jordao-sp",
    "title": "Trenó de Montanha - Campos do Jordão",
    "meta": "Área verde em Campos do Jordão, ideal para lazer e contato com a natureza.",
    "location": "Campos do Jordão - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNGNDwXnbOU1G7p2pjuBIuTR8vB2k_gSAt5xfPAFcOFY4WQ6tjgf6AqaSXSfL-oz00DOiCNpr-y9kmqrExKqSWK02R2tdQ922ukZ6F_OJAiV36ncx1eWnYIhr447DqAtqMHGSLhtLWppl2dcvE8=s1600-w1600",
    "lat": -22.7135335,
    "lng": -45.5660836
  },
  {
    "id": "morro-do-elefante-campos-do-jordao-sp",
    "title": "Morro do Elefante",
    "meta": "Área verde em Campos do Jordão, ideal para lazer e contato com a natureza.",
    "location": "Campos do Jordão - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNE73FjJxiJYq85ZLs4lJLoTe3VaX-RnmnhOXrfEuF8H--bcmR4Qpn9EIVaoSwvdnxF-7M6Wy1S_aQx6ycY14lEfU28oHC0lDDtzDFoz77ihtgrqP_PLKeybtAQyb6BzPbXOXh1Ne43hf9LoAQ=s1600-w1600",
    "lat": -22.7135276,
    "lng": -45.5665424
  },
  {
    "id": "mirante-parque-amantikir-campos-do-jordao-sp",
    "title": "Mirante - Parque Amantikir",
    "meta": "Área verde em Campos do Jordão, ideal para lazer e contato com a natureza.",
    "location": "Campos do Jordão - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNFVAwwhDl6pRooFXgbq0aSmaRdqFe0O23QOnsEmElC4iGEx5dGRFyvpcj1okhb3o3VB6_SjgkZEWAzO5IGheuB41FaKuaMIcfxHBsCAu4iVoHWYcbyLWdNcVZ4wrVc8zAdZ-y_W8xDBO9SPsTA=s1600-w1600",
    "lat": -22.7834252,
    "lng": -45.6082952
  },
  {
    "id": "aventura-no-rancho-campos-do-jordao-sp",
    "title": "Aventura no Rancho",
    "meta": "Área verde em Campos do Jordão, ideal para lazer e contato com a natureza.",
    "location": "Campos do Jordão - SP",
    "image": "https://lh3.googleusercontent.com/places/ANXAkqHBy2YCr8F2nhfdeGHb4-WzVK4Rog9pDjqKKtfEdEjO-Xe4graF9N_dwXmXssZDDOsRl5TR4dw62bbfu-JvRHFMFEhbIegk50Y=s1600-w660",
    "lat": -22.6914398,
    "lng": -45.50337810000001
  },
  {
    "id": "tubo-insano-do-tarundu-campos-do-jordao-sp",
    "title": "Tubo Insano do Tarundu",
    "meta": "Área verde em Campos do Jordão, ideal para lazer e contato com a natureza.",
    "location": "Campos do Jordão - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNFA-TFYXsZCOjE9k6hDpQl5RB6jhiyaddqzdlCcFx295vlWxlrXITLxHwWkPqHKKTdTQCQWVbQ7RfTQ_xrF-z26gz5B3ioi0RRUE96rfHdCSMmTdgGiwBFqWyp-9NsHViP6u6DgFMta-omm5O4=s1600-w1600",
    "lat": -22.7663404,
    "lng": -45.6026888
  },
  {
    "id": "jardim-dos-pinhais-ecco-parque-santo-antonio-do-pinhal-sp",
    "title": "Jardim dos Pinhais Ecco Parque",
    "meta": "Área verde em Santo Antonio do Pinhal, ideal para lazer e contato com a natureza.",
    "location": "Santo Antonio do Pinhal - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNGq8CdNIK-8y68VMe60-rjavjzsSsCsiPRg6x7xxgg1lfgJUZvqYaXdfguNDdA96foFRc8vZ0g7pjxNgRMTcPvSvINyC_b-rLeO_6Ug5r5XOjuqJQ9RcpNmGvzsIq4Ch_-5hQjr2X4agWueyqg=s1600-w1600",
    "lat": -22.828921,
    "lng": -45.64444
  },
  {
    "id": "parque-o-menino-e-o-mundo-santo-antonio-do-pinhal-sp",
    "title": "Parque o menino e o mundo",
    "meta": "Área verde em Santo Antonio do Pinhal, ideal para lazer e contato com a natureza.",
    "location": "Santo Antonio do Pinhal - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNEhPG3wzWSGCtRMtFoMTjfPo6WJs4maOytYq634UwGNA-Qy1JTa-pAVnNrHHVZ60XyKw_GO_cq9tf0lwmA5NEYmTjpz-vDRGIsnuxlVKhJ68oSRLNErhAO3pRT6l7UrAcoPzgk1o3Se8mW0=s1600-w1600",
    "lat": -22.8247314,
    "lng": -45.6621031
  },
  {
    "id": "praca-do-artesao-santo-antonio-do-pinhal-sp",
    "title": "Praça do Artesão",
    "meta": "Área verde em Santo Antonio do Pinhal, ideal para lazer e contato com a natureza.",
    "location": "Santo Antonio do Pinhal - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNHCD3XmVwhLSKdgQ4OmTYOZHBLth_gP8AAw8JRNNdcH4gf2XNPvjGnif3d14bLtBmWIAYlcfG3a2Qy4EGFV8bKKQw-mj-p-tLEhTn0jx36rJz1e6hBt-KbPFFw7mUMXtmoxLjsRkE__jjZKgdk=s1600-w1600",
    "lat": -22.8248916,
    "lng": -45.6632164
  },
  {
    "id": "apa-santo-antonio-do-pinhal-santo-antonio-do-pinhal-sp",
    "title": "APA Santo Antonio do Pinhal",
    "meta": "Área verde em Santo Antonio do Pinhal, ideal para lazer e contato com a natureza.",
    "location": "Santo Antonio do Pinhal - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNHFRaQyz7zu6zm6MYBKEd83-7dVWncGnTP0AxQa-ufZL5LbI-JpJiTn6ZuZ978o4ll2AC60WW94eO7IXC70UOnIBTG7mgoa1Or7rJ0YlX94pQbw3R2JF_x4wCPqfcuBCz8trs4nr4Zem1IaHQ=s1600-w1600",
    "lat": -22.8275194,
    "lng": -45.6371634
  },
  {
    "id": "boulevard-araucaria-santo-antonio-do-pinhal-sp",
    "title": "Boulevard Araucária",
    "meta": "Área verde em Santo Antonio do Pinhal, ideal para lazer e contato com a natureza.",
    "location": "Santo Antonio do Pinhal - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNHL8RiriNzd-0067D7oIvelaC1aPmlMSlqFXQkPY0pjaA_E4f8CMpMIrF9ZpRIBLK17rOKp5x8Ih9Se14c3kDvBcm7oI0nN_AEvJOPH0bNmFVJUf8P9jloxCf0XgKO0p5i8htbK9MbS4GEpyw=s1600-w960",
    "lat": -22.8254195,
    "lng": -45.6662669
  },
  {
    "id": "praca-monsenhor-joao-jose-de-azevedo-santo-antonio-do-pinhal-sp",
    "title": "Praça Monsenhor João José de Azevedo",
    "meta": "Área verde em Santo Antonio do Pinhal, ideal para lazer e contato com a natureza.",
    "location": "Santo Antonio do Pinhal - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNGqAB4I7jFRxTv6EXfFtDe_R9ysQcbhwFui8F2uhp2WOafPvQ1lAKNCG3N0716aWSL2aSTU7bCSkLvDWgyEe-Z9lx4jawbfmZ4NOR6dIBZrjSwqyP-bxw0JT29-nVdmWW-hWBK4K5vr9gpVT1c=s1600-w1600",
    "lat": -22.8257342,
    "lng": -45.6616352
  },
  {
    "id": "pico-agudo-santo-antonio-do-pinhal-sp",
    "title": "Pico Agudo",
    "meta": "Área verde em Santo Antonio do Pinhal, ideal para lazer e contato com a natureza.",
    "location": "Santo Antonio do Pinhal - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNHW2h-S7djuY2pXwXn0yV17oX-MI3_lyD23cd8pjqMgWO9is9ouD7UlX44L9Poh3FDvC3HK-FPrpgvS33BAQqOr35pj5nVcQYJlPrnv1HoXRY4gZd3nw6r-IQzLGjgpqiM9isX87mxMImczgzg=s1600-w1600",
    "lat": -22.8631536,
    "lng": -45.6513574
  },
  {
    "id": "jardins-verticais-mundo-verde-santo-antonio-do-pinhal-sp",
    "title": "Jardins Verticais Mundo Verde",
    "meta": "Área verde em Santo Antonio do Pinhal, ideal para lazer e contato com a natureza.",
    "location": "Santo Antonio do Pinhal - SP",
    "image": "https://lh3.googleusercontent.com/places/ANXAkqHElCNjw0g9kNPFVs3IjL7TU2rb6oNwTQklkju0h5Ig0ZeglOMOdoN2wb9tKU9tPed-CE0nIUfFliA8Drs52xezNKbUAJkzHd4=s1600-w851",
    "lat": -22.8247451,
    "lng": -45.6681844
  },
  {
    "id": "hotel-reserva-santo-antonio-do-pinhal-santo-antonio-do-pinhal-sp",
    "title": "Hotel Reserva Santo Antônio do Pinhal",
    "meta": "Área verde em Santo Antonio do Pinhal, ideal para lazer e contato com a natureza.",
    "location": "Santo Antonio do Pinhal - SP",
    "image": "https://lh3.googleusercontent.com/places/ANXAkqHJPo7PL6BrH8Ho_c_XyT-s5CdwgQIPZnQbgQ8JXh24Vhj_NPcL5lNQqVQf7_kcLM4j8949CEAjxMjqZ_ontlizgueHgfab5Ho=s1600-w1536",
    "lat": -22.8336097,
    "lng": -45.6692822
  },
  {
    "id": "parquinho-santo-antonio-do-pinhal-sp",
    "title": "Parquinho",
    "meta": "Área verde em Santo Antonio do Pinhal, ideal para lazer e contato com a natureza.",
    "location": "Santo Antonio do Pinhal - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNGEDxwfFE8LLGBMZmxia1TZ7p9tIEL5w2M1BIMpfEEsN5KAwpxYBlGFwSsFSAyjAma4MOkVb2jCpFxRfxm3kqmY--IAtqNInd98G-NUzkeS5s0ZYziumX8N-AnoJj1klVzo4IUWBkCqwqSfCms=s1600-w1600",
    "lat": -22.8121066,
    "lng": -45.70518089999999
  },
  {
    "id": "mirante-do-cruzeiro-santo-antonio-do-pinhal-sp",
    "title": "Mirante do Cruzeiro",
    "meta": "Área verde em Santo Antonio do Pinhal, ideal para lazer e contato com a natureza.",
    "location": "Santo Antonio do Pinhal - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNEKSIfUooCdX23l4l_0DpH4LEcwnG-Qd1Hb4RsDLb29Rd5aEAiBWJOtqhb9pv-F-jL-cUV8PHW-DkZHDifsj9fTEB97CxoO_Ne55eQGeeSq1j2jaPt4SjqKzWFU9J3HboKfoELDpQ6g_tDTfA=s1600-w1600",
    "lat": -22.8258955,
    "lng": -45.66339900000001
  },
  {
    "id": "pousada-e-restaurante-recanto-do-pico-santo-antonio-do-pinhal-sp",
    "title": "Pousada e Restaurante Recanto do Pico",
    "meta": "Área verde em Santo Antonio do Pinhal, ideal para lazer e contato com a natureza.",
    "location": "Santo Antonio do Pinhal - SP",
    "image": "https://lh3.googleusercontent.com/places/ANXAkqFP5eDxzqSDEd5C7rnZY4IWIop7sMxFF_1DwLdCq7dV46iQUTnr3694rUV8FZKRdz_6IjfCOq7NQ3wYqlzefOJA3zDZBist41g=s1600-w1280",
    "lat": -22.8490079,
    "lng": -45.6685862
  },
  {
    "id": "refugio-jabuticaba-hospedagem-em-santo-antonio-do-pinhal-perto-de-campos-do-jordao-santo-antonio-do-pinhal-sp",
    "title": "Refúgio Jabuticaba | Hospedagem em Santo Antônio do Pinhal | Perto de Campos do Jordão",
    "meta": "Área verde em Santo Antonio do Pinhal, ideal para lazer e contato com a natureza.",
    "location": "Santo Antonio do Pinhal - SP",
    "image": "https://lh3.googleusercontent.com/places/ANXAkqEotFcByE16xBF4MrRwlrlhLjFkLy_4zznPwyG5U1TfMOqFis_P-lKFks8pkgIlGUaHzXtOqjQQzoSpm0kAnZxYwlSj57Ds5E8=s1600-w1600",
    "lat": -22.8038639,
    "lng": -45.64686990000001
  },
  {
    "id": "restaurante-arco-iris-santo-antonio-do-pinhal-sp",
    "title": "Restaurante Arco Íris",
    "meta": "Área verde em Santo Antonio do Pinhal, ideal para lazer e contato com a natureza.",
    "location": "Santo Antonio do Pinhal - SP",
    "image": "https://lh3.googleusercontent.com/places/ANXAkqFqIMh96YAb0OQz0jNaWrnYiTlStSepKlHXa8GEcPQtIgPkVEEl0eHe-H-x0V2H7CKWRIY73YN8MIqewtW3prC_NyQaSQgjZyc=s1600-w1600",
    "lat": -22.8282734,
    "lng": -45.64257
  },
  {
    "id": "voce-na-serra-santo-antonio-do-pinhal-sp",
    "title": "Você na Serra",
    "meta": "Área verde em Santo Antonio do Pinhal, ideal para lazer e contato com a natureza.",
    "location": "Santo Antonio do Pinhal - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNGDbgV8nQfhT_yiPtRpnnHK4Lc_GpKaS3iZpF8SCBEZlXb_Utgg5flXRS7hJLPsFqiJBBKgtL-naLuLJc_HmmKvnifInWrzjima-iIkwEmHcnt0npKX8WBxsshoBzh_HlAtVFb3DcsFzDnqGQ=s1600-w1600",
    "lat": -22.8289837,
    "lng": -45.644568
  },
  {
    "id": "espaco-saua-santo-antonio-do-pinhal-sp",
    "title": "Espaço Sauá",
    "meta": "Área verde em Santo Antonio do Pinhal, ideal para lazer e contato com a natureza.",
    "location": "Santo Antonio do Pinhal - SP",
    "image": "https://lh3.googleusercontent.com/places/ANXAkqFUT11yOAqSBneJvGh3W45Sr-YqwRv2-y0DGUn6kk0Vl3WuR0-_CDETI9j1ntoMK2lNMETYpkiCVhwUN99dJDDmxpoVm_y9q9k=s1600-w1600",
    "lat": -22.8206995,
    "lng": -45.6672615
  },
  {
    "id": "lucas-souza-imoveis-santo-antonio-do-pinhal-santo-antonio-do-pinhal-sp",
    "title": "Lucas Souza Imóveis | Santo Antônio do Pinhal",
    "meta": "Área verde em Santo Antonio do Pinhal, ideal para lazer e contato com a natureza.",
    "location": "Santo Antonio do Pinhal - SP",
    "image": "https://lh3.googleusercontent.com/places/ANXAkqEQCmyFNezMUl9-9qfKjDB8m0lBac2TEdxrPRRNxaJV9HpsZhGjY1asXh4mUN2o-BSb3nGznGGnlO_DJ0dUsiVcY8B-mpJECDU=s1600-w1080",
    "lat": -22.8262557,
    "lng": -45.65985209999999
  },
  {
    "id": "parque-ribeirao-vermelho-sao-jose-dos-campos-sp",
    "title": "Parque Ribeirão Vermelho",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNEpUAl6eR8LKNDlGwWowLrNcPfb3oEjHwcrnIeSq7UvEyq98l5kDWvnADbqfSpn47rtwAaQYHlp78nglVgXxeawkKvo-qLviIxmoPjuLUn5vzWh5kJrHyei9hbIBxfKOlVll4-LkrSurBy_LVM=s1600-w1600",
    "lat": -23.1986381,
    "lng": -45.9608324
  },
  {
    "id": "parque-takeo-kacuta-sao-jose-dos-campos-sp",
    "title": "Parque Takeo Kacuta",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNFgXUhWKjhzQTNd77VHQDNWIWU7KW-cVRGrWLlAYjnDhCSwFLBD05LajG_2OxD_JrEKr3S6uRJ_WTTKTmmnEJ__mo9Z9Bty5iFwBBvxwVyK9-RmsHTeyPFPm0U6VqL9tiolGGcCe37f1mzYrw=s1600-w1600",
    "lat": -23.2363289,
    "lng": -45.8257663
  },
  {
    "id": "thermas-do-vale-sao-jose-dos-campos-sp",
    "title": "Thermas do Vale",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/places/ANXAkqFPTj1jS0Qeq67pmsPjYzObIvFk5l_WJYFuW1GvPnQvBoKerBRU52Thc0WXa2WTqwIDqIYrvTFVdABywFGaDJ0okBYX32-VYZo=s1600-w1024",
    "lat": -23.1998695,
    "lng": -45.9143628
  },
  {
    "id": "glow-park-sao-jose-dos-campos-sao-jose-dos-campos-sp",
    "title": "Glow Park São José Dos Campos",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNHHfBTYW7HLwIY_F0mBmAe4wS1S3J5zff6tzRSETPnYVWH8azLElXr7kgi4aH8pj0FshYZF42bHqnXAeepBnf7zKDTM_RoM-SH3nNXtiNtmLkYBQJ10cRhjv8qK3ULYNDdlCs0G2G2EqJm3l5pPKSBU2g=s1600-w1600",
    "lat": -23.2143856,
    "lng": -45.9014896
  },
  {
    "id": "parque-ecologico-sergio-sobral-de-oliveira-sao-jose-dos-campos-sp",
    "title": "Parque Ecológico Sergio Sobral de Oliveira",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNFCxIqhpl_XgFSw4wDqLX0-E8qABzG_m-tfm2pIBmXBCM2IXh5H-lhSnaum9u23c4b1IdS7vc4lWMMERDI53KtwKTbtZNiCRnjhAqxEFsNTHZxCYshEUxh-zEAiXEWyates4oIEj20QxRlsLz8=s1600-w1600",
    "lat": -23.1720533,
    "lng": -45.79679549999999
  },
  {
    "id": "parks-games-sao-jose-dos-campos-sp",
    "title": "Parks & Games",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNExsgmaGYU_VjKEaAe9zRSbvaGHrgJPRxTmDDVsGwF89gB5Rj4CLcKum20tqNUfx1JhLGmPZNMfHJR8Vm2t9al9wa9TZPEC0DJyxvXT6vSKkZq3yzVgqVDW_hTq_V8bvQJUPeor7axoGg8MN1s=s1600-w1600",
    "lat": -23.2171886,
    "lng": -45.8908766
  },
  {
    "id": "parque-ribeirao-vermelho-sao-jose-dos-campos-sp",
    "title": "Parque Ribeirão Vermelho",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNGOzbhoMtWYpCcEqXaQUPXHOEIjtDW7SlWDBtI52tFGfmvWhrgzzcAfeOe9aELiPhtvczHbE6DczIQWaxNgU_2UKHR396qTP_EU8tqKAU5YvLFXGPL3cXp2QzlJERHKSfNUTu1ZT_qDKAbAL3kxG3xdFw=s1600-w1600",
    "lat": -23.1950982,
    "lng": -45.957908
  },
  {
    "id": "parque-ecologico-hilto-martimianodias-sao-jose-dos-campos-sp",
    "title": "Parque Ecológico Hilto MartimianoDias",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNGy2vMGjUtyxH2cyO-sNAlMaGy6eahXyYlDmS02seEJl2M1GX_H8gZccp-pDwu5LyzoOvnwqSy9VoT9z7pkgcf4YNrQ54sVJ81Age6il5OxY0SYThMpHFGSvcI_tK_p8ByMM63j0row8B3WcQ=s1600-w1600",
    "lat": -23.2226015,
    "lng": -45.8935718
  },
  {
    "id": "parque-alambari-sao-jose-dos-campos-sp",
    "title": "Parque Alambari",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNGlr_3-d8SIEDpj5ShztCkcJcEIYAOIcdh-7JtHqeQnSCqhMV1gqwlNxHQP1oz_ggSMqTEAZtdUFImFFryAwjy_iOHqb_sw8vIDQx6qbp5uAMYVW9qDHY8WFkdmfF-5I2XEUtCKL6TbErquug=s1600-w1600",
    "lat": -23.2153925,
    "lng": -45.81234389999999
  },
  {
    "id": "evolution-jump-park-sao-jose-dos-campos-sp",
    "title": "Evolution Jump Park",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/places/ANXAkqH-PrMrkAMOsCuAFJBVEZ4V5vyESFOmyiU-8rrjGUrVI4n1Rw3y34Ebl39_3E6BMG42MwAZKR4_3grhkUiU0ZsYIKtbIlC4rnE=s1600-w1080",
    "lat": -23.2509009,
    "lng": -45.9084719
  },
  {
    "id": "parque-do-juninho-sjc-sao-jose-dos-campos-sp",
    "title": "Parque do Juninho - SJC",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNGckJ8VZtS7XkELddfihenlvb9hU5U8IezhY70-AhUKv7EaHcFiCyYTu1cPWy5NiFL0wjyJ0HrEv6jiitWEkpyvjczmWsbMwqFD7mP1mvHcoPDZe_WqfL-AHjQhcjHqMsnE6X8HSLys0jJxm5Mjh6KEfg=s1600-w1320",
    "lat": -23.1661192,
    "lng": -45.8917829
  },
  {
    "id": "monumento-colonia-japonesa-jardim-aquarius-sao-jose-dos-campos-sp",
    "title": "Monumento Colonia Japonesa Jardim Aquarius",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNE4jT078v24oadDo3qKExEzRtPtwn9NYBYw8LNRWRA1RDVi4sKxiwe99YisIbCEurcivg6sOuT70sdq54f_wjvUtyTj8pOI4rPMyvhKWak8XXe8jGbikUSLumrScld7eD6y_EVUAJK1bNsQr7I=s1600-w1600",
    "lat": -23.2128507,
    "lng": -45.9099582
  },
  {
    "id": "parque-alberto-simoes-bike-park-sao-jose-dos-campos-sp",
    "title": "Parque Alberto Simões Bike Park",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNGrj4hGsELxFzpRQMBT3In7dJkZchbuBpNKUgHRDDcQl_rvf6Ziw6DUNoabTGz9pzPXt5BWpu_DhCPl4FDC28XbXsEq-9Wt0QWNfSsiHGiCJ7ALkN2Utsl8EXCz7HJKaauaHrVI8HBx3u6VgMs=s1600-w1600",
    "lat": -23.163528,
    "lng": -45.914571
  },
  {
    "id": "vale-sul-shopping-sao-jose-dos-campos-sp",
    "title": "Vale Sul Shopping",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/places/ANXAkqEdeD4Hw7UK1GMlYSJO6PNuMmVmIHVm_RJ34f3WbscsY-10eFLJSfTX9GrcGTSuFI4OXuSKon-GMOpAMx4XmHNKf8o2N1mP9CA=s1600-w1600",
    "lat": -23.2166661,
    "lng": -45.8921911
  },
  {
    "id": "area-de-lazer-jose-da-silva-sao-jose-dos-campos-sp",
    "title": "Área de Lazer José da Silva",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNEajp5lFg4JhBjG0H_nwrVthYM3_KuGnztf5GTcPFDkxQZ3KK87zWOYwNoH8G7hi8wO_s9z-aMIaqQpspkdCIO1RMheU_tQnU42gMxwsd2YKF4yphr3rM_FZyGaxrkStbeF7tbbJGtx1s_Z=s1600-w1600",
    "lat": -23.223227,
    "lng": -45.8768289
  },
  {
    "id": "praca-jossei-toda-sao-jose-dos-campos-sp",
    "title": "Praça Jossei Toda",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNGPXNCkpRzysstNULK-KU_Zpbfzxarj2KpTou-z_VbnMn2X4KLqpZz_5kyxY6aipo4c1v2su0JNZqMtFLrkZnWBcOiR6YMHHhqyINjU5EKCWSDjZYBGWlnGWI2fsmMhtsSJxSoy7vpakL7KStw=s1600-w1600",
    "lat": -23.2210968,
    "lng": -45.88718610000001
  },
  {
    "id": "bosque-dos-eucaliptos-sao-jose-dos-campos-sp",
    "title": "Bosque dos Eucaliptos",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNHpa_PHclhC_t4tW4tjVChpFni2tHIabo5qn7mVh0IrsHB-SMlNylZse_bmncb_Ns-4fQJVMGPy_LMeKMUH73wDDtMe87fSkc1QOruAFi-GQsk-SshcPrrdPrbfcj7x3kWc_8eoQr7Obr0Saw=s1600-w1600",
    "lat": -23.2425583,
    "lng": -45.8873346
  },
  {
    "id": "bosque-da-memoria-sao-jose-dos-campos-sp",
    "title": "Bosque da Memória",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNGypRygsfv37BzFFMD6OsIZWYktIFGgP7qkusG_VO178neZsRV1Z0E8yaLDtFh6QEFVJ_RzEyyoSg32xESK411FA9cdzqmX8R2RWa_X3ptRVcD1IEYxMrQTqhOR9g2HoneLF15aippDWhs2EZk=s1600-w1600",
    "lat": -23.1661731,
    "lng": -45.8908783
  },
  {
    "id": "arena-bosque-bosque-futebol-clube-sao-jose-dos-campos-sp",
    "title": "Arena Bosque - Bosque Futebol Clube",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNElYwjPRuuhxiZLXj4fXSy7OU29H8SkzMWPqUrYTuRrWC0yQZYfgxvywJ-giAGFZmf5bycbIN5Paq3gUi_N3-7CFGe-9d7RfITXdGCa5m7t3IZfIkwvaxpP5E9Ji6Ns3ang5F4bzwKBt-6oJQ=s1600-w1600",
    "lat": -23.2585737,
    "lng": -45.8878045
  },
  {
    "id": "condominio-bosque-engenho-sao-jose-dos-campos-sp",
    "title": "Condomínio Bosque Engenho",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNEPlcDAda6QqlqPT5jlFmSi-tZkA8ErG0_v3hL9M86HThaeAUMTJmKJV139iHSZtXUe0GwEnUXupVHO7YRWKS9tf_gw4FHU1YNJtX6cbFrskBtIsNlSgonClu31HH0VdjdFVRNFb_py3-WhPg=s1600-w879",
    "lat": -23.2064186,
    "lng": -45.9031755
  },
  {
    "id": "clinica-do-bosque-sao-jose-dos-campos-sao-jose-dos-campos-sp",
    "title": "Clinica do Bosque - São José dos Campos",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNHjhSCNBolqT7N1Mgqz2viO_BilJYTHNgLI1V-2AFitctQQDIn7spZIakknAS8-dMdoqm8rfHvjtWuV2QNhL58ctsZ5BvZ-so9IwBehiDhmtAT2ovPENfx4Kh-27yBkUkMDcN658ovJ3iay90A=s1600-w1600",
    "lat": -23.2395983,
    "lng": -45.8853504
  },
  {
    "id": "berkana-buffet-infantil-bosque-de-brincar-sao-jose-dos-campos-sp",
    "title": "Berkana - Buffet Infantil & Bosque de Brincar",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/places/ANXAkqH6OLmBZfETsfUIdkrq0kqBOjHnj_ox2D4Y3ghOJVXb-MomvyQoIt1BPlSKbhPYOXaaJ6VimxPmvtPkRXGW9E7Ci_rkgN3b=s1600-w1200",
    "lat": -23.2050447,
    "lng": -45.8980271
  },
  {
    "id": "sitio-verde-hortifruti-bosque-dos-eucaliptos-sao-jose-dos-campos-sp",
    "title": "Sítio Verde Hortifruti - Bosque dos Eucaliptos",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/places/ANXAkqG1-s8scKinVcdfqpX2g2wu3VC37MCYFlspdQpigMqRAsMm1SXQqq1Jr1wMHxrFZFHicNf-5l6oITXgHIGWzar6GjkrABhgM5k=s1600-w1024",
    "lat": -23.2373539,
    "lng": -45.8846497
  },
  {
    "id": "condominio-bosque-imperial-sao-jose-dos-campos-sp",
    "title": "Condomínio Bosque Imperial",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNGQ6DvBKjq1Map9a7syNjh1KbPSLEbieuqtA4kcAr0iFo3moQInCphW-97k1ZD_mxUW9Sy6IPWGEns2muXWCvIsGrp91rX65mix6qpVwUUmuHFa4t3hy9jkF4F8ienvxRCiWUfs28JxFolhJ6g=s1600-w1080",
    "lat": -23.2077011,
    "lng": -45.907601
  },
  {
    "id": "condominio-edificio-mansoes-bosque-sao-jose-dos-campos-sp",
    "title": "Condomínio Edifício Mansões Bosque",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNFALa2Ihq-ZlZ1n04LoTGvS5_rLULtaZ1fl-DGph5vrcp00mj3vGXdtMysL9X51Na7P47ym1PiBcmB546_uxp_HumAJywSiIjWent0pLsunN-TLzHBeEh9FiVSfhC1HKd_vdRYy2Eq_tgDu_vM=s1600-w1600",
    "lat": -23.2059102,
    "lng": -45.9026471
  },
  {
    "id": "clinica-veterinaria-bosque-dos-bichos-sao-jose-dos-campos-sp",
    "title": "Clinica Veterinária Bosque dos Bichos",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/places/ANXAkqHBt1uaa0SzLo17MIKT8TS25kp_K-QmzFplw_t0tQcgfc-FVMoOpsRFk0CN0sLbhedq8riw4DTVMHv-gwK74ys1mchD_dkQKkI=s1600-w1600",
    "lat": -23.2370576,
    "lng": -45.8851398
  },
  {
    "id": "bosque-imperial-sao-jose-dos-campos-sp",
    "title": "Bosque Imperial",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNHb8VMOeqonZ3zC8TvxMv4cke511neADr4WRcs1dbzGzbAWuZSWqpFEc1qjy1f7QrMF9VQtD9kzBwCuyAj7JQDw80N3Hpe8cLTT3wXI-jA6Ovv9TVwTTWHzv3UQLe6dZGRf4uT-NmH9UbqqMg=s1600-w1280",
    "lat": -23.208688,
    "lng": -45.9069399
  },
  {
    "id": "parque-natural-municipal-augusto-ruschi-sao-jose-dos-campos-sp",
    "title": "Parque Natural Municipal Augusto Ruschi",
    "meta": "Área verde em São José dos Campos, ideal para lazer e contato com a natureza.",
    "location": "São José dos Campos - SP",
    "image": "https://lh3.googleusercontent.com/place-photos/AL8-SNEp9RvAD3-p1iD_ccFmGHORy9Xde_wAq7km54wFAXLGD9sgirs5Kz2Ne-j4A2Ev6HA2L2Q7W5ZBDbEUr7wf8vZGseQI2FAxZGb-BrjBkW0uoyig7Y_WtxhBYfW-C2JRYwCqzfxkOq5CF8NB=s1600-w1600",
    "lat": -23.0714073,
    "lng": -45.9333534
  },

];

export default parks;
