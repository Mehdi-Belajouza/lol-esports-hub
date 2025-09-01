import os
import json
from mwrogue.esports_client import EsportsClient

def get_player_champions(player_name: str, site: EsportsClient):
    # Get aliases
    redirects = site.cargo_client.query(
        tables="PlayerRedirects",
        fields="AllName",
        where=f'OverviewPage="{player_name}"'
    )
    known_names = [r["AllName"] for r in redirects]

    if not known_names:
        print(f"No aliases found for {player_name}")
        return []

    name_filter = ' OR '.join([f'SP.Link="{name}"' for name in known_names])

    # Query champion usage
    champ_data = site.cargo_client.query(
        tables="PlayerRedirects=PR, ScoreboardPlayers=SP",
        join_on="PR.AllName=SP.Link",
        fields="SP.Champion, COUNT(*)=count",
        where=f'PR.OverviewPage="{player_name}" AND ({name_filter})',
        group_by="SP.Champion",
        order_by="count DESC",
        limit=20  # Top 20 most played
    )

    champions = []
    for row in champ_data:
        champ = row["Champion"]
        if not champ:
            continue
        champions.append({
            "name": champ,
            "winrate": "N/A",
            "border": "gray",
            "image": f"{champ}.png"
        })

    return champions

def get_player_scoreboard_history(player_name: str, site: EsportsClient):
    try:
        # Step 1: Get all known names (aliases) for the player
        redirects = site.cargo_client.query(
            tables="PlayerRedirects",
            fields="AllName",
            where=f'OverviewPage="{player_name}"'
        )
        known_names = [r["AllName"] for r in redirects]

        if not known_names:
            print(f"No known names found for {player_name}")
            return []

        # Construct name filter
        name_filter = ' OR '.join([f'SP.Link="{name}"' for name in known_names])

        # Step 2: Query scoreboard history joined with games
        results = site.cargo_client.query(
            tables="PlayerRedirects=PR, ScoreboardPlayers=SP, ScoreboardGames=SG",
            join_on="PR.AllName=SP.Link, SP.GameId=SG.GameId",
            fields="""
                SG.GameId, SG.MatchId, SG.DateTime_UTC, SG.Team1, SG.Team2,
                SG.Team1Score, SG.Team2Score, SG.Winner, SG.Gamelength_Number,
                SP.Team, SP.Role, SP.Champion, SP.Kills, SP.Deaths, SP.Assists,
                SP.Gold, SP.CS, SP.DamageToChampions, SP.Link
            """,
            where=f'PR.OverviewPage="{player_name}" AND ({name_filter})',
            order_by="SG.DateTime_UTC DESC",
            limit=5000
        )

        return results

    except Exception as e:
        print(f"Error retrieving scoreboard data: {e}")
        return []


if __name__ == "__main__":
    name = input("Enter player name: ").strip()
    site = EsportsClient("lol")

    scoreboard_history = get_player_scoreboard_history(name, site)
    if scoreboard_history:
        os.makedirs("data/scoreboards", exist_ok=True)
        filename = f"data/scoreboards/{name}_tournament_scoreboards.json"
        with open(filename, mode='w', encoding='utf-8') as file:
            json.dump(scoreboard_history, file, indent=4, ensure_ascii=False)
        print(f"Scoreboard history saved to: {filename}")
    else:
        print("No scoreboard data found.")
    profile_path = f"data/players/{name.lower()}.json"
    if os.path.exists(profile_path):
        with open(profile_path, "r", encoding="utf-8") as f:
            profile = json.load(f)
    else:
        profile = {
            "name": name,
            "champions": []
        }

    profile["champions"] = get_player_champions(name, site)

    with open(profile_path, "w", encoding="utf-8") as f:
        json.dump(profile, f, indent=2, ensure_ascii=False)

    print(f"Updated profile with champions: {profile_path}")    
