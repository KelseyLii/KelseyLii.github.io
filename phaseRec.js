function initPhaseRecognition() {
    const mainVideo = document.getElementById('mainVideo');
    
    // 检查主视频元素是否存在
    if (!mainVideo) {
        console.error('mainVideo element not found');
        return;
    }
    
    // 获取所有phase元素
    const phaseElements = {
        phase1: document.getElementById('phase1'),
        phase2: document.getElementById('phase2'),
        phase3: document.getElementById('phase3'),
        phase4: document.getElementById('phase4'),
        phase5: document.getElementById('phase5')
    };
    
    // 检查所有phase元素是否存在
    const missingElements = Object.keys(phaseElements).filter(key => !phaseElements[key]);
    if (missingElements.length > 0) {
        console.error('Missing phase elements:', missingElements);
        return;
    }
    
    // 定义10个时间点：每个phase的亮起和熄灭时间
    const timeMarkers = [
        { time: 2, phase: 'phase1', action: 'on' },    // phase1 亮起
        { time: 5, phase: 'phase1', action: 'off' },   // phase1 熄灭
        { time: 8, phase: 'phase2', action: 'on' },    // phase2 亮起
        { time: 12, phase: 'phase2', action: 'off' },  // phase2 熄灭
        { time: 15, phase: 'phase3', action: 'on' },   // phase3 亮起
        { time: 18, phase: 'phase3', action: 'off' },  // phase3 熄灭
        { time: 22, phase: 'phase4', action: 'on' },   // phase4 亮起
        { time: 25, phase: 'phase4', action: 'off' },  // phase4 熄灭
        { time: 28, phase: 'phase5', action: 'on' },   // phase5 亮起
        { time: 32, phase: 'phase5', action: 'off' }   // phase5 熄灭
    ];
    
    // 当前已处理的标记索引
    let processedMarkerIndex = -1;
    
    // 视频时间更新事件
    mainVideo.addEventListener('timeupdate', () => {
        const currentTime = mainVideo.currentTime;
        
        // 向前检查：处理新到达的时间点
        while (processedMarkerIndex < timeMarkers.length - 1) {
            const nextMarker = timeMarkers[processedMarkerIndex + 1];
            if (currentTime >= nextMarker.time) {
                executeMarkerAction(nextMarker);
                processedMarkerIndex++;
                console.log(`Executed marker ${processedMarkerIndex}: ${nextMarker.phase} ${nextMarker.action} at ${nextMarker.time}s`);
            } else {
                break;
            }
        }
        
        // 向后检查：处理视频回退的情况
        while (processedMarkerIndex >= 0) {
            const currentMarker = timeMarkers[processedMarkerIndex];
            if (currentTime < currentMarker.time) {
                // 撤销这个标记的动作
                const reverseAction = currentMarker.action === 'on' ? 'off' : 'on';
                executeMarkerAction({
                    phase: currentMarker.phase,
                    action: reverseAction,
                    time: currentMarker.time
                });
                processedMarkerIndex--;
                console.log(`Reversed marker: ${currentMarker.phase} ${reverseAction} (was at ${currentMarker.time}s)`);
            } else {
                break;
            }
        }
    });
    
    // 执行标记动作
    function executeMarkerAction(marker) {
        const element = phaseElements[marker.phase];
        if (!element) return;
        
        if (marker.action === 'on') {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    }
    
    // 重置所有phase到初始状态
    function resetAllPhases() {
        Object.values(phaseElements).forEach(element => {
            if (element) {
                element.classList.remove('active');
            }
        });
        processedMarkerIndex = -1;
        console.log('All phases reset');
    }
    
    // 根据当前时间设置正确的状态
    function syncToCurrentTime(currentTime) {
        resetAllPhases();
        
        // 重新处理到当前时间的所有标记
        for (let i = 0; i < timeMarkers.length; i++) {
            const marker = timeMarkers[i];
            if (currentTime >= marker.time) {
                executeMarkerAction(marker);
                processedMarkerIndex = i;
            } else {
                break;
            }
        }
        
        console.log(`Synced to time ${currentTime}s, processed ${processedMarkerIndex + 1} markers`);
    }
    
    // 视频播放开始时同步状态
    mainVideo.addEventListener('play', () => {
        syncToCurrentTime(mainVideo.currentTime);
    });
    
    // 视频跳转时同步状态
    mainVideo.addEventListener('seeked', () => {
        syncToCurrentTime(mainVideo.currentTime);
    });
    
    // 视频结束时重置
    mainVideo.addEventListener('ended', () => {
        resetAllPhases();
    });
    
    // 视频加载完成时初始化
    mainVideo.addEventListener('loadedmetadata', () => {
        resetAllPhases();
    });
    
    // 暴露一些控制方法（可选，用于调试）
    window.phaseControl = {
        reset: resetAllPhases,
        sync: () => syncToCurrentTime(mainVideo.currentTime),
        getStatus: () => {
            const status = {};
            Object.keys(phaseElements).forEach(key => {
                status[key] = phaseElements[key].classList.contains('active');
            });
            return status;
        },
        getCurrentMarkerIndex: () => processedMarkerIndex
    };
}

// 初始化函数
document.addEventListener('DOMContentLoaded', () => {
    initPhaseRecognition();
});

// 滑动开关逻辑
        let slideState = false;
        
        function toggleSlideSwitch() {
            slideState = !slideState;
            const switchElement = document.getElementById('slideSwitch');
            const statusElement = document.getElementById('slideStatus');
            
            if (slideState) {
                switchElement.classList.add('active');
                statusElement.textContent = '状态：开启';
                statusElement.style.background = '#e8f5e8';
                statusElement.style.color = '#2e7d32';
            } else {
                switchElement.classList.remove('active');
                statusElement.textContent = '状态：关闭';
                statusElement.style.background = '#ffebee';
                statusElement.style.color = '#c62828';
            }
        }