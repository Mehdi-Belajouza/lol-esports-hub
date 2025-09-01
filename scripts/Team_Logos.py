from mwrogue.esports_client import EsportsClient
import urllib.request
import os


def get_filename_url_to_open(site: EsportsClient, filename, team, width=None):
    response = site.client.api(
        action="query",
        format="json",
        titles=f"File:{filename}",
        prop="imageinfo",
        iiprop="url",
        iiurlwidth=width,
    )

    image_info = next(iter(response["query"]["pages"].values()))["imageinfo"][0]

    if width:
        url = image_info["thumburl"]
    else:
        url = image_info["url"]

    #In case you would like to save the image in a specific location, you can add the path after 'url,' in the line below.
    os.makedirs('data/teams', exist_ok=True)
    urllib.request.urlretrieve(url, f'data/teams/{team}.png')


teams = ["Team Falcons"]

site = EsportsClient("lol")
for team in teams:
    url = f"{team}logo square.png"
    get_filename_url_to_open(site, url, team)