const Discord = require("discord.js")
async function getEmoji(k) {

   let emoji = "";
   if (k === 0) {
      emoji = "<:fulljulius:942053420028809256>";
   } else if (k === 1) {
      emoji = "<:fullelcid:942053417810022431>";
   } else if (k === 2) {
      emoji = "<:fullcaocao:942053416396550194>";
   } else if (k === 3) {
      emoji = "<:fullcm:942053418900529172>";
   } else if (k === 4) {
      emoji = "<:fullfredie:942053419865239592>";
   } else if (k === 5) {
      emoji = "<:fullcleo:942053417109565560>";
   } else if (k === 6) {
      emoji = "<:fullsun:942053420209152040>";
   } else if (k === 7) {
      emoji = "<:fullishida:942053419328368690>";
   } else if (k === 8) {
      emoji = "<:fullmehmed:942053419877822534>";
   } else if (k === 9) {
      emoji = "<:fullmulan:942053419609362444>";
   } else if (k === 10) {
      emoji = "<:fullragnarok:942053419756159011>";
   } else if (k === 11) {
      emoji = "<:fullson:942053419936526466>"; //epic ones start
   } else if (k === 12) {
      emoji = "<:fullherman:942053419731001344>";
   } else if (k === 13) {
      emoji = "<:fullkuso:942053420091727932>";
   } else if (k === 14) {
      emoji = "<:fullscipio:942053420288864296>";
   } else if (k === 15) {
      emoji = "<:fulljoan:942053419886190663>";
   } else if (k === 16) {
      emoji = "<:fulleulji:942053419789729902>";
   } else if (k === 17) {
      emoji = "<:fullboudica:942053415897403454>";
   } else if (k === 18) {
      emoji = "<:fullpela:942053419735187459>";
   } else if (k === 19) {
      emoji = "<:fullbeli:942053414551044136>";
   } else if (k === 20) {
      emoji = "<:fullbaibars:942053414475546674>";
   } else if (k === 21) {
      emoji = "<:fullosman:942053420091727963>";
   } else if (k === 22) {
      emoji = "<:fullmaltida:942053419789733938>";
   } else if (k === 23) {
      emoji = "<:fullbjorn:942053414400040960>";
   } else if (k === 24) {
      emoji = "<:fulltamar:942053420305625098>";
   } else if (k === 25) {
      emoji = "<:fullgaius:942053419470970911>"; //elite startes
   } else if (k === 26) {
      emoji = "<:fulltomoe:942053420305612820>";
   } else if (k === 27) {
      emoji = "<:fulllancelot:942053420012032000>";
   } else if (k === 28) {
      emoji = "<:fullsarka:942053419324162069>";
   } else if (k === 29) {
      emoji = "<:julius:942053768546095135>"; //legendary CS
   } else if (k === 30) {
      emoji = "<:elcid:942053768562892821>";
   } else if (k === 31) {
      emoji = "<:cc:942053768571260958>";
   } else if (k === 32) {
      emoji = "<:cm:942053768210554971>";
   } else if (k === 33) {
      emoji = "<:fredie:942053768416100363>";
   } else if (k === 34) {
      emoji = "<:cleo:942053768239915029>";
   } else if (k === 35) {
      emoji = "<:sun:942053768973930566>";
   } else if (k === 36) {
      emoji = "<:ishida:942053768713896016>";
   } else if (k === 37) {
      emoji = "<:mehmed:942053768613224450>";
   } else if (k === 38) {
      emoji = "<:mulan:942053768747417661>";
   } else if (k === 39) {
      emoji = "<:ragnarok:942053768705482772>";
   } else if (k === 40) {
      emoji = "<:son:942056297170362429>"; //epic CS
   } else if (k === 41) {
      emoji = "<:scipio:942056296910307389>";
   } else if (k === 42) {
      emoji = "<:kuso:942056297203916800>";
   } else if (k === 43) {
      emoji = "<:heman:942056297191313458>";
   } else if (k === 44) {
      emoji = "<:joan:942056297308758066>";
   } else if (k === 45) {
      emoji = "<:eulji:942056297015152650>";
   } else if (k === 46) {
      emoji = "<:boudica:942056296306344006>";
   } else if (k === 47) {
      emoji = "<:pelagius:942056297199702016>";
   } else if (k === 48) {
      emoji = "<:bela:942056296713183322>";
   } else if (k === 49) {
      emoji = "<:baibars:942056294519566406>";
   } else if (k === 50) {
      emoji = "<:osman:942056297182924820>";
   } else if (k === 51) {
      emoji = "<:maltida:942056297212285008>";
   } else if (k === 52) {
      emoji = "<:bjorn:942056297120026684>";
   } else if (k === 53) {
      emoji = "<:tamar:942056297283612682>";
   } else if (k === 54) {
      emoji = "<:gaius:942054016148463628>"; //elite CS
   } else if (k === 55) {
      emoji = "<:tomow:942054016379129866>";
   } else if (k === 56) {
      emoji = "<:lancelot:942054015909367859>";
   } else if (k === 57) {
      emoji = "<:sarka:942054016169414656>";
   } else if (k === 58) {
      emoji = "<:gold1:942056622262472744>"; //gold star
   } else if (k === 59) {
      emoji = "<:gold2:942056622468001792>";
   } else if (k === 60) {
      emoji = "<:gold3:942056622354751538>";
   } else if (k === 61) {
      emoji = "<:silver1:942056622337966130>"; //silver star
   } else if (k === 62) {
      emoji = "<:silver2:942056622577041460>";
   } else if (k === 63) {
      emoji = "<:silver3:942056622639972382>";
   } else if (k === 64) {
      emoji = "<:50000food:942055985017684098>"; //food
   } else if (k === 65) {
      emoji = "<:150000food:942055985084772372>";
   } else if (k === 66) {
      emoji = "<:50000wood:942055984925380668>"; //wood
   } else if (k === 67) {
      emoji = "<:150000wood:942055984803762207>";
   } else if (k === 68) {
      emoji = "<:60global:942056171920039966>"; //speed ups
   } else if (k === 69) {
      emoji = "<:60building:942056171760676894>";
   } else if (k === 70) {
      emoji = "<:60research:942056171714510859>";
   } else if (k === 71) {
      emoji = "<:5000xp:942055985185427506>"; //tok
   } else if (k === 72) {
      emoji = "<:1000xp:942055984162045993>";
   }
   return emoji;
}
module.exports = { getEmoji }