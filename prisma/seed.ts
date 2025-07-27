import { Prisma, PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const salt = bcrypt.genSaltSync(10);

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Gilang Cahyono",
    email: "gilang@gmail.com",
    password: bcrypt.hashSync("1111111", salt),
  },
  {
    name: "Edmon Missenden",
    email: "emissenden0@washington.edu",
    password: bcrypt.hashSync("uCI76`jg'#VT", salt),
  },
  {
    name: "Swen Ashness",
    email: "sashness1@yahoo.com",
    password: bcrypt.hashSync("khN}{/Pb}=jR`&", salt),
  },
  {
    name: "Kare Yaakov",
    email: "kyaakov2@illinois.edu",
    password: bcrypt.hashSync("ch2(%R}ySk", salt),
  },
  {
    name: "Barnabas Robardey",
    email: "brobardey3@newsvine.com",
    password: bcrypt.hashSync("oc%9b@ppro", salt),
  },
  {
    name: "Jens Hammerberg",
    email: "jhammerberg4@bloglines.com",
    password: bcrypt.hashSync("jgc||@3lGN", salt),
  },
  {
    name: "Maximo Symmers",
    email: "msymmers5@godaddy.com",
    password: bcrypt.hashSync("tbunLtU+Q", salt),
  },
  {
    name: "Luise Kollach",
    email: "lkollach6@berkeley.edu",
    password: bcrypt.hashSync("iLSaA$FTqx", salt),
  },
  {
    name: "Flinn Cabral",
    email: "fcabral7@themeforest.net",
    password: bcrypt.hashSync("zMw(D!zgleb&Z", salt),
  },
  {
    name: "Theressa Blackborow",
    email: "tblackborow8@free.fr",
    password: bcrypt.hashSync("k(+/Z>A8+!", salt),
  },
  {
    name: "Christan Dackombe",
    email: "cdackombe9@taobao.com",
    password: bcrypt.hashSync('bW{"M&I!*v', salt),
  },
  {
    name: "Abbie Tschursch",
    email: "atschurscha@thetimes.co.uk",
    password: bcrypt.hashSync("kAv,}}aK8", salt),
  },
  {
    name: "Camila Taig",
    email: "ctaigb@biblegateway.com",
    password: bcrypt.hashSync("mXsozsJ#0Z#*Qm", salt),
  },
  {
    name: "Erie Yitzhok",
    email: "eyitzhokc@myspace.com",
    password: bcrypt.hashSync('rfeSc"5Mi{', salt),
  },
  {
    name: "Napoleon Klosges",
    email: "nklosgesd@newsvine.com",
    password: bcrypt.hashSync("u\\A(.oV6", salt),
  },
  {
    name: "Dorothea Dikes",
    email: "ddikese@bing.com",
    password: bcrypt.hashSync('sq{&"+(*', salt),
  },
  {
    name: "Parsifal Simonsen",
    email: "psimonsenf@prweb.com",
    password: bcrypt.hashSync('mpI!T"mtrq', salt),
  },
  {
    name: "Lefty Levecque",
    email: "llevecqueg@sogou.com",
    password: bcrypt.hashSync("xUV<2txwZ,9u+U<", salt),
  },
  {
    name: "Silvia Pilmer",
    email: "spilmerh@biglobe.ne.jp",
    password: bcrypt.hashSync("sMD`mgO|I", salt),
  },
  {
    name: "Walliw Ditchfield",
    email: "wditchfieldi@google.com.br",
    password: bcrypt.hashSync("aC#aJDh?TgSA", salt),
  },
  {
    name: "Phineas Sporton",
    email: "psportonj@pinterest.com",
    password: bcrypt.hashSync("n*d!`Z~JHv$", salt),
  },
  {
    name: "Tammy Demare",
    email: "tdemarek@wikia.com",
    password: bcrypt.hashSync("bl@Q7b~Y)~m_n", salt),
  },
  {
    name: "Anatol Dunbleton",
    email: "adunbletonl@sourceforge.net",
    password: bcrypt.hashSync("dmVTo/3hg#y%n}@", salt),
  },
  {
    name: "Ebenezer Thomassen",
    email: "ethomassenm@patch.com",
    password: bcrypt.hashSync("dLU&L1L$fQ", salt),
  },
  {
    name: "Brnaby Hugenin",
    email: "bhugeninn@soup.io",
    password: bcrypt.hashSync("w{K|B.G4F", salt),
  },
  {
    name: "Hunt Climer",
    email: "hclimero@rakuten.co.jp",
    password: bcrypt.hashSync("uEFm1kx$)<.AD", salt),
  },
  {
    name: "Barbi Pandie",
    email: "bpandiep@sun.com",
    password: bcrypt.hashSync("fM*KQujm0r", salt),
  },
  {
    name: "Gwenore Semark",
    email: "gsemarkq@illinois.edu",
    password: bcrypt.hashSync("xo&0!7*o", salt),
  },
  {
    name: "Nicol Cundey",
    email: "ncundeyr@unesco.org",
    password: bcrypt.hashSync("h=l6>!ffKiLYlVbI", salt),
  },
  {
    name: "Price Wharin",
    email: "pwharins@latimes.com",
    password: bcrypt.hashSync("m.VI&`yFBb#*", salt),
  },
  {
    name: "Kellen Buckby",
    email: "kbuckbyt@who.int",
    password: bcrypt.hashSync("msqpf\\P=k|ldt", salt),
  },
];

export async function main() {
  for (const user of userData) {
    await prisma.user.create({ data: user });
  }
}

main();
