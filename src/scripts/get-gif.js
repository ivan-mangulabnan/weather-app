class Gif {
  static cache = {};
  static #id = {
    rain: "3oEjI3nWWIFGN7d8Ry",
    fog: "3o7rbT3ECCXdEGE8fu",
    wind: "luhmhS2DLe6FuQWwPa",
    cloudy: "yB3gwsCaymSglI1Jqt",
    'partly-cloudy-day': "eebc0t8jYBNOYfchyY",
    'partly-cloudy-night': "3o6Zt93byJYeHqvrwc",
    snow: 'l41Yq6xnFirZUUDv2',
    'clear-day': "59e2sUzi36bIr4FyD7",
    'clear-night': "13NOyaMNX5UZYk",
    'snow-showers-day': "l41Yq6xnFirZUUDv2",
    'snow-showers-night': "l41Yq6xnFirZUUDv2",
    'thunder-rain': "xUOwGoNa2uX6M170d2",
    'thunder-showers-day': "xUOwGoNa2uX6M170d2",
    'thunder-showers-night': "3oz8xuDgwvlM6TXMRi",
    'showers-day': "3oEjI3nWWIFGN7d8Ry",
    'showers-night': "3oEjI3nWWIFGN7d8Ry"
  };

  static get id () {
    return this.#id;
  }
}

export async function getGif (icon) {
  if (Gif.cache[icon]) return Gif.cache[icon];

  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/${Gif.id[icon]}?api_key=ZfAI6l1NBQlS80LJu6v1oGjI4q8GAmGh`);
    const json = await response.json();
    return Gif.cache[icon] ??= json.data.images.original.url;
  } catch (err) {
    return err;
  }
}