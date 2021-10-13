const useIconImg = (weather) => {
    let img;
    const time = +new Date().toLocaleString("ru", { hour: "numeric" })
    switch (weather) {
        case "Clouds":
            if (time <= 6 || time >= 21) {
                img = 'cloudy-night';
                break;
            }
            img = 'cloudy-day';
            break;

        case "Thunderstorm":
            img = 'thunder';
            break;

        case "Drizzle":
            img = 'drizzle';
            break;

        case "Rain":
            img = 'rainy';
            break;

        case "Snow":
            img = 'snow';
            break;

        case "Clear":
            const timeClear = +new Date(time).toLocaleString("ru", { hour: "numeric" })
            if (timeClear <= 6 || timeClear >= 21) {
                img = 'cloudy-night';
                break;
            }
            img = 'day';
            break;
        default:
            img = 'day';
            break;
    }
    return img
}

export default useIconImg;