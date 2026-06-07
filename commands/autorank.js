function getRank(xp){
...
}

import fs from 'fs'

export const name = 'autorank'

function xpBar(xp) {

  const max = 100

  let progress =
  Math.min(
    Math.floor((xp % max) / 10),
    10
  )

  return (
    '█'.repeat(progress) +
    '░'.repeat(10 - progress)
  )
}

function saveDB(data) {
  fs.writeFileSync(
    './database.json',
    JSON.stringify(data, null, 2)
  )
}


export async function execute({
  sock,
  m,
  args,
  db
}) {

  const group =
  m.key.remoteJid


  if (
    !group.endsWith('@g.us')
  ) return


  if (!db.rank)
    db.rank = {}


  const user =
  m.key.participant


  if (!db.rank[group])
    db.rank[group] = {}


  if (!db.rank[group][user]) {

    db.rank[group][user] = {
      xp: 0,
      level: 1
    }

  }


  // ON/OFF ADMIN

  if (args[0] === 'on') {

    if (!db.autorank)
      db.autorank = []

    if (
      !db.autorank.includes(group)
    )
      db.autorank.push(group)


    saveDB(db)


    return sock.sendMessage(
      group,
      {
        text:
`╭━━〔 CRIMSON AUTO-RANK 〕━━⬣

⚔️ Auto Rank activé

Les membres gagneront
des niveaux automatiquement.

╰━━━━━━━━━━━━⬣`
      },
      {
        quoted:m
      }
    )
  }


  if (args[0] === 'off') {


    db.autorank =
    db.autorank.filter(
      x => x !== group
    )


    saveDB(db)


    return sock.sendMessage(
      group,
      {
        text:
`╭━━〔 CRIMSON AUTO-RANK 〕━━⬣

❌ Auto Rank désactivé

╰━━━━━━━━━━━━⬣`
      },
      {
        quoted:m
      }
    )
  }



  const data =
  db.rank[group][user]


  const rank = getRank(data.xp)


function getRank(xp){

  if (xp >= 10000)
    return '👑 EMPEROR'

  if (xp >= 7000)
    return '⚜️ LEGEND'

  if (xp >= 5000)
    return '💎 DIAMOND ELITE'

  if (xp >= 3000)
    return '🔥 MASTER'

  if (xp >= 2000)
    return '⚔️ GRAND MASTER'

  if (xp >= 1500)
    return '🏆 CHAMPION'

  if (xp >= 1000)
    return '🥇 GOLD III'

  if (xp >= 800)
    return '🥇 GOLD II'

  if (xp >= 600)
    return '🥇 GOLD I'

  if (xp >= 400)
    return '🥈 SILVER III'

  if (xp >= 300)
    return '🥈 SILVER II'

  if (xp >= 200)
    return '🥈 SILVER I'

  if (xp >= 100)
    return '🥉 BRONZE III'

  if (xp >= 50)
    return '🥉 BRONZE II'

  if (xp >= 20)
    return '🥉 BRONZE I'


  return '🪨 NEWBIE'
}



  await sock.sendMessage(
    group,
    {
      text:
`╭━━〔 CRIMSON RANK 〕━━⬣

👤 @${user.split('@')[0]}

🎖️ Rang :
${rank}

⭐ XP :
${data.xp}

📊 Progression :
${xpBar(data.xp)}

${data.xp % 100}/100 XP

╰━━━━━━━━━━━━⬣`,
      mentions:[
        user
      ]
    },
    {
      quoted:m
    }
  )
}
