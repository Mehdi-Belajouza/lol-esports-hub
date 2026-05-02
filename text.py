from mwrogue.esports_client import EsportsClient
import json

site = EsportsClient("lol")

response = site.cargo_client.query(
    tables="Tournaments=T, TournamentPlayers=TP, PlayerRedirects=PR, Players=P",
    fields="P.Player, P.Name, P.Country,P.NationalityPrimary, P.Birthdate, P.Residency, P.Role",
    where="T.League = 'Arabian League' ",
    join_on="T.OverviewPage=TP.OverviewPage, TP.Player=PR.AllName, PR.OverviewPage=P.OverviewPage",
    group_by="P.OverviewPage"
)



with open("arabian_league_div1_players.json", "w", encoding="utf-8") as f:
    json.dump(response, f, indent=4, ensure_ascii=False)