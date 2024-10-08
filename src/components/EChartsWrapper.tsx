import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

// 定义组件的 Props 接口
type Props = echarts.EChartsInitOpts & {
    // 主题，默认 'light'
    theme?: string;

    // ECharts 配置项，使用 ECharts 内置的类型
    options: echarts.EChartsOption;
    // 是否不合并更新
    notMerge?: boolean;
    // 是否延迟更新
    lazyUpdate?: boolean;

    // 是否显示加载动画
    loading?: boolean;
    // 事件
    onEvents?: Record<string, any>;
    // 样式
    style?: React.CSSProperties;
};

// 封装 ECharts 组件
export default function EChartsWrapper({
    theme = 'light',
    renderer = 'canvas',

    options,
    notMerge = false,
    lazyUpdate = false,

    loading = true,
    style = { height: 400, width: '100%' },
    onEvents = {},
}: Props) {
    // 引用图表 DOM 节点
    const chartRef = useRef<HTMLDivElement>(null);
    // 引用 ECharts 实例
    const instanceRef = useRef<echarts.ECharts | null>(null);

    // 初始化图表
    const initChart = () => {
        if (chartRef.current) {
            // 1. 初始化 ECharts 实例
            const chartInstance = echarts.init(chartRef.current, theme, { renderer });
            instanceRef.current = chartInstance;
            // 2. 设置图表选项
            // chartInstance.setOption(options, notMerge, lazyUpdate);
            // 3. 初始化事件绑定
            if (onEvents) {
                Object.keys(onEvents).forEach((event) => {
                    chartInstance.on(event, onEvents[event]);
                });
            }
        }
    };

    // 初始化图表和清理
    useEffect(() => {
        initChart();

        return () => {
            if (instanceRef.current) {
                instanceRef.current?.dispose(); // 组件卸载时销毁实例
            }
        };
    }, [theme, renderer]);

    // 更新图表
    useEffect(() => {
        if (instanceRef.current) {
            instanceRef.current?.setOption(options, notMerge, lazyUpdate);
        }
    }, [options, notMerge, lazyUpdate]);

    // 处理窗口大小变化
    useEffect(() => {
        const handleResize = () => {
            if (instanceRef.current) {
                instanceRef.current?.resize(); // 调整图表大小
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div ref={chartRef} style={style}>
            {loading && <div>Loading...</div>}
        </div>
    );
}
