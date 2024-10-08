import localforage from 'localforage';
import { matchSorter } from 'match-sorter';
import sortBy from 'sort-by';

type Weight = {
    date: string;
    weight: number;
    height: number;
    bmi: number;
    timestamp: number;
};

export async function getData(query?: string) {
    let weights = (await localforage.getItem('weights')) as Weight[];
    if (!weights) weights = [];
    if (query) {
        weights = matchSorter(weights, query, { keys: ['date'] });
    }
    return weights.sort(sortBy('timestamp'));
}

export async function createWeights({ weight, height, date }: any) {
    weight = Number(weight);
    height = Number(height);
    const now = new Date(date);

    const timestamp = now.getTime();
    const bmi = weight / (height * height);

    const item = { date, weight, height, bmi, timestamp };
    const weights = await getData();

    // 去重
    const curIndex = weights.findIndex((v) => v.date === date);
    if (curIndex !== -1) {
        weights[curIndex] = item;
    } else {
        weights.unshift(item);
    }
    await set(weights);
    return item;
}

function set(weights: Weight[]) {
    return localforage.setItem('weights', weights);
}
