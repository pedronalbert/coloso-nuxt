export default function (subType) {
  switch (subType) {
    case 'NONE':
      return 0;
    case 'NORMAL':
      return 2;
    case 'NORMAL_3x3':
      return 8;
    case 'ODIN_UNRANKED':
      return 16;
    case 'ARAM_UNRANKED_5x5':
      return 65;
    case 'BOT':
      return 0;
    case 'BOT_3x3':
      return 0;
    case 'RANKED_SOLO_5x5':
      return 4;
    case 'RANKED_TEAM_3x3':
      return 41;
    case 'RANKED_TEAM_5x5':
      return 42;
    case 'ONEFORALL_5x5':
      return 70;
    case 'FIRSTBLOOD_1x1':
      return 72;
    case 'FIRSTBLOOD_2x2':
      return 73;
    case 'SR_6x6':
      return 75;
    case 'URF':
      return 76;
    case 'URF_BOT':
      return 83;
    case 'NIGHTMARE_BOT':
      return 93;
    case 'ASCENSION':
      return 96;
    case 'HEXAKILL':
      return 98;
    case 'KING_PORO':
      return 300;
    case 'COUNTER_PICK':
      return 310;
    case 'BILGEWATER':
      return 313;
    case 'SIEGE':
      return 315;
    case 'RANKED_FLEX_TT':
      return 440;
    case 'RANKED_FLEX_SR':
      return 440;
    case 'DARKSTAR':
      return 610;

    default:
      return 0;
  }
}
