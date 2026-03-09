export interface ProviderGames {
  provider: string;
  games: string[];
}

export const ALLOWED_GAMES_LIST: ProviderGames[] = [
  {
    provider: "Spribe",
    games: ["Aviator"]
  },
  {
    provider: "Pragmatic Play",
    games: [
      "Gates of Olympus 1000", "Sugar Rush", "Buffalo King Megaways", "Gates of Olympus Super Scatter",
      "Sugar Rush 1000", "5 Lions Megaways", "The Dog House Megaways", "Sweet Bonanza", "Sweet Bonanza 1000",
      "Gates of Olympus", "Madame Destiny Megaways", "Wolf Gold", "Great Rhino Megaways", "Wild West Gold",
      "Starlight Princess", "Big Bass Bonanza 1000", "Sweet Bonanza Super Scatter", "Wild Wild Riches",
      "Big Bass Crash", "Spaceman", "Bigger Bass Bonanza", "Fruit Party", "The Dog House",
      "Zeus vs Hades Gods of War", "Bigger Bass Splash", "Gems Bonanza", "Starlight Princess 1000",
      "Book of the Fallen", "Mustang Gold", "Sweet Rush Bonanza", "High Flyer", "Hot to Burn Hold & Spin",
      "John Hunter and the Tomb of the Scarab Queen", "Fire Strike", "Sweet Bonanza Xmas", "5 Lions Megaways 2",
      "Chilli Heat", "Diamond Strike", "Joker's Jewels", "Chilli Heat Megaways"
    ]
  },
  {
    provider: "Hacksaw Gaming",
    games: ["Dark Spiral", "Wanted Dead or a Wild", "Le Fisherman", "Le Bandit", "Hot Ross", "RIP City", "Duel at Dawn"]
  },
  {
    provider: "Reel Kingdom",
    games: ["Big Bass Bonanza", "Big Bass Splash"]
  },
  {
    provider: "Winfinity",
    games: ["Luxe Blackjack 2", "Shangrila Baccarat 8"]
  },
  {
    provider: "NetEnt",
    games: ["Starburst", "Divine Fortune Megaways"]
  },
  {
    provider: "Play'n GO",
    games: ["Book of Dead", "Blackjack MH", "Legacy of Dead"]
  },
  {
    provider: "Evolution",
    games: ["Crazy Time", "First Person Lightning Roulette"]
  },
  {
    provider: "Amusnet",
    games: ["Shining Crown", "Live Speed Roulette", "Live European Roulette", "100 Super Hot", "20 Dazzling Hot"]
  },
  {
    provider: "Evoplay",
    games: ["European Roulette"]
  },
  {
    provider: "Bullshark Games",
    games: ["Lemur Levels"]
  },
  {
    provider: "BGaming",
    games: [
      "Aviamasters 2", "Lady Wolf Moon Megaways", "Snoop Dogg Dollars", "Elvis Frog Trueways", "Bonanza Billion",
      "Gold Rush with Johnny Cash", "Golden Avalon Hold and Win", "Lady Wolf Moon", "Aviamasters", "Bonanza Trillion",
      "Heart of Tiki", "Elvis Frog in Vegas"
    ]
  },
  {
    provider: "InOut Games",
    games: ["Chicken Road 2.0", "Chicken Road"]
  },
  {
    provider: "Red Tiger Gaming",
    games: ["777 Strike", "Gonzo's Quest Megaways"]
  },
  {
    provider: "Booming Games",
    games: [
      "Buffalo Hold and Win", "Buffalo Hold and Win Extreme 10,000", "Trollfufu Bonanza", "Gold Gold Gold",
      "Howling Wolves Megaways", "Burning Classics 2"
    ]
  },
  {
    provider: "Wazdan",
    games: ["Hot Slot Gold Coins", "Mighty Wild: Gorilla", "Mighty Wild: Panther"]
  },
  {
    provider: "Belatra",
    games: ["Mummyland Treasures", "Big Wild Buffalo"]
  },
  {
    provider: "Yggdrasil Gaming",
    games: ["Raptor Doublemax"]
  },
  {
    provider: "Betsoft",
    games: ["3 Pots of Olympus", "Coins of Dragon", "Pho Sho", "A Big Catch", "Gold Nugget Rush"]
  },
  {
    provider: "Gamzix",
    games: ["3x3 Royal Piggy: Hold The Spin", "Coin Win: Hold The Spin"]
  },
  {
    provider: "3 Oaks Gaming",
    games: ["DJ Tiger x1000", "Gold Express"]
  },
  {
    provider: "Habanero",
    games: ["American Baccarat Zero Commission"]
  },
  {
    provider: "Big Time Gaming",
    games: ["Extra Chilli"]
  },
  {
    provider: "Foxhound Games",
    games: ["Mortal Oath"]
  },
  {
    provider: "Endorphina",
    games: ["2026 Hit Slot", "Hell Hot 100", "Lucky Streak 3", "Crown Coins"]
  },
  {
    provider: "Spinomenal",
    games: ["Book Of Rebirth"]
  },
  {
    provider: "Greentube",
    games: ["Book of Ra Magic", "Book of Ra Deluxe", "Lucky Lady's Charm Deluxe"]
  },
  {
    provider: "Atlantic Digital",
    games: ["Jewel Boom Super Drop"]
  },
  {
    provider: "Playson",
    games: ["Timeless Diamonds: Hold and Win"]
  },
  {
    provider: "ReelPlay",
    games: ["Atlantis Megaways"]
  },
  {
    provider: "Iron Dog Studio",
    games: ["3 Hot Chilli Peppers Extra"]
  },
  {
    provider: "Relax Gaming",
    games: ["Beast Gains"]
  },
  {
    provider: "Aviatrix",
    games: ["Aviatrix"]
  }
];

// For quick lookup during filtering
export const ALLOWED_GAMES: Record<string, string[]> = ALLOWED_GAMES_LIST.reduce((acc, item) => {
  acc[item.provider] = item.games;
  return acc;
}, {} as Record<string, string[]>);
