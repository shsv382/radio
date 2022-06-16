import { countries, genres, getStations } from '../../lib/stations';

export default async function handler(req, res) {
    let stations = await getStations();
    res.status(200).json({ stations });
}