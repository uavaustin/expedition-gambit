import re
import errno
import os
import urllib.request


def regex(text):
    arr = list(re.finditer('https:\/\/api.mapbox.com\/v4\/mapbox.satellite\/(\d+)\/(\d+)\/(\d+)@2x.webp', text))
    return arr

f = open("addresses", "r")

arr = regex(f.read())

f = open("commands.txt", "a")

for item in arr:
    x = item.group(1)
    y = item.group(2)
    z = item.group(3)
    path = "./" + x + "/" + y
    try:
        os.makedirs(path)
    except OSError as exc:
        if exc.errno != errno.EEXIST:
            raise
        pass

    url = f"https://api.mapbox.com/v4/mapbox.satellite/{x}/{y}/{z}@2x.png?access_token=pk.eyJ1Ijoic3NoaDEyIiwiYSI6ImNpcTVhNDQxYjAwM3FmaGtrYnl6czEwMGcifQ.eYETiDD8NqThLahLIBmjSQ"
    filename = f"{path}/{z}@2x.png"
    urllib.request.urlretrieve(url, filename)


# f.write( f"https://api.mapbox.com/v4/mapbox.satellite/{x}/{y}/{z}@2x.png?access_token=pk.eyJ1Ijoic3NoaDEyIiwiYSI6ImNpcTVhNDQxYjAwM3FmaGtrYnl6czEwMGcifQ.eYETiDD8NqThLahLIBmjSQ -x -nH")

