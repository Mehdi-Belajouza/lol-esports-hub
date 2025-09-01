import json
import re
import os
from pathlib import Path
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
        print(f"Error fetching player: {e}")
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
                "winrate": "N/A",  # Placeholder
                "border": "gray",
                "image": get_champion_image(champ)
            })
    if p.get("Image"):
        avatar_url = get_clean_avatar_url(site, p["Image"])
    else:
        avatar_url = get_avatar_url_by_tournament(site, player_name)  # fallback


    return {
        "name": p.get("ID", player_name),
        "realname": p.get("Name", ""),
        "team" :p.get("Team", ""),
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
        print(f"Error retrieving avatar: {e}")
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

        # Strip query params and revision path if needed
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
        print(f"Error fetching known names: {e}")
        return [player_name]

def get_tournament_results(player_name, site):
    try:
        aliases = get_known_names(site, player_name)
        # Build WHERE clause: TP.Player="name1" OR TP.Player="name2" ...
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
        print(f"Error fetching tournament results: {e}")
        return []
def get_player_names():
    choice = input("Enter '1' for single player or '2' for batch from file: ").strip()
    
    if choice == "1":
        name = input("Enter player name: ").strip()
        return [name]  # Always return a list for uniformity
    
    elif choice == "2":
        filepath = input("Enter path to file with player names (e.g. arab_league_players.txt): ").strip()
        try:
            with open(filepath, "r", encoding="utf-8") as file:
                names = [line.strip() for line in file if line.strip()]
            print(f"Loaded {len(names)} player(s) from file.")
            return names
        except FileNotFoundError:
            print("File not found.")
            return []
    else:
        print("Invalid choice.")
        return []
def load_players_from_file(file_path):
    """Load all players from the AL.json file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            players = json.load(f)
        return players
    except FileNotFoundError:
        print(f"Error: File {file_path} not found.")
        return []
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON in {file_path}")
        return []

def ensure_directories_exist():
    """Create necessary directories if they don't exist"""
    Path("data/players").mkdir(parents=True, exist_ok=True)
    Path("data/results").mkdir(parents=True, exist_ok=True)

def process_single_player(player_data, site):
    """Process a single player's data"""
    player_name = player_data.get("Player", "").strip()
    full_name = player_data.get("Name", "").strip()
    
    if not player_name:
        print(f"Skipping player with missing name: {player_data}")
        return
    
    print(f"Processing player: {player_name} ({full_name})")
    
    # Get and save profile
    profile = get_player_profile(player_name, site)
    if profile:
        # Add additional info from AL.json to the profile
        profile.update({
            "full_name": full_name,
            "country": player_data.get("Country", ""),
            "birthdate": player_data.get("Birthdate", ""),
            "residency": player_data.get("Residency", ""),
            "role": player_data.get("Role", "")
        })
        
        profile_filename = f"data/players/{player_name.lower()}.json"
        with open(profile_filename, "w", encoding="utf-8") as f:
            json.dump(profile, f, ensure_ascii=False, indent=2)
        print(f"✓ Profile for {player_name} saved to {profile_filename}")
    else:
        print(f"✗ Player profile for {player_name} not found.")
    
    # Get and save tournament results
    results = get_tournament_results(player_name, site)
    if results:
        results_filename = f"data/results/{player_name}_tournament_results.json"
        with open(results_filename, mode='w', encoding='utf-8') as file:
            json.dump(results, file, indent=4, ensure_ascii=False)
        print(f"✓ Tournament results for {player_name} saved to {results_filename}")
    else:
        print(f"✗ No tournament results found for {player_name}.")
    
    print("-" * 50)

if __name__ == "__main__":
    # Load all players from AL.json
    players_file = "data/al_players/AL.json"
    players = load_players_from_file(players_file)
    
    if not players:
        print("No players found or error loading file.")
        exit(1)
    
    print(f"Found {len(players)} players in {players_file}")
    
    # Ensure output directories exist
    ensure_directories_exist()
    
    # Initialize the esports client
    site = EsportsClient("lol")
    
    # Process each player
    success_count = 0
    for i, player_data in enumerate(players, 1):
        print(f"\n[{i}/{len(players)}] Processing...")
        try:
            process_single_player(player_data, site)
            success_count += 1
        except Exception as e:
            player_name = player_data.get("Player", "Unknown")
            print(f"Error processing {player_name}: {str(e)}")
            continue
    
    print(f"\n{'='*50}")
    print(f"Processing complete!")
    print(f"Successfully processed: {success_count}/{len(players)} players")
    print(f"Profiles saved in: data/players/")
    print(f"Results saved in: data/results/")
