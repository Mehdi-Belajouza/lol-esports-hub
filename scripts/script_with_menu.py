import json
import re
import os
from mwrogue.esports_client import EsportsClient

def extract_year(page_name):
    match = re.search(r'(20\d{2})', page_name or "")
    return int(match.group(1)) if match else None

def get_flag_url(country_code):
    return f"https://flagcdn.com/w40/{country_code.lower()}.png" if country_code else None

def format_placement(place):
    medals = {
        "1": "🥇 1st",
        "2": "🥈 2nd", 
        "3": "🥉 3rd",
        "4": "🏅 4th",
    }
    return medals.get(str(place).strip(), f"{place}") if place else "N/A"

def get_champion_image(name):
    if not name:
        return "Default.png"
    clean_name = name.replace(' ', '').replace("'", '').replace('.', '')
    return clean_name + '.png'

def get_player_profile(player_name, site):
    try:
        player_data = site.cargo_client.query(
            tables="Players",
            fields="Name, ID,Team, Country, Image, Role, Player=RealName, FavChamps",
            where=f'Name="{player_name}" OR Player="{player_name}"',
            limit=1
        )            
        if not player_data:
            return None
        p = player_data[0]
    except Exception as e:
        print(f"Error fetching player {player_name}: {e}")
        return None

    try:
        tournament_rows = site.cargo_client.query(
            tables="TournamentPlayers",
            fields="OverviewPage, Team, Role, Place",
            where=f'Player="{player_name}"',
            order_by="OverviewPage DESC"
        )
    except:
        tournament_rows = []

    trophies = {}
    timeline = []
    for t in tournament_rows:
        page = t.get('OverviewPage')
        year = extract_year(page)
        place = str(t.get('Place', '')).strip()
        if place == "1":
            tournament_label = page.replace("_", " ") if page else "Unknown"
            trophies[tournament_label] = trophies.get(tournament_label, 0) + 1
        if year:
            event = f"Played in {page.replace('_', ' ')}"
            if place == "1":
                event += " — 1st title"
            timeline.append({
                "year": year,
                "event": event
            })

    formatted_trophies = [
        {"label": label, "count": count, "icon": "🏆"}
        for label, count in trophies.items()
    ]
    
    champions = []
    if p.get("FavChamps"):
        favs = [c.strip() for c in p["FavChamps"].split(',') if c.strip()]
        for champ in favs:
            champions.append({
                "name": champ,
                "winrate": "N/A",
                "border": "gray", 
                "image": get_champion_image(champ)
            })

    if p.get("Image"):
        avatar_url = get_clean_avatar_url(site, p["Image"])
    else:
        avatar_url = get_avatar_url_by_tournament(site, player_name)

    return {
        "name": p.get("ID", player_name),
        "realname": p.get("Name", ""),
        "team": p.get("Team", ""),
        "country": p.get("Country", ""),
        "role": p.get("Role", "Unknown"),
        "avatar": avatar_url,
        "trophies": formatted_trophies,
        "champions": champions,
        "careerTimeline": sorted(timeline, key=lambda x: x['year'], reverse=True)
    }

def get_avatar_url_by_tournament(site: EsportsClient, player_name):
    try:
        response = site.cargo_client.query(
            limit=1,
            tables="PlayerImages=PI, Tournaments=T",
            fields="PI.FileName",
            join_on="PI.Tournament=T.OverviewPage",
            where=f'Link="{player_name}"',
            order_by="PI.SortDate DESC, T.DateStart DESC"
        )
        if not response:
            return None
        filename = response[0]['FileName']
        return get_clean_avatar_url(site, filename)
    except Exception as e:
        print(f"Error retrieving avatar for {player_name}: {e}")
        return None

def get_clean_avatar_url(site: EsportsClient, filename):
    try:
        response = site.client.api(
            action="query",
            format="json",
            titles=f"File:{filename}",
            prop="imageinfo",
            iiprop="url",
        )
        image_info = next(iter(response["query"]["pages"].values()))["imageinfo"][0]
        full_url = image_info["url"]
        clean_url = full_url.split("/revision/")[0]
        return clean_url
    except Exception as e:
        print(f"Error fetching clean avatar URL: {e}")
        return None

def get_known_names(site: EsportsClient, player_name: str):
    try:
        response = site.cargo_client.query(
            tables="PlayerRedirects",
            fields="AllName",
            where=f'OverviewPage="{player_name}"'
        )
        return sorted({row['AllName'] for row in response})
    except Exception as e:
        print(f"Error fetching known names for {player_name}: {e}")
        return [player_name]

def get_tournament_results(player_name, site):
    try:
        aliases = get_known_names(site, player_name)
        alias_filter = " OR ".join([f'TP.Player="{name}"' for name in aliases])
        response = site.cargo_client.query(
            tables="TournamentResults=TR, TournamentPlayers=TP",
            join_on="TR.PageAndTeam=TP.PageAndTeam",
            fields="""
                TR.Event, TR.Tier, TR.Date, TR.Place, TR.Team,
                TR.Prize, TR.Prize_USD, TR.Prize_Euro,
                TP.Player, TP.Role
            """,
            where=alias_filter,
            order_by="TR.Date DESC",
            limit=500
        )
        return response
    except Exception as e:
        print(f"Error fetching tournament results for {player_name}: {e}")
        return []

def get_player_champions(player_name: str, site: EsportsClient):
    try:
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
        champ_data = site.cargo_client.query(
            tables="PlayerRedirects=PR, ScoreboardPlayers=SP",
            join_on="PR.AllName=SP.Link",
            fields="SP.Champion, COUNT(*)=count",
            where=f'PR.OverviewPage="{player_name}" AND ({name_filter})',
            group_by="SP.Champion",
            order_by="count DESC",
            limit=20
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
    except Exception as e:
        print(f"Error fetching champions for {player_name}: {e}")
        return []

def get_player_scoreboard_history(player_name: str, site: EsportsClient):
    try:
        redirects = site.cargo_client.query(
            tables="PlayerRedirects",
            fields="AllName",
            where=f'OverviewPage="{player_name}"'
        )
        known_names = [r["AllName"] for r in redirects]
        if not known_names:
            print(f"No known names found for {player_name}")
            return []

        name_filter = ' OR '.join([f'SP.Link="{name}"' for name in known_names])
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
        print(f"Error retrieving scoreboard data for {player_name}: {e}")
        return []

def process_player_profiles(player_names, site):
    """Process player profiles for multiple players"""
    successful_players = []
    failed_players = []
    
    os.makedirs("data/players", exist_ok=True)
    os.makedirs("data/results", exist_ok=True)
    
    for name in player_names:
        print(f"\n{'='*50}")
        print(f"Processing player profile: {name}")
        print('='*50)
        
        try:
            # Get and save profile
            profile = get_player_profile(name, site)
            if profile:
                profile_path = f"data/players/{name.lower()}.json"
                with open(profile_path, "w", encoding="utf-8") as f:
                    json.dump(profile, f, ensure_ascii=False, indent=2)
                print(f"✅ Profile for {name} saved to {profile_path}")
                
                # Get and save tournament results
                results = get_tournament_results(name, site)
                if results:
                    results_filename = f"data/results/{name}_tournament_results.json"
                    with open(results_filename, mode='w', encoding='utf-8') as file:
                        json.dump(results, file, indent=4, ensure_ascii=False)
                    print(f"✅ Tournament results saved to {results_filename}")
                else:
                    print(f"⚠️  No tournament results found for {name}")
                
                successful_players.append(name)
            else:
                print(f"❌ Player profile not found for {name}")
                failed_players.append(name)
                
        except Exception as e:
            print(f"❌ Error processing {name}: {e}")
            failed_players.append(name)
    
    return successful_players, failed_players

def process_player_champions(player_names, site):
    """Process player champions and scoreboards for multiple players"""
    successful_players = []
    failed_players = []
    
    os.makedirs("data/players", exist_ok=True)
    os.makedirs("data/scoreboards", exist_ok=True)
    
    for name in player_names:
        print(f"\n{'='*50}")
        print(f"Processing champions & scoreboards: {name}")
        print('='*50)
        
        try:
            # Get scoreboard history
            scoreboard_history = get_player_scoreboard_history(name, site)
            if scoreboard_history:
                scoreboards_filename = f"data/scoreboards/{name}_tournament_scoreboards.json"
                with open(scoreboards_filename, mode='w', encoding='utf-8') as file:
                    json.dump(scoreboard_history, file, indent=4, ensure_ascii=False)
                print(f"✅ Scoreboard history saved to {scoreboards_filename}")
            else:
                print(f"⚠️  No scoreboard data found for {name}")
            
            # Update profile with champions
            profile_path = f"data/players/{name.lower()}.json"
            if os.path.exists(profile_path):
                with open(profile_path, "r", encoding="utf-8") as f:
                    profile = json.load(f)
            else:
                profile = {
                    "name": name,
                    "champions": []
                }
            
            champions = get_player_champions(name, site)
            if champions:
                profile["champions"] = champions
                with open(profile_path, "w", encoding="utf-8") as f:
                    json.dump(profile, f, indent=2, ensure_ascii=False)
                print(f"✅ Updated profile with {len(champions)} champions: {profile_path}")
                successful_players.append(name)
            else:
                print(f"⚠️  No champion data found for {name}")
                failed_players.append(name)
                
        except Exception as e:
            print(f"❌ Error processing champions for {name}: {e}")
            failed_players.append(name)
    
    return successful_players, failed_players

def get_player_input():
    """Get player names from user input (comma-separated)"""
    player_input = input("Enter player name(s) separated by commas: ").strip()
    if not player_input:
        print("No players entered.")
        return []
    return [name.strip() for name in player_input.split(',') if name.strip()]

def show_summary(successful_players, failed_players, operation_type):
    """Display summary of processing results"""
    print(f"\n{'='*60}")
    print(f"SUMMARY - {operation_type}")
    print('='*60)
    
    if successful_players:
        print(f"✅ Successfully processed {len(successful_players)} player(s):")
        for player in successful_players:
            print(f"   • {player}")
    
    if failed_players:
        print(f"\n❌ Failed to process {len(failed_players)} player(s):")
        for player in failed_players:
            print(f"   • {player}")
    
    print(f"\nTotal: {len(successful_players)} successful, {len(failed_players)} failed")
    print('='*60)

def main():
    print("="*60)
    print("🏆 LEAGUE OF LEGENDS PLAYER DATA PROCESSOR")
    print("="*60)
    
    print("\nSelect what you want to do:")
    print("1. Get Player Profiles & Tournament Results")
    print("2. Get Player Champions & Scoreboard History") 
    print("3. Exit")
    
    choice = input("\nEnter your choice (1, 2, or 3): ").strip()
    
    if choice == "3":
        print("Goodbye! 👋")
        return
    
    if choice not in ["1", "2"]:
        print("Invalid choice. Please run the script again.")
        return
    
    # Get player names (space-separated input)
    player_names = get_player_input()
    if not player_names:
        print("No players to process.")
        return
    
    print(f"\nPlayers to process: {', '.join(player_names)}")
    
    # Initialize LoL Esports client
    print("\nConnecting to LoL Esports database...")
    site = EsportsClient("lol")
    
    if choice == "1":
        print("\n🔄 Running Script 1: Player Profiles & Tournament Results")
        successful, failed = process_player_profiles(player_names, site)
        show_summary(successful, failed, "Script 1 - Player Profiles & Tournament Results")
        
    elif choice == "2":
        print("\n🔄 Running Script 2: Player Champions & Scoreboard History")
        successful, failed = process_player_champions(player_names, site)
        show_summary(successful, failed, "Script 2 - Player Champions & Scoreboard History")

if __name__ == "__main__":
    main()