from mwrogue.esports_client import EsportsClient
import json

# Connect to the League of Legends wiki
site = EsportsClient("lol")

# Player name
player_name = "Faker"

# Query Cargo tables for tournament results
response = site.cargo_client.query(
    tables="TournamentResults=TR, TournamentPlayers=TP",
    join_on="TR.PageAndTeam=TP.PageAndTeam",
    fields="""
        TR.Event, TR.Tier, TR.Date, TR.Place, TR.Team,
        TR.Prize, TR.Prize_USD, TR.Prize_Euro,
        TP.Player, TP.Role
    """,
    where=f"TP.Player='{player_name}'",
    order_by="TR.Date DESC",
    limit=500
)

# Define output JSON filename
filename = f"data/results/{player_name}_tournament_results.json"

# Write to JSON file
with open(filename, mode='w', encoding='utf-8') as file:
    json.dump(response, file, indent=4, ensure_ascii=False)

print(f"Saved tournament results to: {filename}")
