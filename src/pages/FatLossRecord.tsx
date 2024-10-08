import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import EChartsWrapper from '@/components/EChartsWrapper.tsx';
import { getData, createWeights } from '@/weights';
import { EChartsOption } from 'echarts';
import dayjs from 'dayjs';

export default function FatLossRecord() {
    const [date, setDate] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');

    const [weightOption, setWeightOption] = useState<EChartsOption>({
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: [],
                type: 'line',
                smooth: true,
            },
        ],
    });
    const [bmiOption, setBmiOption] = useState<EChartsOption>({
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: [],
                type: 'line',
                smooth: true,
            },
        ],
    });

    useEffect(() => {
        (async function () {
            const data = await refreshPage();
            const { height } = data[0];
            setHeight(String(height));
            setDate(dayjs().format('YYYY-MM-DD'));
        })();
    }, []);

    // 数据提交

    const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
        setWeight(e.target.value);
    };
    const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
        setHeight(e.target.value);
    };
    const handleTimestampChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!weight || !height || !date) {
            return;
        }
        // 更新缓存数据
        await createWeights({
            weight,
            height,
            date,
        });

        await refreshPage();
    };

    // 体重
    const refreshPage = async () => {
        const data = await getData();
        const dates = data.map((v) => v.date);
        const weights = data.map((v) => v.weight);
        const bmi = data.map((v) => v.bmi);

        setWeightOption((value) => ({ ...value, series: [{ ...value.series[0], data: weights }], xAxis: { ...value.xAxis, data: dates } }));
        setBmiOption((value) => ({ ...value, series: [{ ...value.series[0], data: bmi }], xAxis: { ...value.xAxis, data: dates } }));

        return data;
    };

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="flex space-x-2">
                    <input type="date" value={date} onChange={handleTimestampChange} className="border rounded px-4 py-2 w-full max-w-xs" />
                    <input
                        type="number"
                        value={height}
                        onChange={handleHeightChange}
                        className="border rounded px-4 py-2 w-full max-w-xs"
                        placeholder="请输入身高(m)"
                        step="0.01"
                        min={0}
                    />
                    <input
                        type="number"
                        value={weight}
                        onChange={handleWeightChange}
                        className="border rounded px-4 py-2 w-full max-w-xs"
                        placeholder="请输入体重(kg)"
                        step="0.01"
                        min={0}
                    />
                    <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
                        Submit
                    </button>
                </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white shadow-md rounded p-4">
                    <h2 className="text-lg font-semibold mb-2">weight Chart</h2>
                    <div className="bg-gray-200 rounded-md flex items-center justify-center">
                        <EChartsWrapper options={weightOption} />
                    </div>
                </div>
                <div className="bg-white shadow-md rounded p-4">
                    <h2 className="text-lg font-semibold mb-2">index Chart</h2>
                    <div className="bg-gray-200 rounded-md flex items-center justify-center">
                        <EChartsWrapper options={bmiOption} />
                    </div>
                </div>
            </div>
        </div>
    );
}
