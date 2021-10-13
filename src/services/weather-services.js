export default class WeatherService {
    _apiBase = 'https://api.openweathermap.org/data/2.5';
    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}`)
        }

        return await res.json();
    }

    getForecast = async (city = "Киев", days = 3) => {
        const res = await this.getResource(`/forecast?q=${city}&units=metric&cnt=${days * 8}&appid=ab4193d2feb1424956251b3384e60a26`)
        return res.list
    } 
    getCurrentWeather = (city = "Киев") => {
        return this.getResource(`/weather?q=${city}&units=metric&appid=ab4193d2feb1424956251b3384e60a26`)
    }
    getTomorrowWeather = async (city) => {
        const res = await this.getResource(`/forecast?q=${city}&units=metric&cnt=${16}&appid=ab4193d2feb1424956251b3384e60a26`)
        return res.list
    } 

}